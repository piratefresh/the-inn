import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeField } from "ui/src/TimeField";
import {
  useDatePickerState,
  useDateRangePickerState,
} from "@react-stately/datepicker";
import { useDateRangePicker } from "@react-aria/datepicker";
import { today, now, getLocalTimeZone } from "@internationalized/date";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/TimeField",
  component: TimeField,
  parameters: {
    backgrounds: {
      default: "facebook",
      values: [{ name: "facebook", value: "#273435" }],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TimeField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <>
      <div
        style={{
          width: 400,
          display: "flex",
        }}
      >
        <TimeField label="Appointment time" />
      </div>
    </>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
