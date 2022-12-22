//https://codesandbox.io/s/white-breeze-rer8g2?file=/src/DateField.js:1988-2765

import React from "react";
import {
  AriaDatePickerProps,
  useDateField,
  useDateSegment,
} from "@react-aria/datepicker";
import { useDateFormatter, useLocale, I18nProvider } from "@react-aria/i18n";
import {
  useDateFieldState,
  useDateRangePickerState,
  DateFieldState,
  DateSegment as DST,
} from "@react-stately/datepicker";

import { createCalendar, DateValue } from "@internationalized/date";
import { styled } from "../theme";

export interface DateFieldProps extends AriaDatePickerProps<DateValue> {
  onClick?: () => void;
  gold?: boolean;
  format?: "medium";
}

interface DateSegmentProps {
  segment: DST;
  state: DateFieldState;
}

const StyledRoot = styled("div", {
  display: "inline-flex",
  backgroundColor: "$loContrast",
  p: "$space$4",

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

export const DateField = ({ onClick, gold, ...props }: DateFieldProps) => {
  let { locale } = useLocale();

  let state = useDateFieldState({
    ...props,
    value: props.value,
    locale,
    createCalendar,
  });

  let ref = React.useRef<HTMLElement>(null);
  let { fieldProps } = useDateField(props, state, ref);

  // For formatting date
  // let formatter = useDateFormatter({
  //   dateStyle: "medium",
  //   day: state.segments[2].value,
  //   month: state.segments[0].value,
  //   year: state.segments[0].value,
  // });

  return (
    <StyledRoot {...fieldProps} onClick={onClick} gold={gold}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </StyledRoot>
  );
};

const StyledDateBox = styled("div", {
  fontVariantNumeric: "tabular-nums",
  boxSizing: "content-box",
  px: "$space$4",
  textAlign: "flex-end",
  outline: "none",
  borderRadius: "$radii$md",
});

export function DateSegment({ segment, state }: DateSegmentProps) {
  let ref = React.useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);

  console.log("segment: ", segment);

  return (
    <I18nProvider locale="en-US">
      <StyledDateBox
        {...segmentProps}
        ref={ref}
        style={{
          ...segmentProps.style,
        }}
      >
        {segment.text}
      </StyledDateBox>
    </I18nProvider>
  );
}
