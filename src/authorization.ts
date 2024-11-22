import { Request, Response, NextFunction } from "express";
import { signJWT, verifyJWT } from "./jwt.js";

export function groupAuthorization(allowedGroups: string[]) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const cookies = req.cookies;
		//console.log(cookies);
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
		//console.log(verifyResult);

		const userGroups = verifyResult.groups;
		const isAllowed = userGroups.some((group) => allowedGroups.includes(group));

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
		//console.log(cookies);
		const jwt = cookies.jwt;
		if (!jwt) {
			next();
			return;
		}
		const verifyResult = await verifyJWT(jwt);

		// If the JWT is invalid, continue without setting the payload
		if (typeof verifyResult === "string") {
			next();
			return;
		}

		res.locals.my_jwtPayload = verifyResult;

		// Refresh JWT
		const jwt_refreshed = await signJWT({
			user_id: verifyResult.user_id,
			name: verifyResult.name,
			email: verifyResult.email,
			groups: verifyResult.groups,
		});
		res.cookie("jwt", jwt_refreshed, {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			maxAge: 1000 * 60 * 15,
		}); // 15 minutes

		next();
	};
}
