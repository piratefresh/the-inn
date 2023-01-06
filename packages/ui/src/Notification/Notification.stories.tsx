import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Notification } from "./Notification";

const meta: Meta<typeof Notification> = {
  title: "MGUI/Notification",
  component: Notification,
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Primary: Story = {
  args: {
    createdAt: "2023-01-06T03:31:17.977Z",
    children: (
      <div>
        Just created an application for{" "}
        <span className="text-bold">Long Live the King - Royal Politics</span>
      </div>
    ),
    imageSrc:
      "https://res.cloudinary.com/film-it/image/upload/v1659574786/the-inn/campaignmedia/l1uazkitrvby7ijxwhcn.jpg",
    sender: "Zach Sharkey",
  },
  render: (args) => {
    return <Notification {...args} />;
  },
};
