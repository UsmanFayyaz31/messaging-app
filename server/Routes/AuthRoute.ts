import { Router } from "express";

import { Login, Signup } from "../Controllers/AuthController";

const router: Router = Router();

router.post("/signup", Signup);
router.post("/login", Login);

export default router;
