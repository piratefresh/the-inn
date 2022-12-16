import "reflect-metadata";
import dotenv from "dotenv";
import { COOKIE_NAME, redisPrefices, __prod__ } from "./constants";
import { buildTypeDefsAndResolvers } from "type-graphql";
// import { prisma } from "database";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";
import { UserResolver } from "@resolvers/user";
import { CampaignResolver } from "@resolvers/campaign";
import { ReviewResolver } from "@resolvers/review";
import { CounterResolver } from "@resolvers/counter";
import { PrivateMessageResolver } from "@resolvers/privateMessage";
import express, { Request, Response } from "express";
import Redis from "ioredis";
import cors from "cors";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { seedDB } from "../prisma/seed";
import { WebSocketServer } from "ws";
import { useServer as useWsServer } from "graphql-ws/lib/use/ws";
import { MyContext } from "@typedefs/MyContext";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser, { urlencoded } from "body-parser";
import AblyPubSub from "ablyPubsub";
import { NotificationResolver } from "@resolvers/notification";
import rateLimit from "express-rate-limit";
import RateLimitRedisStore from "rate-limit-redis";

dotenv.config();

// PRISMA
const prisma = new PrismaClient();

const pubsub = new AblyPubSub({ key: process.env.ABLY_API_KEY });

const startServer = async () => {
  const PORT = 4000;
  const app = express();

  pubsub.publish("getting-started", "hello world");

  const RedisStore = connectRedis(session);
  const redis = new Redis(
    "redis://default:5f5e5f43080a498db82af877c1acbcc7@us1-main-osprey-38760.upstash.io:38760"
  );

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      UserResolver,
      CampaignResolver,
      ReviewResolver,
      CounterResolver,
      PrivateMessageResolver,
      NotificationResolver,
    ],
    pubSub: pubsub,
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [
        "http://localhost:3001",
        "http://localhost:4000",
        "http://localhost:4000/graphql",
        "https://the-inn-graphql.vercel.app/",
        "https://the-inn-server.herokuapp.com/",
        "https://the-inn.herokuapp.com/",
      ],
      credentials: true,
    })
  );

  const sessionMiddleware = session({
    name: COOKIE_NAME,
    store: new RedisStore({
      client: redis,
      ttl: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      prefix: redisPrefices.redisSessionPrefix,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: false,
      sameSite: "lax", // csrf
      secure: __prod__, // cookie only works in https
      domain: __prod__ ? ".codeponder.com" : undefined,
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  });

  app.use(sessionMiddleware);

  app.set("port", 3000);

  const httpServer = createServer(app);
  // Creating the WebSocket server

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: "/graphql",
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useWsServer(
    {
      schema, // Adding a context property lets you add data to your GraphQL operation context
      // authenticate the user and set it on the connection context
      context: ({ extra }) => ({ req: extra.request, prisma }),

      onConnect: ({ extra }) => {
        sessionMiddleware(extra.request as any, {} as any, () => {});
      },
    },
    wsServer
  );

  const server = new ApolloServer<MyContext>({
    schema,
    introspection: true,
    csrfPrevention: true,
    plugins: [
      // Disable dosent support graphql-ws
      // ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "http://localhost:3001",
        "http://localhost:4000",
        "http://localhost:4000/graphql",
        "https://the-inn-graphql.vercel.app/",
        "https://the-inn-server.herokuapp.com/",
        "https://the-inn.herokuapp.com/",
      ],
      credentials: true,
    }),
    bodyParser.json(),
    urlencoded({ extended: false }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return {
          prisma,
          req,
          res,
          redis,
        };
      },
    })
  );

  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`);
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`
    );
  });

  redis.on("error", function (err) {
    console.log("Could not establish a connection with redis. " + err);
  });
  redis.on("connect", function (err) {
    console.log("Connected to redis successfully");
  });
};
// seedDB();
startServer().catch((err) => {
  console.error(err);
});
