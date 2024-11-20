import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

// READ All
router.get("/", async (_, res) => {
	const tags = await prisma.tag
		.findMany({
			orderBy: {
				tag_id: "asc",
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (tags == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(tags);
});

// READ specific
router.get("/:id", async (req, res) => {
	const tag = await prisma.tag
		.findUnique({
			where: {
				tag_id: parseInt(req.params.id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (tag == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(tag);
});

// CREATE
router.post("/", async (req, res) => {
	const tag = await prisma.tag
		.create({
			data: {
				name: req.body.name,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (tag == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(tag);
});

// UPDATE
router.put("/:id", async (req, res) => {
	const tag = await prisma.tag
		.update({
			where: {
				tag_id: parseInt(req.params.id),
			},
			data: {
				name: req.body.name,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (tag == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(tag);
});

// DELETE
router.delete("/:id", async (req, res) => {
	const tag = await prisma.tag
		.delete({
			where: {
				tag_id: parseInt(req.params.id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (tag == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(tag);
});

export default router;
