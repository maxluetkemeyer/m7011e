import express from "express";
import { PrismaClient } from "@prisma/client";
import { generateTOTPSecret, totp_to_url, validateToken } from "../../../totp.js";
import { MyJWT } from "../../../jwt.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/totp", async (req, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_name = jwtPayload.name;
	const email = jwtPayload.email;
	const user_id = jwtPayload.user_id;

	const user = await prisma.users
		.findUnique({
			where: {
				user_id,
			},
		})
		.catch((e) => {
			console.log(e);
		});

	if (!user) {
		res.status(404).render("404", { message: "User not found" });
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

	await prisma.users
		.update({
			where: {
				user_id,
			},
			data: {
				totp_secret,
			},
		})
		.catch((e) => {
			console.log(e);
		});

	res.redirect("/dashboard");
});

router.delete("/totp", async (_, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_id = jwtPayload.user_id;

	await prisma.users
		.update({
			where: {
				user_id,
			},
			data: {
				totp_secret: null,
			},
		})
		.catch((e) => {
			console.log(e);
		});

	res.redirect("/dashboard");
});

export default router;
