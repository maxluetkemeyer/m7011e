import express from "express";
import { PrismaClient } from "@prisma/client";
import { MyJWT } from "../../../jwt.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/edit_users", async (_, res) => {
	const users = await prisma.users
		.findMany({
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
		})
		.catch((e) => {
			console.error(e);
		});

	res.render("users/admin/edit_users", { users });
});

router.get("/edit_user/:id", async (req, res) => {
	const id = req.params.id;

	const user = await prisma.users
		.findUnique({
			where: {
				user_id: parseInt(id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (!user) {
		res.status(404).render("404", { message: "User not found" });
		return;
	}

	let otherGroups = await prisma.user_group.findMany();
	const groupsOfUser = await prisma.user_group.findMany({
		where: {
			user_group_member: {
				some: {
					user_id: parseInt(id),
				},
			},
		},
	});

	otherGroups = otherGroups.filter((group) => {
		for (const groupOfUser of groupsOfUser) {
			if (groupOfUser.group_id === group.group_id) {
				return false;
			}
		}
		return true;
	});

	res.render("users/admin/edit_user", { user, otherGroups, groupsOfUser });
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

	// Update groups
	const group_id_list: string[] = [];
	for (const property in req.body) {
		if (property.startsWith("my_group_")) {
			const group_id = property.replace("my_group_", "");
			group_id_list.push(group_id);
		}
	}
	
	await prisma.user_group_member
		.deleteMany({
			where: {
				user_id: id,
			},
		})
		.then(async () => {
			await prisma.user_group_member.createMany({
				data: group_id_list.map((value, _, __) => {
					return {
						group_id: parseInt(value),
						user_id: id,
					};
				}),
			});
		});

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

	const user = await prisma.users
		.delete({
			where: {
				user_id: id,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (!user) {
		res.status(404).render("404", { message: "User not found" });
		return;
	}

	res.redirect("/dashboard/edit_users");
});

export default router;
