import { useSession } from "next-auth/react";
import Pusher from "pusher";
import { PusherProvider, PusherProviderProps } from "@harelpls/use-pusher";
import { useMemo } from "react";

export const pusher = new Pusher({
  appId: "1338472",
  key: "4aa7a9d626b176d0e11f",
  secret: "8c81d2e93d50343e51cd",
  cluster: "us2",
});

interface PusherContainer {
  children: React.ReactNode;
}

export const PusherContainer = ({ children }: PusherContainer) => {
  const { data: session } = useSession();

  if (!session || !session.id) return children;

  const pusherConfig: PusherProviderProps = {
    // required config props
    clientKey: "4aa7a9d626b176d0e11f",
    cluster: "us2",

    userAuthentication: {
      endpoint: "/pusher/auth-user",
      headers: { Authorization: `${session ? session.id : "guest1"}` },
      transport: "ajax",
    },

    // required for private/presence channels
    // also sends auth headers to trigger endpoint
    authEndpoint: "http://localhost:4000/pusher/auth",
    auth: {
      headers: {
        Authorization: `${session ? session.id : "guest1"}`,
      },
    },
  };

  return <PusherProvider {...pusherConfig}>{children}</PusherProvider>;
};
