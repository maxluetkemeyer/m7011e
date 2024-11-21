import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.get("/edit_users", (_, res) => {
	res.render("users/admin/edit_users", { myVar: "Hey" });
});

router.get("/edit_user", (_, res) => {
	res.render("users/admin/edit_user", { myVar: "Hey" });
});

export default router;
