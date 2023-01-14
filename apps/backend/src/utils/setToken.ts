import { __prod__ } from "@/constants";
import { UserType } from "@typedefs/Prisma";
import { Response } from "express";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  id: string;
  email: string | null;
  firstName?: string | null;
  lastName?: string | null;
  accessTokenExpires: number;
}

export const setToken = (user: UserType, res: Response): void => {
  const payload: JWTPayload = {
    email: user.email,
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    accessTokenExpires: 30 * 24 * 60 * 60,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  res.cookie("rid", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: __prod__,
  });
};

export const createToken = (user: UserType): string => {
  const payload: JWTPayload = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    id: user.id,
    accessTokenExpires: 30 * 24 * 60 * 60,
  };
  // return jwt
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return token;
};

export const createRefreshToken = (user: UserType) => {
  const payload: JWTPayload = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    id: user.id,
    accessTokenExpires: 30 * 24 * 60 * 60,
  };
  // return jwt
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: parseInt(process.env.TOKEN_MAX_AGE),
    algorithm: "HS512",
  });

  return refreshToken;
};
