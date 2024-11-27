import express from "express";
import { getJWT, login } from "./login.js";
import { validateToken } from "../../totp.js";

const router = express.Router({ mergeParams: true });

router.get("/", (_, res) => {
	res.render("login");
});

router.post("/", async (req, res) => {
	// accessing form fields from req.body
	const email = req.body.email;
	const password = req.body.password;
	const totp_token = req.body.totp_token;
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

	// Check TOTP
	if (user.totp_secret) {
		if (!totp_token) {
			res.send({ message: "Missing TOTP token" });
			return;
		}

		const valiadtionResult = validateToken(totp_token, user.totp_secret, user.email);

		if (!valiadtionResult) {
			res.send({ message: "Invalid TOTP token" });
			return;
		}
	}

	const jwt = await getJWT(user);

	res.cookie("jwt", jwt, {
		httpOnly: true,
		sameSite: "strict",
		secure: true,
		maxAge: 1000 * 60 * 15,
	}); //15 minutes

	
	

	res.redirect("/");
});

export default router;
