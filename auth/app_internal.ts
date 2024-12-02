import express from "express";
import bodyparser from "body-parser";
import internalRouter from "./internal/router.js";

export const appInternal = express();

// Body data of a HTML Reqquest should be considered and read as json data
appInternal.use(bodyparser.urlencoded({ extended: true }));
appInternal.use(bodyparser.json());

// Log every request in the console (middleware)
appInternal.use((req, _, next) => {
	console.log("[AUTH INTERNAL]", req.method, req.url);
	next();
});

export const totp_secret = process.env.AUTH_TOTP_SECRET;
if (!totp_secret) {
	throw new Error("Please set environment variable AUTH_TOTP_SECRET");
}
export const TOTP_SECRET = totp_secret;

// Route every other request to /[somtheting] to the importer router
// appInternal.use("/auth/login", routerLogin);

appInternal.use("/", internalRouter)