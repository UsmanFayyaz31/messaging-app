import express from "express";

import { authMiddleware } from "../Middlewares/AuthMiddleware";
import User from "../Models/UserModel";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  User.find({}).then((results) => res.send(results).status(200));
});

export default router;
