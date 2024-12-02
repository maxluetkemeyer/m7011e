import express, { Request, Response } from "express";
import { StorageSingleton } from "../../src/store.js";

const router = express.Router({ mergeParams: true });

router.get("/jwt/secret", (_: Request, res: Response) => {
	const jwt_secret = StorageSingleton.instance.JWT_SECRET;

	console.log("[AUTH INTERNAL] Sending JWT SECRET:", jwt_secret);
	res.send({ jwt_secret });
});

export default router;
