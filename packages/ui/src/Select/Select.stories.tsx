import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "ui/src/Select";

const OPTIONS = [
  { value: 1, name: "Dungeon and Dragons" },
  { value: 2, name: "Pathfinder" },
  { value: 3, name: "Star Wars FFG" },
  { value: 4, name: "Hero System" },
  { value: 5, name: "Shadowrun" },
];

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
const Template: ComponentStory<typeof Select> = (args) => {
  const [option, setSelectedOption] = React.useState(OPTIONS[0]);
  return (
    <div style={{ maxWidth: "300px" }}>
      <Select
        options={OPTIONS}
        onChange={setSelectedOption}
        selected={option}
      />
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
