import express, { Request, Response } from "express";
import { TOTP_SECRET } from "../app_internal.js";

const router = express.Router({ mergeParams: true });

router.get("/totp/secret", (_: Request, res: Response) => {
	res.send({ totp_secret: TOTP_SECRET });
});

export default router;
