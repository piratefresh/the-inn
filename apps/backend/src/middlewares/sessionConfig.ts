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
    httpOnly: true,
    secure: __prod__,
    sameSite: "lax",
    domain: __prod__ ? ".theinn.app" : undefined,
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
});
