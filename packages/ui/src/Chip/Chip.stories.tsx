import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Chip, ChipProps } from "./Chip";
import { ChipGroup } from "./ChipGroup";

const meta: Meta<typeof Chip> = {
  title: "MGUI/Form/Chip",
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {
    children: "Afternoon",
    value: "afternoon",
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = React.useState<string[]>(["react"]);
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

        <ChipGroup position="center" multiple value={value} onChange={setValue}>
          <Chip value="react">React</Chip>
          <Chip value="ng">Angular</Chip>
          <Chip value="svelte">Svelte</Chip>
          <Chip value="vue">Vue</Chip>
        </ChipGroup>
      </>
    );
  },
};
