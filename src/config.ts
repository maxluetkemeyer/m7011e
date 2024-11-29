import { app as authApp } from "../auth/app.js";
import { Express } from "express";

export function configure() {
	const [major, minor, patch] = process.versions.node.split(".").map(Number);

	if (major < 23) {
		console.debug(major, minor, patch);
		throw new Error("Node.js version 23 or higher is required.");
	}
}

export function appConfiguration(app: Express) {
	// Auth for development
	const USE_EXTRA_AUTH_SERVICE = process.env.USE_EXTRA_AUTH_SERVICE;

	if (USE_EXTRA_AUTH_SERVICE !== "False") {
		app.use(authApp);
	}
}
