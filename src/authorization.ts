import { Request, Response, NextFunction } from "express";
import { MyJWT, signJWT, verifyJWT } from "./jwt.js";

export function groupAuthorization(allowedGroupLevel: string) {
	return async (_: Request, res: Response, next: NextFunction) => {
		const jwtPayload = res.locals.my_jwtPayload as MyJWT;
		console.log(jwtPayload);

		const userGroups = jwtPayload.groups;
		//const isAllowed = userGroups.some((group) => allowedGroups.includes(group));
		let isAllowed = false;

		if (allowedGroupLevel === "admin") {
			for (const group of userGroups) {
				console.log(group);
				if (group === "admin") {
					isAllowed = true;
				}
			}
		}
		if (allowedGroupLevel === "author") {
			for (const group of userGroups) {
				console.log(group);
				if (group === "admin" || group === "author") {
					isAllowed = true;
				}
			}
		}
		if (allowedGroupLevel === "reader") {
			for (const group of userGroups) {
				console.log(group);
				if (group === "admin" || group === "author" || group === "reader") {
					isAllowed = true;
				}
			}
		}

		if (!isAllowed) {
			res.status(404).render("404", { message: "You are not allowed to see this." });
			return;
		}

		next();
	};
}

export function isLoggedIn(_: Request, res: Response, next: NextFunction) {
	const jwtPayload = res.locals.my_jwtPayload as MyJWT;

	if (!jwtPayload) {
		res.status(404).render("404", { message: "Please log in to see this page." });
		return;
	}

	next();
}

export async function readJWTPayload(req: Request, res: Response, next: NextFunction) {
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
}
