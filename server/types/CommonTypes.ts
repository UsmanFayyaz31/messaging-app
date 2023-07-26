import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
    };
  }
}

export type RoutesMiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type MyResponseType<T> = {
  message: string;
  success: boolean;
  response?: T;
};
