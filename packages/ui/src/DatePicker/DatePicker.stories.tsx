import { ComponentMeta } from "@storybook/react";
import { DatePicker } from "ui/src/DatePicker";
import { Text } from "ui/src/Typography";
import { parseDate } from "@internationalized/date";
import { AriaDatePickerProps } from "@react-aria/datepicker";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: AriaDatePickerProps<DateValue> = (args) => {
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
        <DatePicker label="Game Starting Date" onChange={setValue} />
      </div>
    </>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
