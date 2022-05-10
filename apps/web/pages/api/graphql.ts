// https://github.com/cpetzold/wormsleague-old/blob/e87a69c1dac2827720da3b93d46c0ca623463ef1/website/pages/api/graphql.ts
import "reflect-metadata";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, buildSchemaSync } from "type-graphql";
import { prisma } from "api/src";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { UserResolver } from "@graphql/resolvers/user";
import cors from "micro-cors";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { createServer, createPubSub } from "@graphql-yoga/node";
import { MyContext } from "@graphql/types/MyContext";

const pubsub = createPubSub();

const server = createServer<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  MyContext
>({
  schema: buildSchemaSync({
    resolvers: [UserResolver],
  }),
  context: async ({ req, res }) => {
    const session = await getSession({ req });

    return {
      prisma,
      req,
      res,
      pubsub,
      // redis,
      user: session?.user,
      session,
    };
  },
  endpoint: "/api/graphql",
});

export default server.requestListener;

// import Cors from "cors";

// export function initMiddleware(middleware) {
//   return (req, res) =>
//     new Promise((resolve, reject) => {
//       middleware(req, res, (result) => {
//         if (result instanceof Error) {
//           return reject(result);
//         }
//         return resolve(result);
//       });
//     });
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const schema = await buildSchema({
//     resolvers: [UserResolver],
//     emitSchemaFile: true,
//   });
//   const server = createServer({
//     // cors: false,
//     // schema,
//     endpoint: "/api/graphql",
//     context: async ({ req, res }) => {
//       const session = await getSession({ req });

//       return {
//         prisma,
//         req,
//         res,
//         // redis,
//         user: session?.user,
//         session,
//       };
//     },
//   });

//   return server.requestListener(req, res);
// }

// const getApolloServerHandler = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   const schema = await buildSchema({
//     resolvers: [UserResolver],
//     validate: false,
//   });

// const apolloServer = new ApolloServer({
//   schema,
//   context: async ({ req, res }) => {
//     const session = await getSession({ req });

//     return {
//       prisma,
//       req,
//       res,
//       // redis,
//       user: session?.user,
//       session,
//     };
//   },
//   plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
// });

// await apolloServer.start();

// return apolloServer.createHandler({ path: "/api/graphql" });

//   const server = createServer<{
//     req: NextApiRequest;
//     res: NextApiResponse;
//   }>({
//     schema,
//     endpoint: "/api/graphql",
//     context: async ({ req, res }) => {
//       const session = await getSession({ req });

//       return {
//         prisma,
//         req,
//         res,
//         // redis,
//         user: session?.user,
//         session,
//       };
//     },
//   });

//   return server.requestListener;
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// getApolloServerHandler(req, res);
