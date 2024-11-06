import express from "express";
import { PrismaClient, users } from "@prisma/client";
import { scrypt } from "node:crypto";
import { promisify } from "node:util";
import { signJWT } from "./jwt.js";

const scryptAsync = promisify(scrypt);

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/", (req, res) => {
	res.render("login", { myVar: "Hey" });
});

router.post("/", async (req, res) => {
	// accessing form fields from req.body
	const email = req.body.email;
	const password = req.body.password;
	// verification steps
	if (!email || !password) {
		res.status(400).send("Email and password are required.");
		return;
	}

	const loginResult = await login(email, password);

	if (typeof loginResult === "string") {
		console.log(loginResult);
		res.redirect("/login");
		return;
	}

	const user = loginResult;
	const jwt = await getJWT(user);

	res.cookie("jwt", jwt, {
		httpOnly: true,
		sameSite: "strict",
		secure: true,
		maxAge: 1000 * 60 * 15,
	}); //15 minutes

	res.redirect("/dashboard");
});

async function getJWT(user: users): Promise<string> {
	// JWT
	const groups = await prisma.user_group_member.findMany({
		where: {
			user_id: user.user_id,
		},
		include: {
			user_group: true,
		},
	});

	const groupNames = groups
		.map((group) => group.user_group.name)
		.filter((name): name is string => name !== null);

	const jwt = await signJWT({
		user_id: user.user_id,
		name: user.name,
		email: user.email,
		groups: groupNames,
	});

	return jwt;
}

async function login(email: string, password: string): Promise<string | users> {
	const user = await prisma.users.findFirst({
		where: {
			email,
		},
	});

	console.log(user); //user_group_member[0].user_group.name

	if (user == null) {
		return "User not found";
	}

	const saltBuffer = Buffer.from(user.salt, "hex");

	const passwordHash = (await scryptAsync(
		password,
		saltBuffer,
		512,
	)) as Buffer;

	if (passwordHash.toString("hex") !== user.password_hash) {
		return "Invalid password";
	}

	return user;
}

export default router;
