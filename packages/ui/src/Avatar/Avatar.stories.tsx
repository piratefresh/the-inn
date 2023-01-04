import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  render: () => (
    <Avatar
      imageUrl="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      name="Colm Tuite"
    />
  ),
};

export const Name: Story = {
  render: () => <Avatar name="Colm Tuite" />,
};
