import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AsyncSelector } from "../Selector";

const OPTIONS = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const meta: Meta<typeof AsyncSelector> = {
  title: "MGUI/Form/AsyncSelector",
  component: AsyncSelector,
};

export default meta;
type Story = StoryObj<typeof AsyncSelector>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <div style={{ maxWidth: "300px" }}>
        <AsyncSelector options={OPTIONS} />
      </div>
    );
  },
};
