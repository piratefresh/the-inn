import { styled } from "../theme";

export const StyledInput = styled("input", {
  // Reset
  all: "unset",
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
