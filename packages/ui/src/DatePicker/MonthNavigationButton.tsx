import { useButton } from "@react-aria/button";
import React, { useRef } from "react";
import { AriaButtonProps } from "react-aria";

type CalendarButtonProps = AriaButtonProps<"button"> & {
  icon: React.ReactElement;
  "aria-label": string;
};
export function MonthNavigationButton({
  icon,
  "aria-label": ariaLabel,
  ...rest
}: CalendarButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(rest, ref);
  return <button {...buttonProps} ref={ref} aria-label={ariaLabel} />;
}
