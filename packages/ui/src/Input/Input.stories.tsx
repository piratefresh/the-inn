import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "MGUI/Form/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    value: "Input",
    gold: true,
    size: "medium",
  },
  render: (args) => {
    return <Input {...args} />;
  },
};

export const Unstyled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    value: "Input",
    gold: false,
  },
};

export const Small: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    value: "Input",
    gold: true,
    size: "small",
  },
};

export const Medium: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    value: "Input",
    gold: true,
    size: "medium",
  },
};
export const Large: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    value: "Input",
    gold: true,
    size: "large",
  },
};
