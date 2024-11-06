import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyJWT } from "./jwt.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
	const articles = await prisma.article.findMany({
		include: {
			users: true,
			article_tag: {
				include: {
					tag: true,
				},
			}
		},
	});
	const tags = await prisma.tag.findMany();

	res.render("index", {
		articles,
		tags,
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

router.get("/about", (req, res) => {
	res.render("about", { myVar: "Hey" });
});

router.get("/dashboard", async (req, res) => {
	const cookies = req.cookies;
	console.log(cookies);

	const jwt = cookies.jwt;

	if(!jwt) {
		res.status(401).send("Unauthorized");
		return
	}

	const verifyResult = await verifyJWT(jwt);

	if(typeof verifyResult === 'string'){
		res.status(401).send("Unauthorized");
		return
	}

	//TODO: Check groups

	res.render("users/dashboard", { myVar: "Hey" });
});

router.get("/dashboard/write_article", (req, res) => {
	res.render("users/write_article", { myVar: "Hey" });
});

router.get("/dashboard/edit_users", (req, res) => {
	res.render("users/admin/edit_users", { myVar: "Hey" });
});

router.get("/dashboard/edit_user", (req, res) => {
	res.render("users/admin/edit_user", { myVar: "Hey" });
});

export default router;
