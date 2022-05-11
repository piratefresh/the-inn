"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pubsub = void 0;
var _graphqlPusherSubscriptions = require("graphql-pusher-subscriptions");
const pubsub = new _graphqlPusherSubscriptions.PusherChannel({
    appId: "1338472",
    key: "4aa7a9d626b176d0e11f",
    secret: "8c81d2e93d50343e51cd",
    cluster: "us2",
    useTLS: true,
    channel: "the-inn"
});
exports.pubsub = pubsub;

//# sourceMappingURL=pusher.js.map