import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FormGroup } from "ui/src/FormGroup";
import { Input } from "ui/src/Input";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Form/FormGroup",
  component: FormGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FormGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormGroup> = (args) => (
  <FormGroup {...args}>
    <Input size="medium" gold />
  </FormGroup>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: "Name",
  helperText: "The name of the campaign",
  color: "loContrast",
};
