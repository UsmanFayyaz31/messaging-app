import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

import { createSecretToken } from "../util/SecretToken";
import User from "../Models/UserModel";
import { MyResponseType, UserResponseType, RoutesMiddlewareType } from "./types";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

export const Signup: RoutesMiddlewareType = (req, res, next) => {
  upload.single("profilePicture")(req, res, (err) => {
    if (err) {
      console.error("Error uploading profile picture:", err);
      return res.status(400).json({ error: "Error uploading profile picture" });
    }

    const { email, password, username, createdAt } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    User.create({ email, password, username, createdAt, profilePicture })
      .then((user) => {
        const token = createSecretToken(user.id);

        let userResponse: UserResponseType = {
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          id: user.id,
          token: token,
          profilePicture: user.profilePicture,
        };

        let data: MyResponseType<UserResponseType> = {
          message: "User created successfully",
          success: true,
          response: userResponse,
        };

        res.status(201).json({ ...data });
        next();
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
};

export const Login: RoutesMiddlewareType = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    User.findOne({ email }).then((user) => {
      if (!user) return res.json({ message: "Incorrect password or email" });

      bcrypt.compare(password, user.password!).then((auth) => {
        if (!auth) return res.json({ message: "Incorrect password or email" });

        const token = createSecretToken(user.id);

        let userResponse: UserResponseType = {
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          id: user.id,
          token: token,
          profilePicture: user.profilePicture,
        };

        let data: MyResponseType<UserResponseType> = {
          message: "User signed in successfully",
          success: true,
          response: userResponse,
        };

        res.status(201).json({ ...data });
        next();
      });
    });
  } catch (error) {
    console.error(error);
  }
};
