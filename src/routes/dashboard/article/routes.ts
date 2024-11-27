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

	const article = await prisma.article
		.create({
			data: {
				title: "New Article",
				user_id: jwtPayload.user_id,
				created_at: new Date(),
			},
		})
		.catch((e) => {
			console.log(e);
		});

	if (!article) {
		res.status(404).render("404", { message: "Article not found" });
		return;
	}

	res.redirect(`/dashboard/edit_article/${article.article_id}`);
});

router.get("/delete_article/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.article
		.delete({
			where: {
				article_id: id,
			},
		})
		.catch((e) => {
			console.log(e);
		});

	res.redirect("/dashboard");
});

router.get("/edit_article/:id", async (req, res) => {
	const article = await prisma.article
		.findUnique({
			where: {
				article_id: Number(req.params.id),
			},
			include: {
				users: true,
			},
		})
		.catch((e) => {
			console.log(e);
		});

	if (!article) {
		res.status(404).render("404", { message: "Article not found" });
		return;
	}

	const authors = await prisma.users
		.findMany({
			where: {
				user_group_member: {
					some: {
						group_id: 2,
					},
				},
			},
		})
		.catch((e) => {
			console.log(e);
		});

	let otherTags = await prisma.tag.findMany({}).catch((e) => {
		console.log(e);
	});
	const tagsFromArticle = await prisma.tag
		.findMany({
			where: {
				article_tag: {
					some: {
						article_id: Number(req.params.id),
					},
				},
			},
		})
		.catch((e) => {
			console.log(e);
		});

	if (!otherTags) {
		res.status(404).render("404", { message: "Tags not found" });
		return;
	}
	if (!tagsFromArticle) {
		res.status(404).render("404", { message: "Tags not found" });
		return;
	}

	otherTags = otherTags.filter((tag) => {
		for (const tagFromArticle of tagsFromArticle) {
			if (tagFromArticle.tag_id === tag.tag_id) {
				return false;
			}
		}
		return true;
	});

	res.render("users/edit_article", {
		article,
		authors,
		otherTags,
		tagsFromArticle,
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

	// Update tags
	const tag_list: String[] = [];
	for (const property in req.body) {
		if (property.startsWith("my_tag_")) {
			const tag_id = property.replace("my_tag_", "");
			console.log(tag_id);
			tag_list.push(tag_id);
		}
	}
	await prisma.article_tag
		.deleteMany({
			where: {
				article_id: id,
			},
		})
		.then(async () => {
			await prisma.article_tag.createMany({
				data: tag_list.map((value, index, array) => {
					return {
						article_id: id,
						tag_id: Number(value),
					};
				}),
			});
		})
		.catch((e) => {
			console.log(e);
		});

	res.redirect("/dashboard");
});

export default router;
