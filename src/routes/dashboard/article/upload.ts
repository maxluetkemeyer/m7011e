import { Storage } from "@google-cloud/storage";
import { PipelineSource } from "stream";

export type SaveData =
	| string
	| Buffer
	| Uint8Array
	| PipelineSource<string | Buffer | Uint8Array>;

const bucketName = "ltu_dynamicweb_mybucket";
const projectId = process.env.GOOGLE_PROJECT_ID;
export const GOOGLE_URL_PREFIX =
	"https://storage.googleapis.com/ltu_dynamicweb_mybucket/";

// Creates a client
const storage = new Storage({
	projectId,
	keyFilename: "./privat/service_account_key.json",
});

export async function uploadFromMemory(
	destination: string,
	contents: SaveData,
) {
	await storage.bucket(bucketName).file(destination).save(contents);

	console.log(`File uploaded to ${GOOGLE_URL_PREFIX}${destination}`);
}
