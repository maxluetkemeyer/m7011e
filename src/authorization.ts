import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "./jwt.js";

export function groupAuthorization(allowedGroups: string[]) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const cookies = req.cookies;
		console.log(cookies);
		const jwt = cookies.jwt;
		if (!jwt) {
			res.status(401).send("Unauthorized");
			return;
		}
		const verifyResult = await verifyJWT(jwt);

		if (typeof verifyResult === "string") {
			res.status(401).send("Unauthorized");
			return;
		}
		console.log(verifyResult);

		const userGroups = verifyResult.groups;
		const isAllowed = userGroups.some((group) =>
			allowedGroups.includes(group),
		);

		if (!isAllowed) {
			res.status(403).send("Forbidden");
			return;
		}

		next();
	};
}

export function readJWTPayload() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const cookies = req.cookies;
		console.log(cookies);
		const jwt = cookies.jwt;
		if (!jwt) {
			next();
			return;
		}
		const verifyResult = await verifyJWT(jwt);

		if (typeof verifyResult === "string") {
			next();
			return;
		}

		res.locals.my_jwtPayload = verifyResult;

		next();
	};
}
