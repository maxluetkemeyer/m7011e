import { PrismaClient, users } from "@prisma/client";
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const prisma = new PrismaClient();
const randomBytesAsync = promisify(randomBytes);
const scryptAsync = promisify(scrypt);

interface NewUser {
	name: string;
	email: string;
	password: string;
}

export async function createUser(credentials: NewUser): Promise<string | users> {
	const { name, email, password } = credentials;

	// Check if email is already in use
	const existingUser = await prisma.users.findFirst({
		where: {
			email: email,
		},
	});

	if (existingUser) {
		return "Email already in use";
	}

	const salt = await randomBytesAsync(128);
	const password_hash = (await scryptAsync(password, salt, 512)) as Buffer;

	const user = await prisma.users.create({
		data: {
			name,
			email,
			password_hash: password_hash.toString("hex"),
			salt: salt.toString("hex"),
		},
	});

	return user;
}
