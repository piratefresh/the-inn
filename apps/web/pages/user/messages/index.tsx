import { Loader } from "@components/Loader";
import { MessageList } from "@components/MessageList";
import { useGetUserPrivateMessagesQuery } from "@generated/graphql";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { useSession } from "next-auth/react";
import React from "react";
import { Text, mediaString } from "ui";
import Thread from "./thread/[id]";

const Messages = () => {
  const { data: session } = useSession();

  const isDesktop = useMediaQuery(mediaString.lg);

  const [{ data, fetching }] = useGetUserPrivateMessagesQuery();

  if (!session) return <div>Please Login</div>;

  if (fetching) return <Loader />;

  if (isDesktop)
    return (
      <div className="p-4">
        <Text size="2xl">Messages</Text>
        <div className="grid p-4" style={{ gridTemplateColumns: "4fr 1fr" }}>
          <MessageList
            userId={session.id}
            messages={data.getUserPrivateMessages}
          />
        </div>
      </div>
    );
  return (
    <div className="p-4">
      <Text size="2xl">Messages</Text>
      <MessageList userId={session.id} messages={data.getUserPrivateMessages} />
    </div>
  );
};

Messages.layoutProps = {
  meta: {
    title: "Messages",
  },
  Layout: UserPageLayout,
};

export default Messages;
