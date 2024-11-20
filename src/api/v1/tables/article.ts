import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

// READ All
router.get("/", async (_, res) => {
	const articles = await prisma.article
		.findMany({
			orderBy: {
				article_id: "asc",
			},
			include: {
				article_tag: {
					include: {
						tag: true,
					},
				},
			},

		})
		.catch((e) => {
			console.error(e);
		});

	if (articles == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(articles);
});

// READ specific
router.get("/:id", async (req, res) => {
	const article = await prisma.article
		.findUnique({
			where: {
				article_id: parseInt(req.params.id),
			},
			include: {
				article_tag: {
					include: {
						tag: true,
					},
				},
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(article);
});

// CREATE
router.post("/", async (req, res) => {
	const article = await prisma.article
		.create({
			data: {
				title: req.body.title,
				content: req.body.content,
				created_at: new Date(),
				user_id: req.body.user_id,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(article);
});

// UPDATE
router.put("/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	const article = await prisma.article
		.update({
			where: {
				article_id: id,
			},
			data: {
				title: req.body.title,
				content: req.body.content,
				user_id: req.body.user_id
					? Number(req.body.user_id)
					: undefined,
				updated_at: new Date(),
				created_at: req.body.created_at
					? new Date(req.body.created_at)
					: undefined,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(article);
});

// DELETE
router.delete("/:id", async (req, res) => {
	const article = await prisma.article
		.delete({
			where: {
				article_id: parseInt(req.params.id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(article);
});

export default router;
