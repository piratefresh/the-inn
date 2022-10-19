import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { json } from "body-parser";
import cors from "cors";
import { UserResolver } from "@resolvers/user";
import { CampaignResolver } from "@resolvers/campaign";
import { ReviewResolver } from "@resolvers/review";
import http from "http";
import { buildSchema, buildTypeDefsAndResolvers } from "type-graphql";
import { MyContext } from "@typedefs/MyContext";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";

async function startApolloServer() {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver, CampaignResolver, ReviewResolver],
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const RedisStore = connectRedis(session);
  const redis = new Redis(
    "redis://:5f5e5f43080a498db82af877c1acbcc7@us1-main-osprey-38760.upstash.io:38760"
  );

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();

  const httpServer = createServer(app);

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        prisma,
        req,
        res,
        redis,
      }),
    })
  );
}
