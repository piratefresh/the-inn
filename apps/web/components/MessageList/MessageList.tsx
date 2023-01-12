import { v4 as uuidv4 } from "uuid";
import { Avatar, styled } from "ui";
import { formatDistanceToNow } from "date-fns";

const DUMMY_DATA = [
  {
    message:
      "Sure thing, ill take  a look at it today, but they are looking great from what I previously saw",
    id: uuidv4(),
    sender: {
      id: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
      firstName: "Frank",
      lastName: "Reynolds",
      email: "magnussithnilsen+ps1@gmail.com",
      imageUrl: "https://source.unsplash.com/random",
    },
    recipient: {
      id: "dd339afe-4ea3-46df-a818-d5362b3a2f1f",
      firstName: "Magnus",
      lastName: "Nilsen",
      email: "magnussithnilsen@gmail.com",
      imageUrl: "https://source.unsplash.com/random",
    },
    senderId: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
    recipientId: "dd339afe-4ea3-46df-a818-d5362b3a2f1f",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    message:
      "I’ve just published a new homebrew content for star wars ffg. Its based on the old KOTOR games. Would love your thoughts and critics on it",
    id: uuidv4(),
    sender: {
      id: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
      firstName: "Daniel",
      lastName: "Gutso",
      email: "magnus.nilsen@setvi.com",
      imageUrl: "https://source.unsplash.com/random",
    },
    recipient: {
      id: "dd339afe-4ea3-46df-a818-d5362b3a2f1f",
      firstName: "Magnus",
      lastName: "Nilsen",
      email: "magnussithnilsen@gmail.com",
      imageUrl: "https://source.unsplash.com/random",
    },
    senderId: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
    recipientId: "dd339afe-4ea3-46df-a818-d5362b3a2f1f",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    message:
      "You: Posted an new campaign yesterday. Would love to see you in participate in it.",
    id: uuidv4(),
    sender: {
      id: "dd339afe-4ea3-46df-a818-d5362b3a2f1f",
      firstName: "Magnus",
      lastName: "Nilsen",
      email: "magnussithnilsen@gmail.com",
      imageUrl: "https://source.unsplash.com/random",
    },
    recipient: {
      id: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
      firstName: "Mario",
      lastName: "Spark",
      email: "magnus.nilsen@setvi.com",
      imageUrl: "https://source.unsplash.com/random",
    },
    senderId: "dd339afe-4ea3-46df-a818-d5362b3a2f1f",
    recipientId: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    message: "I don't know",
    id: uuidv4(),
    sender: {
      id: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
      firstName: "Ron",
      lastName: "Test",
      email: "magnus.nilsen@setvi.com",
      imageUrl: "https://source.unsplash.com/random",
    },
    recipient: {
      id: "dd339afe-4ea3-46df-a818-d5362b3a2f1f",
      firstName: "Magnus",
      lastName: "Nilsen",
      email: "magnussithnilsen@gmail.com",
      imageUrl: "https://source.unsplash.com/random",
    },
    senderId: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
    recipientId: "dd339afe-4ea3-46df-a818-d5362b3a2f1f",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface MessageListProps {
  userId: string;
}

export const MessageList = ({ userId }: MessageListProps) => {
  return (
    <>
      {DUMMY_DATA.map((message) => {
        const notUserObj = Object.values(message).find(
          (user) => user.id !== userId && typeof user === "object"
        );

        console.log("notUser: ", typeof notUserObj);

        if (!notUserObj || typeof notUserObj !== "object") return null;
        return (
          <div className="text-white p-4">
            <div className="flex flex-row justify-around">
              <div className="flex flex-row gap-4 items-center w-full">
                <Avatar
                  imageUrl={notUserObj.imageUrl}
                  name={`${notUserObj.firstName} ${notUserObj.lastName}`}
                />
                {notUserObj.firstName} {notUserObj.lastName}
              </div>
              <div className="whitespace-nowrap text-xs">
                {formatDistanceToNow(message.createdAt)}
              </div>
            </div>
            <div className="mt-4">{message.message}</div>
          </div>
        );
      })}
    </>
  );
};
