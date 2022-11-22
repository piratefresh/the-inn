import { useSession } from "next-auth/react";
import Pusher from "pusher";

export const pusher = new Pusher({
  appId: "1338472",
  key: "4aa7a9d626b176d0e11f",
  secret: "8c81d2e93d50343e51cd",
  cluster: "us2",
});

// Replace this with code to retrieve the actual user id and info
const user: Pusher.UserChannelData = {
  // @ts-ignore
  id: (Math.random() * 124234).toString(),
  user_info: {
    name: "guest",
  },
  watchlist: ["another_id_1", "another_id_2"],
};

export const usePusherConfig = (session) => {
  return {
    // required config props
    clientKey: "4aa7a9d626b176d0e11f",
    cluster: "us2",

    // required for private/presence channels
    // also sends auth headers to trigger endpoint
    authEndpoint: "http://localhost:4000/pusher/auth",
    auth: {
      headers: {
        Authorization: `${session ? session.user.id : "guest1"}`,
      },
    },
  };
};
