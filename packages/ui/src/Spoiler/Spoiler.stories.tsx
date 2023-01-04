import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Spoiler } from "./Spoiler";

const meta: Meta<typeof Spoiler> = {
  title: "MGUI/Spoiler",
  component: Spoiler,
};

export default meta;
type Story = StoryObj<typeof Spoiler>;

export const Primary: Story = {
  args: {
    children:
      "“George is a fantastic GM.  He really knows the rules and helps beginners.  He always makes sure everyone I comfortable and having fun.  I love that he uses different voices for different NPCs.”",
  },
  render: (args) => {
    return <Spoiler {...args}>{args.children}</Spoiler>;
  },
};
