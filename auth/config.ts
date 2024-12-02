import "dotenv/config";
import { StorageSingleton } from "../src/store.js";

export function configure() {
	checkNodeVersion();
	readTOTPSecret();
}

function checkNodeVersion() {
	const [major, minor, patch] = process.versions.node.split(".").map(Number);

	if (major < 23) {
		console.debug(major, minor, patch);
		throw new Error("Node.js version 23 or higher is required.");
	}
}

function readTOTPSecret() {
	const totp_secret = process.env.AUTH_TOTP_SECRET;
	if (!totp_secret) {
		throw new Error("Please set environment variable AUTH_TOTP_SECRET");
	}
	console.log(totp_secret);

	StorageSingleton.instance.JWT_SECRET = totp_secret;
}
