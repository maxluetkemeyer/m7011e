import express from "express";
import { PrismaClient } from "@prisma/client";
import { MyJWT } from "../../../jwt.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/edit_users", async (_, res) => {
	const users = await prisma.users.findMany({
		orderBy: {
			user_id: "asc",
		},
		include: {
			user_group_member: {
				include: {
					user_group: true,
				},
			},
		},
	});

	res.render("users/admin/edit_users", { users });
});

router.get("/edit_user/:id", async (req, res) => {
	const id = req.params.id;

	const user = await prisma.users.findUnique({
		where: {
			user_id: parseInt(id),
		},
		include: {
			user_group_member: {
				include: {
					user_group: true,
				},
			},
		},
	});

	res.render("users/admin/edit_user", { user });
});

router.post("/edit_user/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	
	const article = await prisma.users
		.update({
			where: {
				user_id: id,
			},
			data: {
				name: req.body.name,
				email: req.body.email,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (article == null) {
		res.send("Invalid request");
		return;
	}

	res.redirect("/dashboard/edit_users");
});

router.get("/delete_user/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;

	// A user cannot delete themselves
	if (jwtPayload.user_id === id) {
		res.redirect("/dashboard/edit_users");
		return;
	}

	//TODO: Check written articles condition!
	await prisma.users.delete({
		where: {
			user_id: id,
		},
	});

	res.redirect("/dashboard/edit_users");
});

export default router;
