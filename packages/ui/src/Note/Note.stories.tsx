import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Note } from "./Note";

const meta: Meta<typeof Note> = {
  title: "MGUI/Note",
  component: Note,
};

export default meta;
type Story = StoryObj<typeof Note>;

export const Primary: Story = {
  args: {
    children:
      "“George is a fantastic GM.  He really knows the rules and helps beginners.  He always makes sure everyone I comfortable and having fun.  I love that he uses different voices for different NPCs.”",
  },
  render: (args) => {
    return <Note {...args}>{args.children}</Note>;
  },
};
