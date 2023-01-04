import { v4 as uuidv4 } from "uuid";
import { styled } from "ui";

const DUMMY_DATA = [
  {
    message: "Hello",
    id: uuidv4(),
    sender: {
      firstName: "Magnus",
      lastName: "Nilsen",
      email: "magnussithnilsen@gmail.com",
    },
    recipient: {
      firstName: "Ron",
      lastName: "Test",
      email: "magnus.nilsen@setvi.com",
    },
    senderId: "5d777955-2a54-4954-96d7-f0cf73cf5d51",
    recipientId: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    message: "Hello To you",
    id: uuidv4(),
    sender: {
      firstName: "Ron",
      lastName: "Test",
      email: "magnus.nilsen@setvi.com",
    },
    recipient: {
      firstName: "Magnus",
      lastName: "Nilsen",
      email: "magnussithnilsen@gmail.com",
    },
    senderId: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
    recipientId: "5d777955-2a54-4954-96d7-f0cf73cf5d51",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    message: "Whats up",
    id: uuidv4(),
    sender: {
      firstName: "Magnus",
      lastName: "Nilsen",
      email: "magnussithnilsen@gmail.com",
    },
    recipient: {
      firstName: "Ron",
      lastName: "Test",
      email: "magnus.nilsen@setvi.com",
    },
    senderId: "5d777955-2a54-4954-96d7-f0cf73cf5d51",
    recipientId: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    message: "I don't know",
    id: uuidv4(),
    sender: {
      firstName: "Ron",
      lastName: "Test",
      email: "magnus.nilsen@setvi.com",
    },
    recipient: {
      firstName: "Magnus",
      lastName: "Nilsen",
      email: "magnussithnilsen@gmail.com",
    },
    senderId: "e160a841-6da0-4075-be5b-b7c08b02ddaa",
    recipientId: "5d777955-2a54-4954-96d7-f0cf73cf5d51",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const StyledMessageList = styled("div", {
  display: "grid",
  flexDirection: "column",
});

const StyledMessageBox = styled("div", {
  display: "inline-flex",
  justifySelf: "flex-start",
  background: "#D9D9D9",
  borderRadius: "8px",

  margin: "$4",
  padding: "$4",

  variants: {
    right: {
      true: {
        justifySelf: "flex-end",
      },
    },
  },
});

interface MessageListProps {
  userId: string;
}

export const MessageList = ({ userId }: MessageListProps) => {
  console.log("userId: ", userId);
  return (
    <StyledMessageList>
      {DUMMY_DATA.map((message) => (
        <StyledMessageBox
          className={message.id}
          right={message.senderId === userId}
        >
          <div className="flex flex-col">
            <div>{message.sender.firstName}: </div>
            <div>{message.message}</div>
          </div>
        </StyledMessageBox>
      ))}
    </StyledMessageList>
  );
};
