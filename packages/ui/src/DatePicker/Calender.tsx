import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { createCalendar, DateValue } from "@internationalized/date";
import { CalendarButton } from "./CalenderButton";
import { CalendarGrid } from "./CalendarGrid";
import { Header } from "../Typography";
import React from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import type { CalendarProps } from "@react-aria/calendar";

export function Calendar(props: CalendarProps<DateValue>) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  });

  let ref = React.useRef(null);
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} ref={ref} className="inline-block text-gray-800">
      <div className="flex items-center">
        <Header color="hiContrast" as="h2" size="base">
          {title}
        </Header>
        <CalendarButton {...prevButtonProps}>
          <ArrowLeftCircleIcon />
        </CalendarButton>

        <CalendarButton {...nextButtonProps}>
          <ArrowRightCircleIcon />
        </CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
