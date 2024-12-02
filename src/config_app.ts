import { app as authApp } from "../auth/app.js";
import { Express } from "express";
import "dotenv/config";

export async function appConfiguration(app: Express) {
	// Auth for development
	const USE_EXTRA_AUTH_SERVICE = process.env.USE_EXTRA_AUTH_SERVICE;

	if (USE_EXTRA_AUTH_SERVICE === "True") {
		//
	} else {
		app.use(authApp);
	}
}
