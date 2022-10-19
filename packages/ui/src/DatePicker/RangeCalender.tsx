import { useRef } from "react";
import { useRangeCalendarState } from "@react-stately/calendar";
import { useRangeCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { styled } from "../theme";
const BorderWrapper = styled("div", {
  display: "inline-block",
  variants: {
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});
const Root = styled("div", {
  display: "inline-block",
  padding: "$space$4",
  backgroundColor: "white",
});
const StyledWrapper = styled("div", {
  display: "flex",
  gap: "$space$12",
});

export function RangeCalendar(props) {
  let { locale } = useLocale();
  let state = useRangeCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(
    props,
    state,
    ref
  );

  return (
    <BorderWrapper gold>
      <Root {...calendarProps} ref={ref}>
        <CalendarHeader
          state={state}
          calendarProps={calendarProps}
          prevButtonProps={prevButtonProps}
          nextButtonProps={nextButtonProps}
        />
        <StyledWrapper>
          <CalendarGrid state={state} />
          <CalendarGrid state={state} offset={{ months: 1 }} />
        </StyledWrapper>
      </Root>
    </BorderWrapper>
  );
}
