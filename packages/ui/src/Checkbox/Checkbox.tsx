import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import React from "react";
import { styled } from "../theme";

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  //Reset
  all: "unset",
  backgroundColor: "white",
  border: "3px solid $yellowBrand",
  width: 25,
  height: 25,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  //   "&:hover": { backgroundColor: "$yellowBrand" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  backgroundColor: "$yellowBrand",
  padding: "$2",
});

const HiddenInput = styled("input", {
  all: "unset",
  appearance: "none",
  "-webkit-appearance": "none",
  "-moz-appearance": "none",
  width: "$space$4",
  height: "$space$4",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "3px solid $yellowBrand",

  "&::before": {
    content: "",
    color: "transparent",
    display: "block",
    // width: "inherit",
    // height: "inherit",
    borderRadius: "inherit",
    backgroundColor: "transparent",
    backgroundSize: "contain",
  },

  "&:checked::before": {
    padding: "$space$1",
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
        height: "$space$4",
        width: "$space$4",
      },
      medium: {
        height: "$space$8",
        width: "$space$8",
      },
      large: {
        height: "$space$10",
        width: "$space$10",
      },
    },
  },

  // border: "0px none",
  // clip: "rect(0px, 0px, 0px, 0px)",
  // height: "1px",
  // width: "1px",
  // margin: "-1px",
  // padding: "0px",
  // overflow: "hidden",
  // whiteSpace: "nowrap",
  // position: "absolute",
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

  "&:hover ${CheckboxControl}": {
    // padding: "$space$1",
    // backgroundColor: "$yellowBrand",
    // borderRadius: "$radii$sm",
  },

  variants: {
    size: {
      small: {
        height: "$space$4",
        width: "$space$4",
      },
      medium: {
        height: "$space$8",
        width: "$space$8",
      },
      large: {
        height: "$space$10",
        width: "$space$10",
      },
    },
  },
});

const CheckboxControl = styled("span", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "top",
  userSelect: "none",
  flexShrink: 0,

  variants: {
    size: {
      small: {
        height: "$space$1",
        width: "$space$1",
      },
      medium: {
        height: "$space$4",
        width: "$space$4",
      },
      large: {
        height: "$space$8",
        width: "$space$8",
      },
    },
    // checked: {
    //   true: {
    //     padding: "$space$1",
    //     backgroundColor: "$yellowBrand",
    //     borderRadius: "$radii$sm",
    //   },
    // },
    // hover: {
    //   true: {
    //     padding: "$space$1",
    //     backgroundColor: "$yellowBrand",
    //     borderRadius: "$radii$sm",
    //   },
    // },
  },
});

interface CheckboxProps
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
export const CheckboxIndicator = StyledIndicator;

export const Checkbox = ({
  size,
  onChange,
  checked,
  hover,
  ...props
}: CheckboxProps) => {
  return (
    <>
      <HiddenInput
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e);
        }}
      />
      {/* <CheckboxControl
        checked={checked}
        size={size}
        hover={hover}
      ></CheckboxControl> */}
    </>
  );
};
