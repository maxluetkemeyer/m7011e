import express from "express";
import { PrismaClient } from "@prisma/client";

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

export default router;
