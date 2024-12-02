import express, { Request, Response } from "express";
import { StorageSingleton } from "../../src/store.js";

const router = express.Router({ mergeParams: true });

router.get("/jwt/secret", (_: Request, res: Response) => {
	const jwt_secret = StorageSingleton.instance.JWT_SECRET;

	console.log("sending jwt secret", jwt_secret);
	res.send({ jwt_secret });
});

export default router;
