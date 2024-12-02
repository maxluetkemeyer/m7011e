import "dotenv/config";
import { StorageSingleton } from "../src/store.js";

export function configure() {
	checkNodeVersion();
	readJWTSecret();
}

function checkNodeVersion() {
	const [major, minor, patch] = process.versions.node.split(".").map(Number);

	if (major < 23) {
		console.debug(major, minor, patch);
		throw new Error("Node.js version 23 or higher is required.");
	}
}

function readJWTSecret() {
	const jwt_secret = process.env.AUTH_JWT_SECRET;
	if (!jwt_secret) {
		throw new Error("Please set environment variable AUTH_JWT_SECRET");
	}
	console.log(jwt_secret);

	StorageSingleton.instance.JWT_SECRET = jwt_secret;
}
