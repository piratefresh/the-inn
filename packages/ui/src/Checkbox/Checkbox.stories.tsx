import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from ".";

const meta: Meta<typeof Checkbox> = {
  title: "MGUI/Checkbox",
  component: Checkbox,
};

export default meta;

export const Primary: StoryObj<typeof Checkbox> = {
  args: {
    checked: false,
    name: "checkbox-1",
  },
  render: (args) => {
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
  },
};

export const Small: StoryObj<typeof Checkbox> = {
  ...Primary,
  args: {
    ...Primary.args,
    checked: false,
    name: "checkbox-1",
    size: "small",
  },
};

export const Medium: StoryObj<typeof Checkbox> = {
  ...Primary,
  args: {
    ...Primary.args,
    checked: false,
    name: "checkbox-1",
    size: "medium",
  },
};

export const Large: StoryObj<typeof Checkbox> = {
  ...Primary,
  args: {
    ...Primary.args,
    name: "checkbox-1",
    size: "large",
  },
};
