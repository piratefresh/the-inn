import { PusherChannel } from "graphql-pusher-subscriptions";
// import Pusher from "pusher-js";
// import * as Pusher from "pusher";

// export const pusher = new Pusher.default({
//   appId: "1338472",
//   key: "4aa7a9d626b176d0e11f",
//   secret: "8c81d2e93d50343e51cd",
//   cluster: "us2",
//   useTLS: true,
// });

export const pubsub = new PusherChannel({
  appId: "1338472",
  key: "4aa7a9d626b176d0e11f",
  secret: "8c81d2e93d50343e51cd",
  cluster: "us2",
  useTLS: true,
  channel: "the-inn",
});
