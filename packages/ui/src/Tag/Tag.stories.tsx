import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tag } from "./Tag";

let meta: Meta<typeof Tag> = {
  title: "MGUI/Tag",
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    as: "div",
    children: "test",
  },
  render: (args) => <Tag as={args.as}>{args.children}</Tag>,
};
