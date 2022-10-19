import { useRef } from "react";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./CalenderButton";
import { CalendarGrid } from "./CalendarGrid";
import { Header } from "../Typography";
import React from "react";

export function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  });

  let ref = React.useRef();
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} ref={ref}>
      <div>
        <CalendarButton {...prevButtonProps}>left</CalendarButton>
        <Header as="h2" size="base">
          {title}
        </Header>
        <CalendarButton {...nextButtonProps}>right</CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
