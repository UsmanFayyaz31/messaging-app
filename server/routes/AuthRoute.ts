import { Router } from "express";

import { Login, Signup } from "../Controllers/AuthController";
import { userVerification } from "../Middlewares/AuthMiddleware";

const router: Router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);

export default router;
