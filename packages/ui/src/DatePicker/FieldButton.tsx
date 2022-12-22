import React from "react";
import { AriaButtonProps, useButton } from "react-aria";
import type { ButtonProps } from "@react-types/button";
import type { DOMProps } from "@react-types/shared";

export interface FieldButtonProps extends ButtonProps, DOMProps {
  /** @default 'primary' */
  color?: "form" | "primary";
  isActive?: boolean;
  isPressed?: boolean;
}

export function FieldButton(props: FieldButtonProps) {
  let ref = React.useRef(null);

  return (
    <button
      ref={ref}
      className={`px-2 -ml-px border border-l-0 border-yellow-400 transition-colors rounded-r-md group-focus-within:border-yellow-600 group-focus-within:group-hover:border-yellow-600 outline-none`}
    >
      {props.children}
    </button>
  );
}
