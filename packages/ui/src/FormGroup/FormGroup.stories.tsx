import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FormGroup } from "./FormGroup";
import { Input } from "../Input";

const meta: Meta<typeof FormGroup> = {
  title: "MGUI/Form/FormGroup",
  component: FormGroup,
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Primary: Story = {
  args: {
    label: "Name",
    helperText: "The name of the campaign",
    color: "loContrast",
  },
  render: (args) => {
    return (
      <FormGroup {...args}>
        <Input size="medium" gold />
      </FormGroup>
    );
  },
};
