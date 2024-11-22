import express from "express";

import homeRouter from "./home/routes.js";
import loginRouter from "./login/routes.js";
import registerRouter from "./register/routes.js";
import articleRouter from "./article/routes.js";
import dashboardRouter from "./dashboard/routes.js";
import { groupAuthorization } from "../authorization.js";

const router = express.Router({ mergeParams: true });

router.use("/", homeRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/article", articleRouter);
router.use("/dashboard", groupAuthorization(["author", "admin"]), dashboardRouter);

router.get("/logout", (_, res) => {
	res.clearCookie("jwt");
	res.redirect("/");
});

export default router;