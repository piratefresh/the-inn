import { usePresence } from "@ably-labs/react-hooks";
import { MessageBubble } from "@components/MessageBubble";
import {
  GetThreadMessagesQuery,
  NewPrivateMessageDocument,
  useAddPrivateMessageMutation,
  useGetThreadMessagesQuery,
  useGetUserPrivateMessagesQuery,
  useGetUserQuery,
} from "@generated/graphql";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, Text, mediaString } from "ui";
import { useSubscription } from "urql";
import { MessageList } from "@components/MessageList";
import { Loader } from "@components/Loader";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import { useMediaQuery } from "@hooks/useMediaQueries";

interface AddPlayerMutationArgs {
  senderId: string;
  recipientId: string;
  message: string;
}

const Thread = () => {
  const [id, setId] = useQueryParam("id", withDefault(StringParam, ""));
  const { data: session } = useSession();
  const isDesktop = useMediaQuery(mediaString.lg);

  const [{ data: userMessagesList, fetching: MessageListFetching }] =
    useGetUserPrivateMessagesQuery();

  const [{ fetching }, addPrivateMessageMutation] =
    useAddPrivateMessageMutation();

  const threadId = React.useMemo(() => {
    if (id) return id as string;
    const message = userMessagesList?.getUserPrivateMessages[0];

    if (message) {
      const otherUser =
        message?.sender.id === session?.id ? message.recipient : message.sender;
      return otherUser.id;
    } else {
      return null;
    }
  }, [id, session, userMessagesList?.getUserPrivateMessages]);

  const otherUser = React.useMemo(() => {
    const message = userMessagesList?.getUserPrivateMessages[0];

    if (!message) return null;

    return message?.sender.id === session?.id
      ? message.recipient
      : message.sender;
  }, [userMessagesList, session]);

  const [{ data: otherUserData, fetching: otherUserFetching }] =
    useGetUserQuery({
      pause: !otherUser?.id,
      variables: {
        id: otherUser?.id,
      },
    });

  React.useEffect(() => {
    async function fetchData() {
      setId(threadId);
    }
    if (!isDesktop) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId, isDesktop]);

  const [queryResult] = useGetThreadMessagesQuery({
    pause: !threadId,
    variables: {
      threadId,
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

  if (!session) return <div>Please Login</div>;

  if (fetching || MessageListFetching) return <Loader />;

  if (!isDesktop)
    return (
      <div className="p-4">
        {userMessagesList?.getUserPrivateMessages && !id && (
          <MessageList
            userId={session.id}
            messages={userMessagesList.getUserPrivateMessages}
          />
        )}

        {id && data && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-4">
              <div className="flex gap-8 items-center whitespace-nowrap">
                <Button onClick={() => setId("")}>
                  <ArrowLeftIcon className="h-5 w-5 " />
                </Button>

                <Link
                  href={`$/user/${id}`}
                  className="flex flex-row gap-2 items-center"
                  passHref
                  legacyBehavior
                >
                  <>
                    {otherUserOnline && (
                      <div className="rounded-full w-2 h-2 bg-green-500" />
                    )}{" "}
                    {otherUserData?.getUser && (
                      <Text color="loContrast">{`${otherUserData.getUser.firstName} ${otherUserData.getUser.lastName}`}</Text>
                    )}
                  </>
                </Link>
              </div>
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
        )}
      </div>
    );

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 p-4">
        {userMessagesList?.getUserPrivateMessages && (
          <MessageList
            userId={session.id}
            messages={userMessagesList.getUserPrivateMessages}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col p-4">
            <div className="flex gap-8 items-center whitespace-nowrap">
              {id && (
                <Button onClick={() => setId("")}>
                  <ArrowLeftIcon className="h-5 w-5 " />
                </Button>
              )}

              <Link
                href={`$/user/${id}`}
                className="flex flex-row gap-2 items-center"
                passHref
                legacyBehavior
              >
                <>
                  {otherUserOnline && (
                    <div className="rounded-full w-2 h-2 bg-green-500" />
                  )}{" "}
                  {otherUserData?.getUser && (
                    <Text color="loContrast">{`${otherUserData.getUser.firstName} ${otherUserData.getUser.lastName}`}</Text>
                  )}
                </>
              </Link>
            </div>
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
