import * as Popover from "@radix-ui/react-popover";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Notification } from "../Notification";

const meta: Meta<typeof Popover> = {
  title: "MGUI/Popover",
};

export default meta;
type Story = StoryObj<typeof Popover>;

const notifications = [
  {
    id: "1",
    createdAt: "2023-01-06T03:31:17.977Z",
    imageSrc:
      "https://res.cloudinary.com/film-it/image/upload/v1659574786/the-inn/campaignmedia/l1uazkitrvby7ijxwhcn.jpg",
    sender: "Zach Sharkey",
    relatedId: "wmkdakdmawd",
    children: (
      <div>
        <p className="text-sm text-white">
          Just created an application for{" "}
          <span className="text-bold underline cursor-pointer">
            Long Live the King - Royal Politics
          </span>
        </p>
      </div>
    ),
  },
];

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="relative">
        <Popover.Root>
          <Popover.Trigger>Click Me</Popover.Trigger>

          <Popover.Portal>
            <Popover.Content>
              {notifications.map((notification) => (
                <Notification {...notification} key={notification.id} />
              ))}

              <Popover.Close />
              <Popover.Arrow />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  },
};
