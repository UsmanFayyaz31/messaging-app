import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../Models/UserModel";

export const userVerification = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.json({ status: false });

  jwt.verify(token, process.env.JWT_SECRET!, async (err: any, data: any) => {
    if (err) return res.json({ status: false });
    else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    (req as any).user = user;
    next();
  });
};
