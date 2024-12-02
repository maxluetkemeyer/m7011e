import "dotenv/config";
import { StorageSingleton } from "./store.js";

export async function configure() {
	checkNodeVersion();
	await readJWTSecret();
}

function checkNodeVersion() {
	const [major, minor, patch] = process.versions.node.split(".").map(Number);

	if (major < 23) {
		console.debug(major, minor, patch);
		throw new Error("Node.js version 23 or higher is required.");
	}	
}

async function readJWTSecret() {
	// Auth for development
	const USE_EXTRA_AUTH_SERVICE = process.env.USE_EXTRA_AUTH_SERVICE;

	if (USE_EXTRA_AUTH_SERVICE === "True") {
		await getTOTPSecretFromAuthService();
	} else {
		const jwt_secret = process.env.AUTH_JWT_SECRET;
		if (!jwt_secret) {
			throw new Error("Please set environment variable AUTH_JWT_SECRET");
		}

		StorageSingleton.instance.JWT_SECRET = jwt_secret;
	}
}


async function getTOTPSecretFromAuthService() {
	const storage = StorageSingleton.instance;
	const authServiceUrl = process.env.AUTH_SERVICE_URL;
	const authServicePort = process.env.AUTH_SERVICE_PORT;

	const response = await fetch(`${authServiceUrl}:${authServicePort}/jwt/secret`, {
		method: "GET",
		
	}).catch((e) => {
		console.log(e);
	});

	if(!response){
		console.log("TOTP response failed, trying again...", response);
		await sleep(2000);
		await getTOTPSecretFromAuthService();
		return;
	}

	const responseJson = await response.json();
	const jwt_secret = responseJson.jwt_secret;

	if (!jwt_secret || jwt_secret === "") {
		console.log("Could not get jwt secret, trying again...", jwt_secret, responseJson);
		await sleep(2000);
		await getTOTPSecretFromAuthService();
		return;
	}

	storage.JWT_SECRET = jwt_secret;
	console.log("set jwt secret from auth service", jwt_secret);
}

async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
