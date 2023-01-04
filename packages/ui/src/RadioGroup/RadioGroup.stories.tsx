import { Meta, StoryObj } from "@storybook/react";
import React, { useEffect } from "react";
import { RadioGroup } from "./RadioGroup";

const OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const meta: Meta<typeof RadioGroup> = {
  title: "MGUI/Form/RadioGroup",
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Primary: Story = {
  args: {
    options: OPTIONS,
    direction: "column",
    width: "250px",
  },
  render: (args) => {
    const [checked, setChecked] = React.useState<string>("Low");
    return (
      <RadioGroup
        {...args}
        value={checked}
        onChange={(v) => setChecked(v)}
        options={args.options}
        direction={args.direction}
        width={args.width}
      />
    );
  },
};

export const Row: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    options: OPTIONS,
    direction: "row",
    width: "250px",
    height: "100px",
  },
};
