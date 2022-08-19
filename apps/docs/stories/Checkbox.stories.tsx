import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox } from "ui/src/Checkbox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Form/Checkbox",
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [hover, setHover] = React.useState<boolean>(false);

  return (
    <Checkbox
      {...args}
      onChange={(e) => setChecked(e.target.checked)}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      hover={hover}
      checked={checked}
    />
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  checked: false,
  name: "checkbox-1",
};
export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  checked: false,
  name: "checkbox-1",
  size: "small",
};
export const Medium = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Medium.args = {
  checked: false,
  name: "checkbox-1",
  size: "medium",
};
export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
  checked: false,
  name: "checkbox-1",
  size: "large",
};
