import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";

export const redis = new Redis(
  "redis://default:5f5e5f43080a498db82af877c1acbcc7@us1-main-osprey-38760.upstash.io:38760"
);

export const RedisStore = connectRedis(session);
