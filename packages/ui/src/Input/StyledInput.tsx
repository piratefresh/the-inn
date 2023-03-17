import { styled } from "../theme";

export const StyledInput: any = styled("input", {
  // Reset
  all: "unset",
  color: "#fff",
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  fontFamily: "inherit",
  margin: "0",
  outline: "none",
  px: "$space$4",
  width: "100%",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },

  variants: {
    size: {
      small: {
        height: "$sizes$10",
        fontSize: "$fontSizes$sm",
        lineHeight: "$lineHeights$short",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
      medium: {
        height: "$sizes$14",
        fontSize: "$fontSizes$sm",
        lineHeight: "$lineHeight$base",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
      large: {
        height: "$sizes$18",
        fontSize: "$fontSizes$sm",
        lineHeight: "$lineHeight$taller",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
    },
    iconPlacement: {
      left: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: "transparent",
      },
      right: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightColor: "transparent",
      },
      none: {},
    },
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "1px solid $yellowBrand",
      },
    },
    errorStyle: {
      true: {
        border: "3px solid red",
      },
    },
  },
});
