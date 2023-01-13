import { Loader } from "@components/Loader";
import { MessageList } from "@components/MessageList";
import { useGetUserPrivateMessagesQuery } from "@generated/graphql";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { useSession } from "next-auth/react";
import React from "react";
import { Text, mediaString } from "ui";

const Messaging = () => {
  const { data: session } = useSession();

  const isDesktop = useMediaQuery(mediaString.lg);

  const [{ data, fetching }] = useGetUserPrivateMessagesQuery();

  if (!session) return <div>Please Login</div>;

  if (fetching) return <Loader />;

  if (isDesktop) return <div>Desktop</div>;
  return (
    <div className="p-4">
      <Text size="2xl">Messaging</Text>
      <MessageList userId={session.id} messages={data.getUserPrivateMessages} />
    </div>
  );
};

Messaging.layoutProps = {
  meta: {
    title: "Messaging",
  },
  Layout: UserPageLayout,
};

export default Messaging;
