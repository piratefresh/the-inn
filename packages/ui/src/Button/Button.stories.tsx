import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
  },
  render: (args) => <Button>{args.children}</Button>,
};

export const Large: Story = {
  ...Primary,
  args: {
    children: "Button",
    size: "large",
  },
};

export const Small: Story = {
  ...Primary,
  args: {
    children: "Button",
    size: "small",
  },
};
