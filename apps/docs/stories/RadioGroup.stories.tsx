import React, { useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { RadioGroup } from "ui/src/RadioGroup";

const OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Form/RadioGroup",
  component: RadioGroup,
  parameters: {
    backgrounds: {
      default: "facebook",
      values: [{ name: "facebook", value: "#273435" }],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    value: "",

    onChange: (v: string) => {},
  },
} as ComponentMeta<typeof RadioGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const [checked, setChecked] = React.useState<string>("Low");

  return (
    <RadioGroup
      {...args}
      value={checked}
      onChange={(v) => setChecked(v)}
      options={args.options}
    />
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  options: OPTIONS,
};
