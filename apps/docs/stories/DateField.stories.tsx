import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Calendar, DateField, RangeCalendar } from "ui/src/DatePicker";
import {
  useDatePickerState,
  useDateRangePickerState,
} from "@react-stately/datepicker";
import { useDateRangePicker } from "@react-aria/datepicker";
import { today, now, getLocalTimeZone } from "@internationalized/date";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/DateField",
  component: DateField,
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
} as ComponentMeta<typeof DateField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  let state = useDateRangePickerState({});
  let ref = React.useRef(null);
  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(
    {
      label: "Appointment date and time",
      minValue: today(getLocalTimeZone()),
    },
    state,
    ref
  );

  const handleOpenCalender = () => {
    state.setOpen(!state.isOpen);
  };

  return (
    <>
      <div
        style={{
          width: 400,
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        {state.isOpen ? "OPEN" : "CLOSED"}
        <DateField onClick={handleOpenCalender} {...startFieldProps} />

        <DateField onClick={handleOpenCalender} {...endFieldProps} />
      </div>
      {state.isOpen && <RangeCalendar {...calendarProps} />}
    </>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: "DateField",
};
