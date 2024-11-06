import express from "express";
import { PrismaClient, users } from "@prisma/client";
import { scrypt } from "node:crypto";
import { promisify } from "node:util";
import { signJWT } from "./jwt.ts";

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

	const jwt = await signJWT({
		user_id: user.user_id,
		name: user.name,
		email: user.email
	});
	console.log(jwt)

	res.redirect("/dashboard");
});

async function login(email: string, password: string): Promise<string | users> {
	const user = await prisma.users.findFirst({
		where: {
			email,
		},
		include: {
			user_group_member: {
				include: {
					user_group: true,
				},
			},
		},
	});

	console.log(user)

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
