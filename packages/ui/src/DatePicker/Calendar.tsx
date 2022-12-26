import { createCalendar, DateValue } from "@internationalized/date";
import { useCalendar } from "@react-aria/calendar";
import { useCalendarState } from "@react-stately/calendar";
import React from "react";
import { CalendarProps, useLocale } from "react-aria";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

export function Calendar(props: CalendarProps<DateValue>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div {...calendarProps}>
      <CalendarHeader
        title={title}
        previousButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <CalendarGrid state={state} />
    </div>
  );
}
