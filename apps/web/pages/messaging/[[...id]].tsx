import { MessageInput } from "@components/MessageInput";
import { MessageList } from "@components/MessageList";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { useSession } from "next-auth/react";
import { styled, Text, mediaString } from "ui";

const Messaging = () => {
  const { data: session } = useSession();

  const isDesktop = useMediaQuery(mediaString.lg);

  if (!session) return <div>Please Login</div>;

  if (isDesktop) return <div>Desktop</div>;
  return (
    <div className="p-4">
      <Text size="2xl">Messaging</Text>
      <MessageList userId={session.id} />
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
