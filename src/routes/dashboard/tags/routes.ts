import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/edit_tags", async (_, res) => {
	const tags = await prisma.tag.findMany({
		orderBy: {
			tag_id: "desc",
		},
	});

	res.render("users/edit_tags", { tags });
});

router.post("/edit_tag/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	const tag = await prisma.tag
		.update({
			where: {
				tag_id: id,
			},
			data: {
				name: req.body.name,
				color: req.body.color,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (tag == null) {
		res.status(404).render("404", { message: "Tag not found" });
		return;
	}

	res.redirect("/dashboard/edit_tags");
});

router.get("/delete_tag/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	const tag = await prisma.tag
		.delete({
			where: {
				tag_id: id,
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (tag == null) {
		res.status(404).render("404", { message: "Tag not found" });
		return;
	}

	res.redirect("/dashboard/edit_tags");
});

router.get("/new_tag", async (_, res) => {
	const tag = await prisma.tag
		.create({
			data: {
				name: "New Tag",
			},
		})
		.catch((e) => {
			console.error(e);
		});

	if (tag == null) {
		res.status(404).render("404", { message: "Invalid request" });
		return;
	}

	res.redirect("/dashboard/edit_tags");
});

export default router;
