import {
  gray,
  blue,
  red,
  green,
  yellow,
  slate,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  yellowDark,
  slateDark,
} from "@radix-ui/colors";

// Spread the scales in your light and dark themes
import { createStitches } from "@stitches/react";

export const { styled, createTheme } = createStitches({
  theme: {
    colors: {
      yellowBrand: "#FFD166",
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...yellow,
      ...slate,
    },
  },
});

const darkTheme = createTheme({
  colors: {
    yellowBrand: "#FFD166",
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...yellowDark,
    ...slateDark,
  },
});
