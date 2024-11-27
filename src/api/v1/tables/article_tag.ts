import express from "express";
import { PrismaClient } from "@prisma/client";
import { groupAuthorization } from "../../../authorization.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

// READ All
router.get("/", async (_, res) => {
	const article_tags = await prisma.article_tag
		.findMany({
			orderBy: {
				article_id: "asc",
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article_tags == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(article_tags);
});

// READ specific
router.get("/:articleId/:tagId", async (req, res) => {
	const article_tag = await prisma.article_tag
		.findUnique({
			where: {
				article_id_tag_id: {
					article_id: parseInt(req.params.articleId),
					tag_id: parseInt(req.params.tagId),
				},
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article_tag == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(article_tag);
});

// CREATE
router.post("/", groupAuthorization("author"), async (req, res) => {
	const article_tag = await prisma.article_tag
		.create({
			data: {
				article_id: parseInt(req.body.article_id),
				tag_id: parseInt(req.body.tag_id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article_tag == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(article_tag);
});

// NO UPDATE, as there is only the primary key!

// DELETE
router.delete("/:articleId/:tagId", groupAuthorization("author"), async (req, res) => {
	const article_tag = await prisma.article_tag
		.delete({
			where: {
				article_id_tag_id: {
					article_id: parseInt(req.params.articleId),
					tag_id: parseInt(req.params.tagId),
				},
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article_tag == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(article_tag);
});

export default router;
