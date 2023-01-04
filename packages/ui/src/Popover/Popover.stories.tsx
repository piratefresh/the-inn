import { Popover } from "@radix-ui/react-popover";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof Popover> = {
  title: "MGUI/Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return <Popover />;
  },
};
