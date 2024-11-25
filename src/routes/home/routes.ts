import express, { Response } from "express";
import { PrismaClient, setting } from "@prisma/client";
import { MyJWT } from "../../jwt.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/", async (_, res) => {
	const my_user_settings = await load_settings(res);

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
			renderThumbnails(imageUrl: string) {
				if (!my_user_settings.load_images) {
					return false;
				}

				if (!imageUrl) {
					return false;
				}

				return true;
			},
		},
	});
});

async function load_settings(res: Response): Promise<setting> {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;

	if (!jwtPayload) {
		return {
			load_images: true,
			user_id: 0,
		};
	}
	const user_id = jwtPayload.user_id;

	const setting = await prisma.setting
		.findUnique({
			where: {
				user_id,
			},
		})
		.catch((e) => {
			console.log(e);
		});

	if (!setting) {
		return {
			load_images: true,
			user_id: 0,
		};
	}

	return setting;
}

export default router;
