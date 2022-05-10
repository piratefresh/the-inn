import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PusherChannel } from "graphql-pusher-subscriptions";

interface MyContext {
  prisma: PrismaClient;
  req: any;
  res: any;
  wsHeaders?: any;
  userId?: string;
}

export type { MyContext };
