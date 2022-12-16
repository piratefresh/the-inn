import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Popover } from "ui/src/Popover";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Popover",
  component: Popover,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Popover>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popover> = (args) => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [hover, setHover] = React.useState<boolean>(false);

  return <Popover />;
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
