import { COOKIE_NAME, redisPrefices, __prod__ } from "../constants";
import session from "express-session";
import { redis, RedisStore } from "services/redis";
import dotenv from "dotenv";

dotenv.config();

export const sessionMiddleware = session({
  name: COOKIE_NAME,
  store: new RedisStore({
    client: redis as any,
    ttl: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    prefix: redisPrefices.redisSessionPrefix,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    httpOnly: false,
    sameSite: "lax", // csrf
    secure: __prod__, // cookie only works in https
    domain: __prod__ ? ".codeponder.com" : undefined,
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
