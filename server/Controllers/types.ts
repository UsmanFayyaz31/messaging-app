import { Request, Response, NextFunction } from "express";

export type RoutesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type LoginUserResponseType = {
  email: string | undefined;
  username: string | undefined;
  createdAt: Date;
  id: string;
  token: string;
};

export type MyResponseType<T> = {
  message: string;
  success: boolean;
  response: T;
};
