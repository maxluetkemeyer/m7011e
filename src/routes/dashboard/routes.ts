import express from "express";
import { PrismaClient } from "@prisma/client";
import { groupAuthorization } from "../../authorization.js";
import { MyJWT } from "../../jwt.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/", async (_, res) => {
	const articles = await prisma.article.findMany({
		include: {
			users: true,
			article_tag: {
				include: {
					tag: true,
				},
			},
		},
		orderBy: {
			created_at: "desc",
		},
	});

	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_name = jwtPayload.name;

	res.render("users/dashboard", {
		articles,
		user_name,
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

router.get("/edit_article/:id", async (req, res) => {
	const article = await prisma.article.findUnique({
		where: {
			article_id: Number(req.params.id),
		},
		include: {
			users: true,
		},
	});

	if (!article) {
		res.status(404).send("Article not found");
		return;
	}

	const authors = await prisma.users.findMany({
		where: {
			user_group_member: {
				some: {
					group_id: 2,
				},
			},
		},
	});

	res.render("users/edit_article", {
		article,
		authors,
		helpers: {
			userIsAuthor(user_id: number) {
				return article.user_id === user_id;
			},
		},
	});
});

router.get("/edit_users", groupAuthorization(["admin"]), (_, res) => {
	res.render("users/admin/edit_users", { myVar: "Hey" });
});

router.get("/edit_user", groupAuthorization(["admin"]), (_, res) => {
	res.render("users/admin/edit_user", { myVar: "Hey" });
});

export default router;
