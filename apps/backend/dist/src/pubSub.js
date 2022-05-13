"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const redisClient = new ioredis_1.default({ host: "theinn.redis.cache.windows.net" });
exports.redisClient = redisClient;
const pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
    connection: { host: "theinn.redis.cache.windows.net" },
});
exports.pubsub = pubsub;
redisClient.on("error", (error) => {
    console.error(error);
});
//# sourceMappingURL=pubSub.js.map