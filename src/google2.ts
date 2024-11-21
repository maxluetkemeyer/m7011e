/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
const bucketName = "ltu_dynamicweb_mybucket";
const projectId = process.env.GOOGLE_PROJECT_ID;

// The contents that you want to upload
const contents = 'these are my contents';

// The new ID for your GCS file
const destFileName = 'your-new-file-name';

// Imports the Google Cloud Node.js client library
import { Storage } from "@google-cloud/storage";

// Creates a client
const storage = new Storage({
	projectId,
	keyFilename: "./privat/service_account_key.json",
});

async function uploadFromMemory() {
	await storage.bucket(bucketName).file(destFileName).save(contents);

	console.log(
		`${destFileName} with contents ${contents} uploaded to ${bucketName}.`,
	);
}

uploadFromMemory().catch(console.error);
