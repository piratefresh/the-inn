import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

let meta: Meta<typeof Text> = {
  title: "MGUI/Text",
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    children: "Text",
    size: "base",
    as: "p",
    color: "loContrast",
  },
  render: (args) => {
    return <Text {...args}>{args.children}</Text>;
  },
};
export const Trejan: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    children: "Text",
    size: "base",
    as: "p",
    font: "trejanSans",
    color: "loContrast",
  },
};
