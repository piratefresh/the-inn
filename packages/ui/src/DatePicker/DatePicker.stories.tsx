import { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { Text } from "../Typography";
import { parseDate } from "@internationalized/date";
import { AriaDatePickerProps } from "@react-aria/datepicker";
import { DateValue } from "@internationalized/date";
import React from "react";

const meta: Meta<typeof DatePicker> = {
  title: "MGUI/DatePicker",
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    let [value, setValue] = React.useState<DateValue>(parseDate("2020-02-03"));
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
          <Text color="hiContrast">{value.toString()}</Text>
          <DatePicker
            variant="simple"
            label="Game Starting Date"
            onChange={setValue}
          />
        </div>
      </>
    );
  },
};
