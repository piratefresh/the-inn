import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Text } from "ui/src/Typography";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Text",
  component: Text,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Text>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Text> = (args) => (
  <Text {...args}>{args.children}</Text>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: "Text",
  size: "base",
  as: "p",
  color: "contrast",
};
export const Trejan = Template.bind({});
Trejan.args = {
  children: "Text",
  size: "base",
  as: "p",
  font: "trejanSans",
  color: "contrast",
};
