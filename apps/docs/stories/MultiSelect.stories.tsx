import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MultiSelect } from "ui/src/MultiSelect";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/MultiSelect",
  component: MultiSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof MultiSelect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MultiSelect> = (args) => <MultiSelect />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: "Dungeon and Dragons",
};
