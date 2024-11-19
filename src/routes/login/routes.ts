import express from "express";
import { getJWT, login } from "./login.js";

const router = express.Router({ mergeParams: true });

router.get("/", (_, res) => {
	res.render("login");
});

router.post("/", async (req, res) => {
	// accessing form fields from req.body
	const email = req.body.email;
	const password = req.body.password;
	// verification steps
	if (!email || !password) {
		res.send({ message: "Please fill all fields" });
		return;
	}

	const loginResult = await login(email, password);

	if (typeof loginResult === "string") {
		console.log(loginResult);
		res.send({ message: "There was an error with your login." });
		return;
	}

	const user = loginResult;
	const jwt = await getJWT(user);

	res.cookie("jwt", jwt, {
		httpOnly: true,
		sameSite: "strict",
		secure: true,
		maxAge: 1000 * 60 * 15,
	}); //15 minutes

	res.redirect("/dashboard");
});

export default router;
