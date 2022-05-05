import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PusherChannel } from "graphql-pusher-subscriptions";

interface MyContext {
  prisma: PrismaClient;
  pubsub: PusherChannel;
  req: Request;
  res: Response;
  wsHeaders: any;
  userId?: string;
}

export { MyContext };
