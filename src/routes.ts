import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
	const articles = await prisma.article.findMany();

	res.render("index", { myVar: "Hey", articles });
});

router.get("/about", (req, res) => {
	res.render("about", { myVar: "Hey" });
});

router.get("/login", (req, res) => {
	res.render("login", { myVar: "Hey" });
});

router.get("/dashboard", (req, res) => {
	res.render("users/dashboard", { myVar: "Hey" });
});

router.get("/dashboard/write_article", (req, res) => {
	res.render("users/write_article", { myVar: "Hey" });
});

router.get("/dashboard/edit_users", (req, res) => {
	res.render("users/admin/edit_users", { myVar: "Hey" });
});

router.get("/dashboard/edit_user", (req, res) => {
	res.render("users/admin/edit_user", { myVar: "Hey" });
});

export default router;
