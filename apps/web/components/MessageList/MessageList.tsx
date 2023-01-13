import { Avatar, Text } from "ui";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { GetUserPrivateMessagesQuery } from "@generated/graphql";
import React from "react";
import { usePresence } from "@ably-labs/react-hooks";

interface MessageListProps {
  userId: string;
  messages: GetUserPrivateMessagesQuery["getUserPrivateMessages"];
}

export const MessageList = ({ userId, messages }: MessageListProps) => {
  const [presenceData, updateStatus] = usePresence(`online`);

  const otherUserOnline = React.useMemo(
    () =>
      presenceData.find((member) =>
        messages.some((message) =>
          message.sender.id === userId
            ? message.recipientId === member.clientId
            : message.senderId === member.clientId
        )
      ),
    [presenceData, messages, userId]
  );
  return (
    <>
      {messages.map((message) => {
        console.log("message: ", message);
        const otherUser =
          message.sender.id === userId ? message.recipient : message.sender;
        // if (message.senderId !== userId) return null;
        return (
          <Link
            href={{
              pathname: `/messaging/thread/${otherUser.id}`,
              query: otherUser,
            }}
            key={message.id}
          >
            <a className="text-white p-4 cursor-pointer">
              <div className="flex flex-row justify-around">
                <div className="flex flex-row gap-4 items-center w-full">
                  {otherUserOnline && (
                    <div className="rounded-full w-2 h-2 bg-green-500" />
                  )}
                  <Avatar
                    imageUrl={otherUser.imageUrl}
                    name={`${otherUser.firstName} ${otherUser.lastName}`}
                  />
                  {otherUser.firstName} {otherUser.lastName}
                </div>
                <div className="whitespace-nowrap text-xs">
                  {formatDistanceToNow(new Date(message.createdAt))}
                </div>
              </div>
              <Text as="p" className="mt-4">
                {message.sender.id === userId ? <span>You:</span> : null}{" "}
                {message.message}
              </Text>
            </a>
          </Link>
        );
      })}
    </>
  );
};
