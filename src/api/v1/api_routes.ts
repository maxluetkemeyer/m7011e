import { Router } from "express";
import { groupAuthorization } from "../../authorization.js";

import article from "./tables/article.js";
import articleTag from "./tables/article_tag.js";
import tag from "./tables/tag.js";
import users from "./tables/users.js";
import user_group from "./tables/user_group.js";
import user_group_member from "./tables/user_group_member.js";



const router = Router({ mergeParams: true });

router.use(groupAuthorization(["admin"]));
router.use("/article_tag", articleTag)
router.use("/article", article);
router.use("/tag", tag);
router.use("/users", users);
router.use("/user_group", user_group);
router.use("/user_group_member", user_group_member);


export default router;
