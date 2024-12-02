import express, { Request, Response } from "express";
import { StorageSingleton } from "../../src/store.js";

const router = express.Router({ mergeParams: true });

router.get("/totp/secret", (_: Request, res: Response) => {
	const totp_secret = StorageSingleton.instance.JWT_SECRET;

	console.log("sending totp secret", totp_secret);
	res.send({ totp_secret });
});

export default router;
