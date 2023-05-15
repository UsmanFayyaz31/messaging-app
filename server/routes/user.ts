import express from "express";
import User from "../schema/User";

const router = express.Router();

router.get("/", async (req, res) => {
    let results = await User.find({});
    res.send(results).status(200);
});

export default router;