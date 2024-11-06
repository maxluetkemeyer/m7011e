import express from "express";
import { PrismaClient } from "@prisma/client";
import { scrypt } from "node:crypto";
import { promisify } from "node:util";

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
    
	const user = await prisma.users.findFirst({
		where: {
			email,
		},
	});

	if (user == null) {
		res.redirect("/login");
		return;
	}

	const saltBuffer = Buffer.from(user.salt, "hex");

	const passwordHash = (await scryptAsync(
		password,
		saltBuffer,
		512,
	)) as Buffer;

	if (passwordHash.toString("hex") !== user.password_hash) {
		res.redirect("/login");
		return;
	}

	res.redirect("/dashboard");
});

export default router;
