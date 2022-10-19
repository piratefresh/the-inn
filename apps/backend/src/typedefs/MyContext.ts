import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import { PusherChannel } from "graphql-pusher-subscriptions";
interface MyContext {
  prisma: PrismaClient;
  redis: Redis;
  req: Request & { session: { userId: string } };
  res: Response;
  wsHeaders?: any;
  pubsub?: PusherChannel;
}
export { MyContext };
