import { User } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_COOKIE_NAME = "rid";
const JWT_SECRET_KEY = "keyboard-cat";

export interface jwtPayload {
  id: string;
  email: string | null;
}

export const setToken = (user: User, res: Response): void => {
  const payload: jwtPayload = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(payload, "keyboard-cat");

  res.cookie(JWT_COOKIE_NAME, token, {
    httpOnly: true,
  });
};
