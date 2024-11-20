import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

// READ All
router.get("/", async (_, res) => {
	const user_groups = await prisma.user_group
		.findMany({
			orderBy: {
				group_id: "asc",
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_groups == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_groups);
});

// READ specific
router.get("/:id", async (req, res) => {
	const user_group = await prisma.user_group
		.findUnique({
			where: {
				group_id: parseInt(req.params.id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_group == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_group);
});

// CREATE
router.post("/", async (req, res) => {
	const user_group = await prisma.user_group
		.create({
			data: {
				name: req.body.name,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_group == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_group);
});

// UPDATE
router.put("/:id", async (req, res) => {
	const user_group = await prisma.user_group
		.update({
			where: {
				group_id: parseInt(req.params.id),
			},
			data: {
				name: req.body.name,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_group == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_group);
});

// DELETE
router.delete("/:id", async (req, res) => {
	const user_group = await prisma.user_group
		.delete({
			where: {
				group_id: parseInt(req.params.id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_group == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_group);
});

export default router;
