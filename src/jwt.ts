import { createSecretKey, KeyObject } from "crypto";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { StorageSingleton } from "./store.js";
import assert from "node:assert";

const secretKeyLive = createSecretKey(StorageSingleton.instance.JWT_SECRET, "utf-8");
assert(StorageSingleton.instance.JWT_SECRET != "");

export interface MyJWT extends JWTPayload {
	user_id: number;
	name: string;
	email: string;
	groups: string[];
}

export async function signJWT(
	payload: MyJWT,
	secretKey: KeyObject = secretKeyLive,
): Promise<string> {
	const token = await new SignJWT(payload) // details to  encode in the token
		.setProtectedHeader({
			alg: "HS256",
		}) // algorithm
		.setIssuedAt()
		//.setIssuer(process.env.JWT_ISSUER) // issuer
		//.setAudience(process.env.JWT_AUDIENCE) // audience
		//.setExpirationTime(process.env.JWT_EXPIRATION_TIME) // token expiration time, e.g., "1 day"
		.setExpirationTime("15 minutes")
		.sign(secretKey); // secretKey generated from previous step

	return token;
}

export async function verifyJWT(
	jwt: string,
	secretKey: KeyObject = secretKeyLive,
): Promise<string | MyJWT> {
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
		//console.log(protectedHeader);

		return payload as MyJWT;
	} catch (e) {
		// token verification failed
		console.log("Token is invalid", e);

		return "Token is invalid";
	}
}
