/**
 * Rate-limiter middleware
 * user: jackdevey
 * date: 01/09/2022
 * uses: [upstash]
 */

/**
 * It would probably be better to move this
 * to a seperate sever, can look into this in
 * the future.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/with-fetch";
import { Request, Response, NextFunction } from "express";

// Setup rate-limiter
const rl = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 h"),
});

// Rate-limiter middleware function
export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get ip address from headers
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Use upstash to see if ip is rate-limited
  const { success, limit, remaining, reset } = await rl.limit(ip as string);

  // Return rate limit info in headers
  res.header("X-Rate-Limit-Limit", limit.toString());
  res.header("X-Rate-Limit-Remaining", remaining.toString());
  res.header("X-Rate-Limit-Reset", reset.toString());

  // If request is allowed, continue
  if (success) return next();
}
