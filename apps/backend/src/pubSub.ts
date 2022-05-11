import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";

const redisClient = new Redis({ host: "theinn.redis.cache.windows.net" });
const pubsub = new RedisPubSub({
  connection: { host: "theinn.redis.cache.windows.net" },
});

redisClient.on("error", (error) => {
  console.error(error);
});

export { redisClient, pubsub };
