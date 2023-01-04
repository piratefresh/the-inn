import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Chip } from "../Chip";
import { Selector } from "./Selector";

const OPTIONS = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const meta: Meta<typeof Chip> = {
  title: "MGUI/Form/Selector",
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [option, setSelectoredOption] = React.useState(OPTIONS[0]);
    return (
      <div style={{ maxWidth: "300px" }}>
        <Selector options={OPTIONS} />
      </div>
    );
  },
};
