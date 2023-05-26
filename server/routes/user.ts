import express from "express";
import User from "../Models/UserModel";

const router = express.Router();

router.get("/", async (req, res) => {
    let results = await User.find({});
    res.send(results).status(200);
});

export default router;