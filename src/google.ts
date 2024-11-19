import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

/**
 * TODO(developer):
 *  1. Uncomment and replace these variables before running the sample.
 *  2. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
 *  3. Make sure you have the necessary permission to list storage buckets "storage.buckets.list"
 *    (https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions)
 */
const projectId = process.env.GOOGLE_PROJECT_ID;

async function authenticateImplicitWithAdc() {
	// This snippet demonstrates how to list buckets.
	// NOTE: Replace the client created below with the client required for your application.
	// Note that the credentials are not specified when constructing the client.
	// The client library finds your credentials using ADC.
	const storage = new Storage({
		projectId,
		keyFilename: "./privat/service_account_key.json",
	});
	const [buckets] = await storage.getBuckets();
	console.log("Buckets:");

	for (const bucket of buckets) {
		console.log(`- ${bucket.name}`);
	}

	console.log("Listed all storage buckets.");

	const bucket = storage.bucket("ltu_dynamicweb_mybucket");

	async function listFiles() {
		// Lists files in the bucket
		const [files] = await bucket.getFiles();

		console.log("Files:");
		files.forEach((file) => {
			console.log(file.name);
		});
	}

	listFiles().catch(console.error);

}

authenticateImplicitWithAdc();
