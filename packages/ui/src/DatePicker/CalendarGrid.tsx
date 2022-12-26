import { useCalendarGrid } from "@react-aria/calendar";
import { getWeeksInMonth } from "@internationalized/date";
import type {
  CalendarState,
  RangeCalendarState,
} from "@react-stately/calendar";

import { CalendarCell } from "./CalendarCell";
import { AriaCalendarGridProps, useLocale } from "react-aria";

export interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState | RangeCalendarState;
  offset?: { months?: number };
}

export function CalendarGrid({
  state,
  offset = {},
  ...props
}: CalendarGridProps) {
  let { locale } = useLocale();
  let startDate = state.visibleRange.start.add(offset);

  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-gray-600">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    currentMonth={startDate}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
