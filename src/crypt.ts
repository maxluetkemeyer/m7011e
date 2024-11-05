import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const randomBytesAsync = promisify(randomBytes);
const scryptAsync = promisify(scrypt);

const salt = await randomBytesAsync(128);
//const salt = "salt";

// mycrypt.scrypt("password", salt, 512, (err, key) => {
// 	if (err) throw err;
// 	console.log(key.toString("hex"));
// });

const key = (await scryptAsync("password", salt, 512)) as Buffer;

console.log(key.toString("hex"));
