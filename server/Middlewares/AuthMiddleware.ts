import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../Models/UserModel";

const userVerification = async (req: Request, res: Response) => {
  const token = req.body.token;
  if (!token) return res.json({ status: false });

  jwt.verify(token, process.env.TOKEN_KEY!, async (err: any, data: any) => {
    if (err) return res.json({ status: false });
    else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};

export default userVerification;
