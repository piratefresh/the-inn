import { UserFullType, UserType } from "@typedefs/Prisma";
import cookie from "cookie";
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
    accessTokenExpires:
      Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  res.cookie("rid", token, {
    httpOnly: false,
  });
};

export const createToken = (user: UserType): string => {
  const payload: JWTPayload = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    id: user.id,
    accessTokenExpires:
      Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000,
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
    accessTokenExpires:
      Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000,
  };
  // return jwt
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: parseInt(process.env.TOKEN_MAX_AGE),
    algorithm: "HS512",
  });

  return refreshToken;
};

// export const setCookie = (user: UserType, res: Response): void => {
//   const payload: JWTPayload = {
//     email: user.email,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     id: user.id,
//   };
//   // return jwt
//   const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
//   res.setHeader("Set-Cookie", cookie.serialize("theinntoken", token), {
//     httpOnly: true,
//     maxAge: 6 * 60 * 60,
//     path: "/",
//     sameSite: "lax",
//     secure: process.env.NODE_ENV === "production",
//   });
// };
