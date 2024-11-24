import express from "express";
import { PrismaClient } from "@prisma/client";
import { MyJWT } from "../../jwt.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/", async (_, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_id = jwtPayload.user_id;

	let setting = await prisma.setting
		.findUnique({
			where: {
				user_id: user_id,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (!setting) {
		setting = await prisma.setting
			.create({
				data: {
					user_id: user_id,
				},
			})
			.catch((e) => {
				console.error(e);
			});
	}

	res.render("users/settings", {
		setting,
	});
});

router.post("/", async (req, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_id = jwtPayload.user_id;

	let load_images_parsed;
	if (req.body.load_images !== undefined) {
		if (req.body.load_images === "true") {
			load_images_parsed = true;
		} else {
			load_images_parsed = false;
		}
	}

	const setting = await prisma.setting
		.update({
			where: {
				user_id,
			},
			data: {
				load_images: load_images_parsed,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (setting == null) {
		res.send("Invalid request");
		return;
	}

	res.redirect("/");
});

export default router;
