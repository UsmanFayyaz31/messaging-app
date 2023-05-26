import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { createSecretToken } from "../util/SecretToken";
import User from "../Models/UserModel";
import {
  MyResponseType,
  LoginUserResponseType,
  RoutesMiddleware,
} from "./types";

export const Signup: RoutesMiddleware = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user.id);

    let userResponse: LoginUserResponseType = {
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      id: user.id,
      token: token,
    };

    let data: MyResponseType<LoginUserResponseType> = {
      message: "User created successfully",
      success: true,
      response: userResponse,
    };

    res.status(201).json({ ...data });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user.id);

    let userResponse: LoginUserResponseType = {
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      id: user.id,
      token: token,
    };

    let data: MyResponseType<LoginUserResponseType> = {
      message: "User signed in successfully",
      success: true,
      response: userResponse,
    };

    res.status(201).json({ ...data });
    next();
  } catch (error) {
    console.error(error);
  }
};
