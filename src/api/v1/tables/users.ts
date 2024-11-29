import express from "express";
import { PrismaClient } from "@prisma/client";
import { generate_salt_hex, hash_password } from "../../../routes/login/login.js";
import { hash } from "crypto";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

// READ All
router.get("/", async (_, res) => {
	const users = await prisma.users
		.findMany({
			orderBy: {
				user_id: "asc",
			},
			include: {
				user_group_member: {
					include: {
						user_group: true,
					},
				},
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (users == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(users);
});

// READ specific
router.get("/:id", async (req, res) => {
	const user = await prisma.users
		.findUnique({
			where: {
				user_id: parseInt(req.params.id),
			},
			include: {
				user_group_member: {
					include: {
						user_group: true,
					},
				},
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user);
});

// CREATE
router.post("/", async (req, res) => {
	if (!req.body.password) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	const salt = await generate_salt_hex();
	const password_hash = await hash_password(req.body.password, salt);

	const user = await prisma.users
		.create({
			data: {
				name: req.body.name,
				email: req.body.email,
				password_hash: password_hash,
				salt: req.body.salt,
				totp_secret: req.body.totp_secret,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user);
});

// UPDATE
router.put("/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	const salt = req.body.password ? await generate_salt_hex() : undefined;
	const password_hash = req.body.password
		? await hash_password(req.body.password, salt!)
		: undefined;

	const user = await prisma.users
		.update({
			where: {
				user_id: id,
			},
			data: {
				name: req.body.name,
				email: req.body.email,
				password_hash: password_hash,
				salt: salt,
				totp_secret: req.body.totp_secret,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user);
});

// DELETE
router.delete("/:id", async (req, res) => {
	const user = await prisma.users
		.delete({
			where: {
				user_id: parseInt(req.params.id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user);
});

export default router;
