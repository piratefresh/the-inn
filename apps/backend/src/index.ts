import "reflect-metadata";
import dotenv from "dotenv";
import { __prod__ } from "./constants";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";
import { UserResolver } from "@resolvers/user";
import { CampaignResolver } from "@resolvers/campaign";
import { ReviewResolver } from "@resolvers/review";
import { PrivateMessageResolver } from "@resolvers/privateMessage";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import WebSocket, { WebSocketServer as WSWebSocketServer } from "ws";
import { useServer as useWsServer } from "graphql-ws/lib/use/ws";
import { MyContext } from "@typedefs/MyContext";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser, { urlencoded } from "body-parser";
import AblyPubSub from "ablyPubsub";
import { NotificationResolver } from "@resolvers/notification";
import { redis } from "services/redis";
import { sessionMiddleware } from "middlewares/sessionConfig";
import algoliasearch from "algoliasearch";
import { ApplicationResolver } from "@resolvers/application";
import { seedDB, seedDBApplication } from "../prisma/seed";
import jwt from "jsonwebtoken";

dotenv.config();

// PRISMA
const prisma = new PrismaClient();

// Connect and authenticate with your Algolia app
const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const theInnIndex = algoliaClient.initIndex("dev_campaigns");

const pubsub = new AblyPubSub({ key: process.env.ABLY_API_KEY });

const checkServerSession = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    console.log("req: ", request.headers.authorization);
    console.log("req: ", request.query);
    console.log("req: ", request.session);
    const verified = jwt.verify(
      request.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_KEY_
    );

    console.log("verified: ", verified);
    return next();
  } catch (err) {
    return next();
  }
};

const startServer = async () => {
  try {
    const PORT: number = parseInt(process.env.PORT) ?? 4000;
    const HOST: string = process.env.HOST ?? "0.0.0.0";
    const app = express();

    console.log(`🚀 Server is now running on http://${HOST}:${PORT}/graphql`);

    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
      resolvers: [
        UserResolver,
        CampaignResolver,
        ReviewResolver,
        PrivateMessageResolver,
        NotificationResolver,
        ApplicationResolver,
      ],
      pubSub: pubsub,
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    app.set("trust proxy", 1);

    // app.use(rateLimiter);

    // app.use(cookieParser());

    app.use(sessionMiddleware);

    app.use(checkServerSession);

    const httpServer = createServer(app);

    const WebSocketServer = WebSocket.Server || WSWebSocketServer;

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
        context: ({ extra }) => ({ req: extra.request, prisma, theInnIndex }),
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

    app.get("/", (_, res) => {
      res.send("Hello World!");
    });

    app.use(
      "/graphql",
      cors<cors.CorsRequest>({
        origin: [
          "http://localhost:3001",
          "http://localhost:4000",
          "http://localhost:4000/graphql",
          "https://the-inn.vercel.app",
          "https://the-inn-production.up.railway.app",
          "https://the-inn-production.up.railway.app/graphql",
          "https://theinn.app",
          "https://server.theinn.app",
          "https://server.theinn.app/graphql",
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
            theInnIndex,
          };
        },
      })
    );

    // Now that our HTTP server is fully set up, we can listen to it.
    httpServer.listen(PORT, HOST, () => {
      console.log(`🚀 Server is now running on http://${HOST}:${PORT}/graphql`);
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
  } catch (err) {
    console.log("err: ", err);
  }
};
// seedDB();
// seedDBApplication();
startServer().catch((err) => {
  console.error(err);
});
