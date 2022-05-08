// https://github.com/cpetzold/wormsleague-old/blob/e87a69c1dac2827720da3b93d46c0ca623463ef1/website/pages/api/graphql.ts
import "reflect-metadata";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { prisma } from "api/src";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { UserResolver } from "@graphql/resolvers/user";
import cors from "micro-cors";
import connectRedis from "connect-redis";
import Redis from "ioredis";

// import Cors from "cors";

export function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const getApolloServerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: process.env.NODE_ENV === "development",
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const session = await getSession({ req });

      return {
        prisma,
        req,
        res,
        // redis,
        user: session?.user,
        session,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  return apolloServer.createHandler({ path: "/api/graphql" });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler(req, res);

  if (typeof apolloServerHandler !== "function") {
    throw new Error("Unable to initialize Apollo server");
  }

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

export default cors()(handler);