import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { TimeField } from "./TimeField";

const meta: Meta<typeof TimeField> = {
  title: "MGUI/TimeField",
  component: TimeField,
};

export default meta;
type Story = StoryObj<typeof TimeField>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <div
        style={{
          width: 400,
          display: "flex",
        }}
      >
        <TimeField label="Appointment time" locale="" />
      </div>
    );
  },
};
