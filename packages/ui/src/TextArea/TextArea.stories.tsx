import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "MGUI/Form/TextArea",
  component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Primary: Story = {
  args: {
    value: "TextArea",
    gold: true,
  },
  render: (args) => {
    return <TextArea {...args} />;
  },
};

export const Unstyled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    value: "TextArea",
    gold: false,
  },
};
