import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AsyncSelector } from "ui/src/Selector";

const OPTIONS = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Form/AsyncSelector",
  component: AsyncSelector,
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
} as ComponentMeta<typeof AsyncSelector>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AsyncSelector> = (args) => {
  const [option, setSelectoredOption] = React.useState(OPTIONS[0]);
  return (
    <div style={{ maxWidth: "300px" }}>
      <AsyncSelector options={OPTIONS} />
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
