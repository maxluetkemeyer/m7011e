import { PrismaClient, users } from "@prisma/client";
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { signJWT } from "../../jwt.js";

const prisma = new PrismaClient();

export async function getJWT(user: users): Promise<string> {
	// JWT
	const groups = await prisma.user_group_member.findMany({
		where: {
			user_id: user.user_id,
		},
		include: {
			user_group: true,
		},
	})

	const groupNames = groups
		.map((group) => group.user_group.name)
		.filter((name): name is string => name !== null);

	const jwt = await signJWT({
		user_id: user.user_id,
		name: user.name,
		email: user.email,
		groups: groupNames,
	});

	return jwt;
}

export async function login(email: string, password: string): Promise<string | users> {
	const user = await prisma.users.findFirst({
		where: {
			email,
		},

	}).catch((e) => {
		console.log(e);
	});

	if (user == null) {
		return "User not found";
	}

	const saltBuffer = Buffer.from(user.salt, "hex");

	const passwordHash = (await scryptAsync(password, saltBuffer, 512)) as Buffer;

	if (passwordHash.toString("hex") !== user.password_hash) {
		return "Invalid password";
	}

	return user;
}

const randomBytesAsync = promisify(randomBytes);
const scryptAsync = promisify(scrypt);

export async function generate_salt_hex() {
	const salt = await randomBytesAsync(128);
	return salt.toString("hex");
}

export async function hash_password(password: string, saltAsHex: string) {
	const salt = Buffer.from(saltAsHex, "hex");
	const password_hash = (await scryptAsync(password, salt, 512)) as Buffer;
	return password_hash.toString("hex");
}
