import express from "express";
import { MyJWT } from "../../jwt.js";

const router = express.Router({ mergeParams: true });

router.get("/", (_, res) => {
	res.render("register");
});

router.get("/thankyou", (_, res) => {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;
	const user_name = jwtPayload.name;

	res.render("register_thankyou", { user_name });
});

export default router;
