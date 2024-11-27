import express from "express";
import { createUser } from "./register.js";
import { getJWT } from "../login/login.js";

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
	// accessing form fields from req.body
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	// verification steps
	if (!username || !email || !password) {
		res.send({ message: "Please fill all fields" });
		return;
	}

	// create user
	const createUserResult = await createUser({
		name: username,
		email,
		password,
	});
	if (typeof createUserResult === "string") {
		console.log(createUserResult);
		res.send({ message: createUserResult });
		return;
	}

	// JWT
	const user = createUserResult;
	const jwt = await getJWT(user);
	res.cookie("jwt", jwt, {
		httpOnly: true,
		sameSite: "strict",
		secure: true,
		maxAge: 1000 * 60 * 15,
	});

	res.redirect("/register/thankyou");
});

export default router;
