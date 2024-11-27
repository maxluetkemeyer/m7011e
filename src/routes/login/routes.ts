import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", (_, res) => {
	res.render("login");
});

export default router;
