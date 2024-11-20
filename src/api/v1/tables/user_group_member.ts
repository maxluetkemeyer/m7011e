import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

// READ All
router.get("/", async (_, res) => {
	const user_group_members = await prisma.user_group_member
		.findMany({
			orderBy: {
				group_id: "asc",
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_group_members == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_group_members);
});

// READ specific
router.get("/:groupId/:userId", async (req, res) => {
	const user_group_member = await prisma.user_group_member
		.findUnique({
			where: {
                group_id_user_id: {
                    group_id: parseInt(req.params.groupId),
                    user_id: parseInt(req.params.userId),
                },
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_group_member == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_group_member);
});

// CREATE
router.post("/", async (req, res) => {
	const user_group_member = await prisma.user_group_member
		.create({
			data: {
				group_id: parseInt(req.body.group_id),
                user_id: parseInt(req.body.user_id),
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_group_member == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_group_member);
});

// NO UPDATE, as there is only the primary key!

// DELETE
router.delete("/:groupId/:userId", async (req, res) => {
	const user_group_member = await prisma.user_group_member
		.delete({
			where: {
				group_id_user_id: {
					group_id: parseInt(req.params.groupId),
					user_id: parseInt(req.params.userId),
				},
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (user_group_member == null) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	res.json(user_group_member);
});

export default router;
