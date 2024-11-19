import { Router } from "express";
import article from "./tables/article.js";
import { groupAuthorization } from "../../authorization.js";

const router = Router({ mergeParams: true });

router.use(groupAuthorization(["admin"]));
router.use("/article", article);

export default router;
