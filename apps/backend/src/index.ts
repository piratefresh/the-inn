import "reflect-metadata";
import dotenv from "dotenv";
import { COOKIE_NAME, __prod__ } from "./constants";
import { buildSchema, buildTypeDefsAndResolvers } from "type-graphql";
// import { prisma } from "database";
import http from "http";
import { PrismaClient } from "@prisma/client";
import { UserResolver } from "@resolvers/user";
import { CampaignResolver } from "@resolvers/campaign";
import { ReviewResolver } from "@resolvers/review";
import express from "express";
import Redis from "ioredis";
import cors from "cors";
import session from "express-session";
import connectRedis from "connect-redis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { ApolloServer, Config, ExpressContext } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { seedDB } from "../prisma/seed";

dotenv.config();

const prisma = new PrismaClient();

const startServer = async () => {
  const PORT = 4000;
  const app = express();

  const pubSub = new RedisPubSub({
    publisher: new Redis(
      "redis://:5f5e5f43080a498db82af877c1acbcc7@us1-main-osprey-38760.upstash.io:38760"
    ),
    subscriber: new Redis(
      "redis://:5f5e5f43080a498db82af877c1acbcc7@us1-main-osprey-38760.upstash.io:38760"
    ),
  });

  const RedisStore = connectRedis(session);
  const redis = new Redis(
    "redis://:5f5e5f43080a498db82af877c1acbcc7@us1-main-osprey-38760.upstash.io:38760"
  );

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver, CampaignResolver, ReviewResolver],
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  app.set("trust proxy", 1); // trust first proxy

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
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
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: "lax", // csrf
      secure: __prod__, // cookie only works in https
      domain: __prod__ ? ".codeponder.com" : undefined,
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  });

  app.use(sessionMiddleware);

  console.log("process.env.SESSION_SECRET: ", process.env.SESSION_SECRET);

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true, // see below for more about this
    context: async ({ req, res }) => {
      return {
        prisma,
        req,
        res,
        redis,
        // session: req !== undefined ? req.session : req,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
  } as Config<ExpressContext>);

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    // console.log(
    //   `🚀 Subscriptions ready ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    // );
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
