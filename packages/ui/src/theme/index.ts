import {
  gray,
  blue,
  red,
  green,
  yellow,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  yellowDark,
} from "@radix-ui/colors";
import type * as Stitches from "@stitches/react";
// Spread the scales in your light and dark themes
import { createStitches } from "@stitches/react";
import { borderRadius } from "./foundation/borderRadius";
import { font } from "./foundation/font";
import { shadows } from "./foundation/shadow";
import { sizes } from "./foundation/sizes";
import { spacing } from "./foundation/spacing";
import transition from "./foundation/transition";
import { utils } from "./foundation/utils";
import { zIndex } from "./foundation/zIndex";

export const { config, css, styled, createTheme } = createStitches({
  theme: {
    colors: {
      yellowBrand: "#FFD166",
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...yellow,
    },
    space: spacing.space,
    fontSizes: {
      ...font.fontSizes,
    },
    fonts: {
      untitled: "Untitled Sans, apple-system, sans-serif",
      mono: "Söhne Mono, menlo, monospace",
    },
    fontWeights: {
      ...font.fontWeights,
    },
    lineHeights: { ...font.lineHeights },
    letterSpacings: { ...font.letterSpacings },
    sizes: {
      ...sizes.sizes,
    },
    borderWidths: {},
    borderStyles: {},
    radii: {
      ...borderRadius.radii,
    },
    shadows: { ...shadows },
    zIndices: { ...zIndex.zIndices },
    transitions: { ...transition },
  },
  utils: {
    ...utils.utils,
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
  },
});

export type CSS = Stitches.CSS<typeof config>;
