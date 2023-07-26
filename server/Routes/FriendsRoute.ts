import { Router } from "express";

import { authMiddleware } from "../Middlewares/AuthMiddleware";
import { getFriends } from "../Controllers/FriendsController";

const router: Router = Router();

router.get("/", authMiddleware, getFriends);

export default router;
