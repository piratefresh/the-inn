import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "ui/src/Input";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Form/Input",
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  value: "Input",
  gold: true,
  size: "medium",
};
export const Unstyled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Unstyled.args = {
  value: "Input",
  gold: false,
};
export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  value: "Input",
  gold: true,
  size: "small",
};
export const Medium = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Medium.args = {
  value: "Input",
  gold: true,
  size: "medium",
};
export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
  value: "Input",
  gold: true,
  size: "large",
};
