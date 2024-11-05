import express from "express";
import article from "./article.ts";

const router = express.Router({ mergeParams: true });

router.use("/article", article);

export default router;
