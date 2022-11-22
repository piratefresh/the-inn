import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import { PusherChannel } from "graphql-pusher-subscriptions";
import Pusher from "pusher";

interface MyContext {
  prisma: PrismaClient;
  redis: Redis;
  req: Request & { session: { userId?: string; user?: any } };
  res: Response;
  wsHeaders?: any;
  pubsub?: PusherChannel;
  pusher?: Pusher;
}
export { MyContext };
