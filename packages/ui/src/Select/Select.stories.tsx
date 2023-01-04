import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Select } from "./Select";

const OPTIONS = [
  { value: 1, name: "Dungeon and Dragons" },
  { value: 2, name: "Pathfinder" },
  { value: 3, name: "Star Wars FFG" },
  { value: 4, name: "Hero System" },
  { value: 5, name: "Shadowrun" },
];

const meta: Meta<typeof Select> = {
  title: "MGUI/Form/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {},
  render: (args) => {
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
  },
};
