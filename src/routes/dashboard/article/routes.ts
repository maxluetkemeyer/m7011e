import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { MyJWT } from "../../../jwt.js";
import { GOOGLE_URL_PREFIX, uploadFromMemory } from "./upload.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/new_article", async (_, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;

	const article = await prisma.article.create({
		data: {
			title: "New Article",
			user_id: jwtPayload.user_id,
		},
	});

	res.redirect(`/dashboard/edit_article/${article.article_id}`);
});

router.get("/delete_article/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.article.delete({
		where: {
			article_id: id,
		},
	});

	res.redirect("/dashboard");
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

router.post("/edit_article/:id", upload.single("thumbnail"), async (req, res) => {
	const id = parseInt(req.params.id);

	let thumbnail_destination: string | undefined = undefined;
	if (req.file) {
		let file_extension = req.file.mimetype.split("/")[1];

		thumbnail_destination = `articles/thumbnails/${id}.${file_extension}`;
		uploadFromMemory(thumbnail_destination, req.file.buffer);
	}

	const article = await prisma.article
		.update({
			where: {
				article_id: id,
			},
			data: {
				title: req.body.title,
				content: req.body.content,
				user_id: req.body.user_id ? Number(req.body.user_id) : undefined,
				image_url: thumbnail_destination
					? `${GOOGLE_URL_PREFIX}${thumbnail_destination}`
					: undefined,
				updated_at: new Date(),
				created_at: req.body.created_at ? new Date(req.body.created_at) : undefined,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article == null) {
		res.send("Invalid request");
		return;
	}

	res.redirect("/dashboard");
});

export default router;
