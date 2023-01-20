import { usePresence } from "@ably-labs/react-hooks";
import { MessageBubble } from "@components/MessageBubble";
import {
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
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Text, mediaString, TextArea } from "ui";
import { useSubscription } from "urql";
import { MessageList } from "@components/MessageList";
import { Loader } from "@components/Loader";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useIsAuth } from "@utils/useIsAuth";
import { Session } from "next-auth";

interface AddPlayerMutationArgs {
  senderId: string;
  recipientId: string;
  message: string;
}

const Thread = () => {
  useIsAuth();
  const [id, setId] = useQueryParam("id", withDefault(StringParam, ""));
  const { data: session } = useSession();
  const isDesktop = useMediaQuery(mediaString.lg);
  const messagesEndRef = React.useRef(null);

  const [
    { data: userMessagesList, fetching: MessageListFetching },
    reexecuteQuery,
  ] = useGetUserPrivateMessagesQuery();

  const [
    { data: newMessageData, fetching: addMessageLoading },
    addPrivateMessageMutation,
  ] = useAddPrivateMessageMutation();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session]);

  const [{ data: otherUserData, fetching: otherUserFetching }] =
    useGetUserQuery({
      pause: !id,
      variables: {
        id: id,
      },
    });

  React.useEffect(() => {
    async function fetchData() {
      setId(threadId);
    }
    if (isDesktop) fetchData();
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
    (prev = (queryResult.data as any) ?? [], item) => {
      return [...prev.getThreadMessages, item.newPrivateMessage];
      // console.log("prev: ", prev.getTh);
      // if (item && prev.length) return [...prev, item.newPrivateMessage];
      // if (item && prev.getThreadMessages)
      //   return [...prev.getThreadMessages, item.newPrivateMessage];
    }
  );

  const data = subscriptionResult.data || queryResult.data?.getThreadMessages;

  React.useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const { control, reset, register, handleSubmit, watch, formState } =
    useForm<AddPlayerMutationArgs>({
      defaultValues: {
        message: "",
        recipientId: id as string,
        senderId: session?.id,
      },
    });
  const onSubmit: SubmitHandler<AddPlayerMutationArgs> = (
    data,
    e: React.SyntheticEvent
  ) => {
    // Stop for re-rendering on submit
    e.preventDefault();

    addPrivateMessageMutation({
      addPrivateMessageInput: {
        message: data.message,
        recipientId: id as string,
        senderId: session.id,
      },
    });

    reset();
  };

  const [presenceData, updateStatus] = usePresence(`online`);

  const otherUserOnline = React.useMemo(
    () => presenceData.find((member) => member.clientId === id),
    [presenceData, id]
  );

  if (!session) return <div>Please Login</div>;

  if (MessageListFetching) return <Loader />;

  if (!data?.length)
    return (
      <div className="p-4">
        <Text>No messages recieved</Text>
      </div>
    );
  if (!isDesktop)
    return (
      <div className="p-4">
        {userMessagesList?.getUserPrivateMessages && !id && (
          <MessageList
            threadId={id}
            userId={session.id}
            messages={userMessagesList.getUserPrivateMessages}
          />
        )}

        {id && data && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-4">
              <div className="flex gap-8 items-center whitespace-nowrap">
                <Button type="button" onClick={() => setId("")}>
                  <ArrowLeftIcon className="h-7 w-7" />
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

            <Messages
              messages={data}
              messagesEndRef={messagesEndRef}
              isDesktop={isDesktop}
              session={session}
            />

            <div className="flex flex-row items-center">
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextArea
                    minRows={2}
                    maxRows={4}
                    placeholder="Message"
                    gold
                    value={field.value}
                    onChange={field.onChange}
                    {...field}
                  />
                )}
              />
              <div className="flex shrink-0 justify-end items-end ml-2 mt-2">
                <Button disabled={addMessageLoading}>
                  <PaperAirplaneIcon className="h-7 w-7" />
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    );

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-8 p-4">
        {userMessagesList?.getUserPrivateMessages && (
          <MessageList
            threadId={id}
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

          <Messages
            messages={data}
            messagesEndRef={messagesEndRef}
            isDesktop={isDesktop}
            session={session}
          />

          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextArea
                minRows={2}
                maxRows={4}
                gold
                value={field.value}
                onChange={field.onChange}
                {...field}
              />
            )}
          />
          <div className="flex flex-1 justify-end mt-2">
            <Button
              css={{
                maxWidth: "100px",
              }}
              size="large"
              disabled={addMessageLoading}
              fullWidth
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 
  Fix typescript
*/
interface MessagesProps {
  messages: any;
  messagesEndRef: any;
  isDesktop: boolean;
  session: Session;
}

const Messages = ({
  messages,
  messagesEndRef,
  isDesktop,
  session,
}: MessagesProps) => {
  if (messages) return <Text>No messages received yet</Text>;
  return (
    <div
      className="flex flex-col gap-4 overflow-y-auto mb-8"
      style={{ height: isDesktop ? "55vh" : "65vh" }}
    >
      {messages?.map((message) => {
        return (
          <MessageBubble
            message={message}
            right={message.sender.id === session.id}
            key={message.id}
          />
        );
      })}
      <div ref={messagesEndRef} />
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
