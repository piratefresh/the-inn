import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Chip } from "ui/src/Chip";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Form/Chip",
  component: Chip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Chip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <>
      <Chip {...args}>{args.children}</Chip>
      <Chip selected {...args}>
        {args.children}
      </Chip>
    </>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: "Afternoon",
};
