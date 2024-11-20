import express from "express";
import { PrismaClient } from "@prisma/client";
import { groupAuthorization } from "../../authorization.js";
import { MyJWT } from "../../jwt.js";
import { generateTOTPSecret, totp_to_url, validateToken } from "../../totp.js";

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

router.get("/totp", async (req, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_name = jwtPayload.name;
	const email = jwtPayload.email;
	const user_id = jwtPayload.user_id;

	const user = await prisma.users.findUnique({
		where: {
			user_id,
		},
	});

	if (!user) {
		res.status(400).send("User not found");
		return;
	}

	let totp_secret = user.totp_secret;

	if (!totp_secret) {
		totp_secret = generateTOTPSecret();
	}

	const totp_url = totp_to_url(totp_secret, email);

	res.render("users/totp", { user_name, user_id, totp_secret, totp_url });
});

router.post("/totp", async (req, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_id = jwtPayload.user_id;
	const email = jwtPayload.email;

	const totp_secret = req.body.totp_secret;
	const totp_token = req.body.totp_token;

	if (!totp_secret || !totp_token) {
		res.send({ message: "Missing fields" });
		return;
	}

	const validationResult = validateToken(totp_token, totp_secret, email);

	if (!validationResult) {
		res.send({ message: "Invalid TOTP token" });
		return;
	}

	await prisma.users.update({
		where: {
			user_id,
		},
		data: {
			totp_secret,
		},
	});

	res.redirect("/dashboard");
});

router.delete("/totp", async (_, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_id = jwtPayload.user_id;

	await prisma.users.update({
		where: {
			user_id,
		},
		data: {
			totp_secret: null,
		},
	});

	res.redirect("/dashboard");
});

export default router;
