import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import Pusher from "pusher";
import AblyPubSub from "ablyPubsub";

interface MyContext {
  prisma: PrismaClient;
  redis: Redis;
  req: Request & { session: { userId?: string; user?: any } };
  res: Response;
  wsHeaders?: any;
  pubsub?: AblyPubSub;
  pusher?: Pusher;
}
export { MyContext };
