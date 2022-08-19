import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "ui/src/Select";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Form/Select",
  component: Select,
  parameters: {
    backgrounds: {
      default: "facebook",
      values: [{ name: "facebook", value: "#273435" }],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <div style={{ maxWidth: "300px" }}>
    <Select {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
