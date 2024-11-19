import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
	const articles = await prisma.article.findMany();

	res.json(articles);
});

router.get("/:id", async (req, res) => {
	const article = await prisma.article.findUnique({
		where: {
			article_id: parseInt(req.params.id),
		},
	});

	if (article == null) {
		res.status(404).json({ message: "Article not found" });
		return;
	}

	res.json(article);
});

router.post("/", async (req, res) => {
	const article = await prisma.article.create({
		data: {
			title: req.body.title,
			content: req.body.content,
			created_at: new Date(),
			user_id: req.body.user_id, //TODO: CHECK
		},
	});

	res.json(article);
});

//TODO: use old or new if present
router.put("/:id", async (req, res) => {
	console.log("put gemacht", req.body);
	const article = await prisma.article.update({
		where: {
			article_id: parseInt(req.params.id),
		},
		data: {
			title: req.body.title,
			content: req.body.content,
			user_id: Number(req.body.user_id),
			updated_at: new Date(),
		},
	});
	
	res.json(article);
});

router.delete("/:id", async (req, res) => {
	const article = await prisma.article.delete({
		where: {
			article_id: parseInt(req.params.id),
		},
	});

	res.json(article);
});

export default router;
