import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MultiSelect } from "./MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "MGUI/MultiSelect",
  component: MultiSelect,
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = React.useState<string[]>([]);
    return <MultiSelect value={value} onChange={setValue} />;
  },
};
