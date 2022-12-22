// https://codesandbox.io/s/objective-shape-8r4utm?file=/src/Button.js:517-527
import { useRef } from "react";
import { useCalendarCell } from "@react-aria/calendar";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { CalendarState, RangeCalendarState } from "@react-stately/calendar";
import {
  isSameDay,
  getDayOfWeek,
  isSameMonth,
  CalendarDate,
  DateValue,
} from "@internationalized/date";
import { styled } from "../theme";
import { useLocale } from "react-aria";

const StyledTD = styled("td", {
  display: "relative",
  py: "0.5rem",
});

const StyledCell = styled("div", {
  outline: "2px solid transparent",
  outlineOffset: "2px",
  height: "2.5rem",
  width: "2.5rem",
  fontWeight: "bold",

  variants: {
    roundedLeft: {
      true: {
        borderTopLeftRadius: "$radii$md",
        borderBottomLeftRadius: "$radii$md",
      },
    },
    roundedRight: {
      true: {
        borderTopRightRadius: "$radii$md",
        borderBottomRightRadius: "$radii$md",
      },
    },
    selected: {
      true: {
        backgroundColor: "$yellow6",
        color: "$loContrast",
      },
    },
    disabled: {
      true: {
        color: "$gray4",
      },
    },
  },
});

const StyledInnerCell = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  borderRadius: "$radii$md",
  variants: {
    selection: {
      true: {
        backgroundColor: "$yellowBrand",
        color: "white",
        fontWeight: "bold",
      },
    },
  },
});

export interface CalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
  currentMonth: DateValue;
}

export function CalendarCell({ state, date, currentMonth }: CalendarCellProps) {
  let ref = useRef(null);
  let { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  let isOutsideMonth = !isSameMonth(currentMonth, date);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  let isSelectionStart = (state as RangeCalendarState).highlightedRange
    ? isSameDay(date, (state as RangeCalendarState).highlightedRange.start)
    : isSelected;
  let isSelectionEnd = (state as RangeCalendarState).highlightedRange
    ? isSameDay(date, (state as RangeCalendarState).highlightedRange.end)
    : isSelected;

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  let { locale } = useLocale();
  let dayOfWeek = getDayOfWeek(date, locale);
  let isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  let isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <StyledTD {...cellProps}>
      <StyledCell
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        selected={isSelected}
        disabled={isDisabled}
        roundedLeft={isRoundedLeft}
        roundedRight={isRoundedRight}
      >
        <StyledInnerCell selection={isSelectionStart || isSelectionEnd}>
          {formattedDate}
        </StyledInnerCell>
      </StyledCell>
    </StyledTD>
  );
}
