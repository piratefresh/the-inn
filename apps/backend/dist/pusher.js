"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = exports.pusher = void 0;
const graphql_pusher_subscriptions_1 = require("graphql-pusher-subscriptions");
const pusher_1 = __importDefault(require("pusher"));
exports.pusher = new pusher_1.default({
    appId: "1338472",
    key: "4aa7a9d626b176d0e11f",
    secret: "8c81d2e93d50343e51cd",
    cluster: "us2",
    useTLS: true,
});
exports.pubsub = new graphql_pusher_subscriptions_1.PusherChannel({
    appId: "1338472",
    key: "4aa7a9d626b176d0e11f",
    secret: "8c81d2e93d50343e51cd",
    cluster: "us2",
    useTLS: true,
    channel: "the-inn",
});
//# sourceMappingURL=pusher.js.map