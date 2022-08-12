import { styled } from "../theme";

export const StyledInput = styled("input", {
  // Reset
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  fontFamily: "inherit",
  margin: "0",
  outline: "none",
  padding: "0",
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
        height: "$sizes$6",
        fontSize: "$fontSizes$sm",
        px: "$space$2",
        lineHeight: "$lineHeights$short",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
      medium: {
        height: "$sizes$10",
        fontSize: "$fontSizes$sm",
        px: "$space$2",
        lineHeight: "$lineHeight$base",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
      large: {
        height: "$sizes$12",
        fontSize: "$fontSizes$sm",
        px: "$space$2",
        lineHeight: "$lineHeight$taller",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
    },
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "2px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});