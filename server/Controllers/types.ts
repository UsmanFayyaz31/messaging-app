import { Request, Response, NextFunction } from "express";

export type RoutesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type UserResponseType = {
  email: string | undefined;
  username: string | undefined;
  createdAt: Date;
  id: string;
  token: string;
  profilePicture: undefined | string;
};

export type MyResponseType<T> = {
  message: string;
  success: boolean;
  response: T;
};
