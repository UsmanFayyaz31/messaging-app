import { Router } from "express";

import { CreateMessage, MessagesList } from "../Controllers/MessagesController";
import { authMiddleware } from "../Middlewares/AuthMiddleware";

const router: Router = Router();

router.post("/", authMiddleware, CreateMessage);
router.get("/:selectedUserId", authMiddleware, MessagesList);

export default router;
