import { useRef } from "react";
import { AriaButtonProps, useButton } from "@react-aria/button";
import { useFocusRing, mergeProps } from "react-aria";

export function CalendarButton(props: AriaButtonProps) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);

  return (
    <button
      {...mergeProps(buttonProps)}
      ref={ref}
      className={`p-2 rounded-full ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
      } outline-none`}
    >
      {props.children}
    </button>
  );
}
