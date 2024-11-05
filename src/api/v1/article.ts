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

export default router;
