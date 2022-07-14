import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import { buildSchema } from "type-graphql";
import { prisma } from "database";
import { UserResolver } from "@resolvers/user";
import { CampaignResolver } from "@resolvers/campaign";
import { ReviewResolver } from "@resolvers/review";
import express from "express";
import Redis from "ioredis";
import cors from "cors";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { seedDB } from "../prisma/seed";

const startServer = async () => {
  const PORT = 4000;
  const app: express.Application = (module.exports = express());
  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: "redis-13673.c56.east-us.azure.cloud.redislabs.com",
    port: 13673,
    password: "QUVqyaYtox5FMjk5bbXLUrqwUm4es2ux",
  });

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://the-inn-graphql.vercel.app/",
        "https://the-inn-server.herokuapp.com/",
        "https://the-inn.herokuapp.com/",
      ],
      credentials: true,
    })
  );

  const sessionMiddleware = session({
    name: COOKIE_NAME,
    store: new RedisStore({ client: redis, disableTouch: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: "lax", // csrf
      secure: __prod__, // cookie only works in https
    },
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  });

  app.use(sessionMiddleware);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CampaignResolver, ReviewResolver],
      validate: false,
      //   pubSub: pubsub,
    }),
    context: async ({ req, res }) => {
      return {
        prisma,
        req,
        res,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    // console.log(
    //   `🚀 Subscriptions ready ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    // );
  });
};
// seedDB();
startServer().catch((err) => {
  console.error(err);
});
