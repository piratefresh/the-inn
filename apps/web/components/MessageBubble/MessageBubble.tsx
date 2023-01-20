import { GetThreadMessagesQuery } from "@generated/graphql";
import { formatDistanceToNow } from "date-fns";
import { Avatar, Text } from "ui";

type MessageProps = GetThreadMessagesQuery["getThreadMessages"][0];

export const MessageBubble = ({
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
          <Text size="sm" className="whitespace-pre-wrap">
            {senderMessage}
          </Text>
        </div>
      </div>
    </div>
  );
};
