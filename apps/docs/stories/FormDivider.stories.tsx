import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormDivider } from "ui/src/FormDivider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/FormDivider",
  component: FormDivider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: "string" },
  },
} as ComponentMeta<typeof FormDivider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FormDivider {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: "FormDivider",
};
