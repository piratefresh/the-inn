import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  useDatePickerState,
  useDateRangePickerState,
} from "@react-stately/datepicker";
import { useDateRangePicker } from "@react-aria/datepicker";
import { today, now, getLocalTimeZone } from "@internationalized/date";
import { DateField } from "./DateField";
import { RangeCalendar } from "./RangeCalender";

const meta: Meta<typeof DateField> = {
  title: "MGUI/DateField",
  component: DateField,
};

export default meta;
type Story = StoryObj<typeof DateField>;

export const Primary: Story = {
  args: {},
  render: (args) => {
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

    console.log("state: ", state.isOpen);
    const handleOpenCalender = () => {
      console.log("clicked");
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
  },
};
