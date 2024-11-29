import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

// READ All
router.get("/", async (_, res) => {
	const settings = await prisma.setting
		.findMany({
			orderBy: {
				user_id: "asc",
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (settings == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(settings);
});

// READ specific
router.get("/:userid", async (req, res) => {
	const setting = await prisma.setting
		.findUnique({
			where: {
				user_id: parseInt(req.params.userid),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (setting == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(setting);
});

// CREATE
router.post("/", async (req, res) => {
	const setting = await prisma.setting
		.create({
			data: {
				load_images: req.body.load_images,
                user_id: parseInt(req.body.user_id)
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (setting == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(setting);
});

// UPDATE
router.put("/:userid", async (req, res) => {
	const setting = await prisma.setting
		.update({
			where: {
				user_id: parseInt(req.params.userid),
			},
			data: {
				load_images: req.body.load_images,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (setting == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(setting);
});

// DELETE
router.delete("/:userid", async (req, res) => {
	const setting = await prisma.setting
		.delete({
			where: {
				user_id: parseInt(req.params.userid),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (setting == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(setting);
});

export default router;
