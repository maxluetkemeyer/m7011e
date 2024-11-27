import { Router } from "express";
import { groupAuthorization } from "../../authorization.js";

import article from "./tables/article.js";
import articleTag from "./tables/article_tag.js";
import tag from "./tables/tag.js";
import users from "./tables/users.js";
import user_group from "./tables/user_group.js";
import user_group_member from "./tables/user_group_member.js";

const router = Router({ mergeParams: true });

router.use("/article_tag", articleTag);
router.use("/article", article);
router.use("/tag", tag);
router.use("/users", groupAuthorization("admin"), users);
router.use("/user_group", groupAuthorization("admin"), user_group);
router.use("/user_group_member", groupAuthorization("admin"), user_group_member);

export default router;
