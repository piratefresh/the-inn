"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pubsub = exports.redisClient = void 0;
var _ioredis = _interopRequireDefault(require("ioredis"));
var _graphqlRedisSubscriptions = require("graphql-redis-subscriptions");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const redisClient = new _ioredis.default({
    host: "theinn.redis.cache.windows.net"
});
const pubsub = new _graphqlRedisSubscriptions.RedisPubSub({
    connection: {
        host: "theinn.redis.cache.windows.net"
    }
});
redisClient.on("error", (error)=>{
    console.error(error);
});
exports.redisClient = redisClient;
exports.pubsub = pubsub;

//# sourceMappingURL=pubSub.js.map