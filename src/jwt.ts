import { createSecretKey } from "crypto";
import { SignJWT, jwtVerify } from "jose";

const MY_SECRET = "Hello, World!";

const secretKey = createSecretKey(MY_SECRET, "utf-8");

const payload = {
	user_id: "1234567890",
	name: "John Doe",
	groups: ["reader", "author"],
};

async function one() {
	const token = await new SignJWT(payload) // details to  encode in the token
		.setProtectedHeader({
			alg: "HS256",
		}) // algorithm
		.setIssuedAt()
		//.setIssuer(process.env.JWT_ISSUER) // issuer
		//.setAudience(process.env.JWT_AUDIENCE) // audience
		//.setExpirationTime(process.env.JWT_EXPIRATION_TIME) // token expiration time, e.g., "1 day"
		.sign(secretKey); // secretKey generated from previous step
	console.log(token); // log token to console

	return token;
}

const jwt = await one();

async function two() {
	// extract token from request
	//const token = req.header("Authorization").replace("Bearer ", "");
	const token = jwt;

	try {
		// verify token
		const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
			//issuer: process.env.JWT_ISSUER, // issuer
			//audience: process.env.JWT_AUDIENCE, // audience
		});
		// log values to console
		console.log(payload);
		console.log(protectedHeader);
	} catch (e) {
		// token verification failed
		console.log("Token is invalid", e);
	}
}

two();