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

export interface UserData {
  id?: string;
  username?: string;
  profilePicture?: string;
}

export interface GetFriendsResponse {
  users: UserData[];
}
