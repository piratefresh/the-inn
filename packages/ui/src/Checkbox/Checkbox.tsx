import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import React from "react";
import { styled } from "../theme";
import { Text } from "../Typography";

const StyledInput = styled("input", {
  all: "unset",
  appearance: "none",
  "-webkit-appearance": "none",
  "-moz-appearance": "none",
  width: "$space$6",
  height: "$space$6",
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "3px solid $yellowBrand",

  "&::before": {
    content: "",
    color: "transparent",
    display: "block",
    borderRadius: "inherit",
    backgroundColor: "transparent",
    backgroundSize: "contain",
  },

  "&:checked::before": {
    padding: "$space$2",
    backgroundColor: "$yellowBrand",
    borderRadius: "$radii$sm",
  },

  "&::checked": {
    backgroundColor: "$yellowBrand",
    borderRadius: "$radii$sm",
  },

  variants: {
    size: {
      small: {
        height: "$space$8",
        width: "$space$8",
        "&:checked::before": {
          padding: "$space$2",
        },
      },
      medium: {
        height: "$space$10",
        width: "$space$10",

        "&:checked::before": {
          padding: "$space$4",
        },
      },
      large: {
        height: "$space$12",
        width: "$space$12",

        "&:checked::before": {
          padding: "$space$6",
        },
      },
    },
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "1px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});

const CheckboxRoot = styled("label", {
  all: "unset",
  appearance: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "top",
  position: "relative",
  border: "1px solid $yellowBrand",
  height: "$space$4",
  width: "$space$4",
});

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  afterLabel?: string;
  beforeLabel?: string;
  value?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  checked?: boolean;
  hover?: boolean;
  className?: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange(x: React.ChangeEvent<HTMLInputElement>): void;
  onFocus?(x: React.FocusEvent<HTMLInputElement>): void;
  onBlur?(x: React.FocusEvent<HTMLInputElement>): void;
  size?: "small" | "medium" | "large";
}

// Exports
export const Checkbox = ({
  size,
  onChange,
  checked,
  hover,
  ...props
}: CheckboxProps) => {
  return (
    <>
      <StyledInput
        type="checkbox"
        size={size}
        checked={checked}
        onChange={(e) => {
          onChange(e);
        }}
        gold
      />
    </>
  );
};
