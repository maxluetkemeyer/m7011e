import express, { Request, Response } from "express";
import { StorageSingleton } from "../../src/store.js";

const router = express.Router({ mergeParams: true });

router.get("/totp/secret", (_: Request, res: Response) => {
	res.send({ totp_secret: StorageSingleton.instance.JWT_SECRET });
});

export default router;
