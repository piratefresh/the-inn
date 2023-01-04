import { DateValue, GregorianCalendar } from "@internationalized/date";
import { useDateField, useDateSegment } from "@react-aria/datepicker";
import {
  DateSegment as DateSegmentType,
  useDateFieldState,
} from "@react-stately/datepicker";
import { DOMAttributes, FocusableElement } from "@react-types/shared";
import React, { forwardRef, useRef } from "react";
import { AriaDateFieldProps, useLocale } from "react-aria";
import { DateFieldState } from "react-stately";

function createCalendar(identifier: string) {
  switch (identifier) {
    case "gregory":
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}

type DateFieldProps = AriaDateFieldProps<DateValue> & {
  label?: React.ReactNode;
  labelProps?: DOMAttributes<FocusableElement>;
  name?: string;
  onClick?: () => void;
};
export function DateField(props: DateFieldProps) {
  const { locale } = useLocale();

  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps, labelProps } = useDateField(props, state, ref);

  return (
    <div className="flex flex-col">
      {props.label && (
        <div {...props.labelProps} {...labelProps}>
          {props.label}
        </div>
      )}
      <div {...fieldProps} ref={ref} className="flex">
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
      <input type="hidden" value={state.value?.toString()} name={props.name} />
    </div>
  );
}
interface StyledFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick(): void;
  children: React.ReactNode;
  variant?: "simple" | "with-trigger";
}
export const StyledField = forwardRef<HTMLDivElement, StyledFieldProps>(
  ({ children, variant = "simple", ...otherProps }, ref) => {
    return (
      <div {...otherProps} ref={ref}>
        {children}
      </div>
    );
  }
);

type DateSegmentProps = {
  segment: DateSegmentType;
  state: DateFieldState;
};
function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`box-content tabular-nums p-3 text-end outline-none rounded-sm focus:bg-brandYellow focus:text-white group ${
        !segment.isEditable ? "text-gray-500" : "text-gray-800"
      }`}
    >
      {segment.text}
    </div>
  );
}
