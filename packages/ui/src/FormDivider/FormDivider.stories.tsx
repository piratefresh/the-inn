import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FormDivider, FormDividerProps } from "./FormDivider";

const meta: Meta<typeof FormDivider> = {
  title: "MGUI/Form/FormDivider",
  component: FormDivider,
};

export default meta;
type Story = StoryObj<typeof FormDivider>;

export const Primary: Story = {
  args: {
    label: "FormDivider",
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = React.useState<string[]>(["react"]);
    return <FormDivider {...args} />;
  },
};
