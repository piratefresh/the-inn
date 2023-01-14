import { usePresence } from "@ably-labs/react-hooks";
import {
  GetThreadMessagesQuery,
  NewPrivateMessageDocument,
  useAddPrivateMessageMutation,
  useGetThreadMessagesQuery,
} from "@generated/graphql";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Avatar, Button, Input, Text } from "ui";
import { useSubscription } from "urql";

interface AddPlayerMutationArgs {
  senderId: string;
  recipientId: string;
  message: string;
}

type MessageProps = GetThreadMessagesQuery["getThreadMessages"][0];

const MessageBubble = ({
  message,
  right,
}: {
  message: MessageProps;
  right: boolean;
}) => {
  const { sender, message: senderMessage } = message;

  return (
    <div className={`flex flex-row gap-4 ${right ? "self-end" : ""}`}>
      <Avatar imageUrl={sender.imageUrl} name={sender.firstName} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <Text size="xs">{`${sender.firstName} ${sender.lastName}`}</Text>
          <Text size="xs">
            {formatDistanceToNow(new Date(message.createdAt))}
          </Text>
        </div>

        <div
          className={`p-4 rounded-r-lg rounded-bl-lg w-[247px] ${
            right ? "bg-[#324345]" : "bg-brandLightBlack"
          }`}
        >
          <Text size="sm">{senderMessage}</Text>
        </div>
      </div>
    </div>
  );
};

const Thread = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { firstName, id, imageUrl, lastName } = router.query;

  const [{ fetching }, addPrivateMessageMutation] =
    useAddPrivateMessageMutation();

  const [queryResult] = useGetThreadMessagesQuery({
    variables: {
      threadId: id as string,
    },
  });

  const [subscriptionResult] = useSubscription(
    {
      query: NewPrivateMessageDocument,
      pause: queryResult.fetching,
    },
    (prev = queryResult.data as any, item) => {
      if (item && prev.length) return [...prev, item.newPrivateMessage];
      if (item && prev.getThreadMessages.length)
        return [...prev.getThreadMessages, item.newPrivateMessage];
    }
  );

  const data = subscriptionResult.data || queryResult.data?.getThreadMessages;

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddPlayerMutationArgs>();
  const onSubmit: SubmitHandler<AddPlayerMutationArgs> = (data) => {
    console.log("data: ", data);
    addPrivateMessageMutation({
      addPrivateMessageInput: {
        message: data.message,
        recipientId: id as string,
        senderId: session.id,
      },
    });
  };

  const [presenceData, updateStatus] = usePresence(`online`);

  const otherUserOnline = React.useMemo(
    () => presenceData.find((member) => member.clientId === id),
    [presenceData, id]
  );

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-4">
          <div className="flex gap-8 items-center whitespace-nowrap">
            <Button onClick={() => router.back()}>
              <ArrowLeftIcon className="h-5 w-5 " />
            </Button>

            <Link
              href={`$/user/${id}`}
              className="flex flex-row gap-2 items-center"
              passHref
            >
              <>
                {otherUserOnline && (
                  <div className="rounded-full w-2 h-2 bg-green-500" />
                )}{" "}
                <Text>{`${firstName} ${lastName}`}</Text>
              </>
            </Link>
          </div>

          {/* <div className="flex flex-col">
            <h2 className="text-white">THREAD ID: {id}</h2>
          </div> */}
        </div>

        <div className="flex flex-col gap-4">
          {data?.map((message) => {
            return (
              <MessageBubble
                message={message}
                right={message.sender.id === session.id}
                key={message.id}
              />
            );
          })}
          <Controller
            name="message"
            control={control}
            render={({ field }) => <Input gold {...field} />}
          />

          <Button>Send</Button>
        </div>
      </form>
    </div>
  );
};

Thread.layoutProps = {
  meta: {
    title: "Thread",
  },
  Layout: UserPageLayout,
};

export default Thread;
