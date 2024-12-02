import "dotenv/config";
import { StorageSingleton } from "./store.js";

export async function configure() {
	await checkNodeVersion();
}

async function checkNodeVersion() {
	const [major, minor, patch] = process.versions.node.split(".").map(Number);

	if (major < 23) {
		console.debug(major, minor, patch);
		throw new Error("Node.js version 23 or higher is required.");
	}

	/////////////////////////////////

	// Auth for development
	const USE_EXTRA_AUTH_SERVICE = process.env.USE_EXTRA_AUTH_SERVICE;

	if (USE_EXTRA_AUTH_SERVICE === "True") {
		await getTOTPSecretFromAuthService();
	} else {
		const totp_secret = process.env.AUTH_TOTP_SECRET;
		if (!totp_secret) {
			throw new Error("Please set environment variable AUTH_TOTP_SECRET");
		}
		console.log(totp_secret);

		StorageSingleton.instance.JWT_SECRET = totp_secret;
	}
}

async function getTOTPSecretFromAuthService() {
	const storage = StorageSingleton.instance;
	const authServiceUrl = process.env.AUTH_SERVICE_URL;
	const authServicePort = process.env.AUTH_SERVICE_PORT;

	const response = await fetch(`${authServiceUrl}:${authServicePort}/totp/secret`, {
		method: "GET",
		
	}).catch((e) => {
		console.log(e);
	});

	if(!response){
		console.log("Could not get totp secret, trying again...");
		await sleep(2000);
		getTOTPSecretFromAuthService();
		return;
	}

	const responseJson = response.json() as any;
	const totp_secret = responseJson.totp_secret;

	if (!totp_secret || totp_secret === "") {
		console.log("Could not get totp secret, trying again...");
		await sleep(2000);
		getTOTPSecretFromAuthService();
		return;
	}

	storage.JWT_SECRET = totp_secret;
}

async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
