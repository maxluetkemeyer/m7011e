import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
	const article = await prisma.article.findUnique({
		where: {
			article_id: Number(req.params.id),
		},
		include: {
			users: true,
			article_tag: {
				include: {
					tag: true,
				},
			},
		},
	});

	if (!article) {
		res.status(404).render("Article not found");
		return;
	}

	res.render("article", {
		article,
		helpers: {
			convertDateForArticle(dateString: string) {
				const options: Intl.DateTimeFormatOptions = {
					year: "numeric",
					month: "long",
					day: "numeric",
				};
				const date = new Date(dateString);
				return date.toLocaleDateString("en-US", options);
			},
		},
	});
});

export default router;
