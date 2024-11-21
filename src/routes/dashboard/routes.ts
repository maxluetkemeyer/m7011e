import express from "express";
import { PrismaClient } from "@prisma/client";
import { groupAuthorization } from "../../authorization.js";
import { MyJWT } from "../../jwt.js";
import adminRouter from "./admin/routes.js";
import totpRouter from "./totp/routes.js";
import articleRouter from "./article/routes.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.use(groupAuthorization(["admin"]), adminRouter);
router.use(totpRouter);
router.use(articleRouter);

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

export default router;
