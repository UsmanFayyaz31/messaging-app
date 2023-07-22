import jwt from "jsonwebtoken";

export const createSecretToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
