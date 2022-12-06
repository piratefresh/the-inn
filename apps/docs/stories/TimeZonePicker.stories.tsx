import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import type { ITimezone } from "react-timezone-select";
import { TimeZonePicker } from "ui/src/TimeZonePicker";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/TimeZonePicker",
  component: TimeZonePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TimeZonePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TimeZonePicker> = (args) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [selectedTimezone, setSelectedTimezone] = React.useState<ITimezone>(tz);

  return (
    <>
      <TimeZonePicker value={selectedTimezone} onChange={setSelectedTimezone} />
      <pre>{JSON.stringify(selectedTimezone, null, 2)}</pre>
    </>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
