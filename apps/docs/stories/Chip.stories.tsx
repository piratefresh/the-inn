import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Chip } from "ui/src/Chip";
import { ChipGroup } from "ui/src/Chip/ChipGroup";

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
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState(["react"]);

  console.log("value: ", value);
  return (
    <>
      <Chip
        value="afternoon"
        onChange={() => setChecked((v) => !v)}
        checked={checked}
      >
        {args.children}
      </Chip>
      <Chip
        value="afternoon"
        onChange={() => setChecked((v) => !v)}
        checked={checked}
      >
        {args.children}
      </Chip>

      <ChipGroup position="center" value={value} onChange={setValue} multiple>
        <Chip value="react">React</Chip>
        <Chip value="ng">Angular</Chip>
        <Chip value="svelte">Svelte</Chip>
        <Chip value="vue">Vue</Chip>
      </ChipGroup>
    </>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: "Afternoon",
  value: "afternoon",
};
