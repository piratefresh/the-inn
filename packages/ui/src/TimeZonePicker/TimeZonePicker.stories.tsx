import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import type { ITimezone } from "react-timezone-select";
import { TimeZonePicker } from "./TimeZonePicker";

const meta: Meta<typeof TimeZonePicker> = {
  title: "MGUI/Time/TimeZonePicker",
  component: TimeZonePicker,
};

export default meta;
type Story = StoryObj<typeof TimeZonePicker>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [selectedTimezone, setSelectedTimezone] =
      React.useState<ITimezone>(tz);
    return (
      <>
        <TimeZonePicker
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
        <pre>{JSON.stringify(selectedTimezone, null, 2)}</pre>
      </>
    );
  },
};
