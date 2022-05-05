import "dotenv/config";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { PusherChannel } from "graphql-pusher-subscriptions";

import Redis from "ioredis";
import Pusher from "pusher";

const options: Redis.RedisOptions = {
  host: "theinn.redis.cache.windows.net",
  port: 6379,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

export const pubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

export const pusher = new Pusher({
  appId: "1338472",
  key: "4aa7a9d626b176d0e11f",
  secret: "8c81d2e93d50343e51cd",
  cluster: "us2",
  useTLS: true,
});

export const pubsub = new PusherChannel({
  appId: "1338472",
  key: "4aa7a9d626b176d0e11f",
  secret: "8c81d2e93d50343e51cd",
  cluster: "us2",
  encrypted: true,
  channel: "the-inn",
});
