import * as React from "react";
import type {
  CalendarState,
  RangeCalendarState,
} from "@react-stately/calendar";
import { useCalendarCell } from "@react-aria/calendar";
import {
  CalendarDate,
  DateValue,
  getDayOfWeek,
  isSameDay,
  isSameMonth,
} from "@internationalized/date";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { classNames } from "../utils/classNames";
import { styled } from "../theme";
import { useLocale } from "@react-aria/i18n";

export interface Props {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
  currentMonth: DateValue;
}

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

export function CalendarCell({ state, date, currentMonth }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell({ date }, state, ref);

  let isOutsideMonth = !isSameMonth(currentMonth, date);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  let isSelectionStart = (state as RangeCalendarState).highlightedRange
    ? isSameDay(date, (state as RangeCalendarState).highlightedRange.start)
    : isSelected;
  let isSelectionEnd = (state as RangeCalendarState).highlightedRange
    ? isSameDay(date, (state as RangeCalendarState).highlightedRange.end)
    : isSelected;

  let { locale } = useLocale();

  let dayOfWeek = getDayOfWeek(date, locale);

  let isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  let isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td {...cellProps}>
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
    </td>
  );
}
