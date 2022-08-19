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
import { borderStyles, borderWidth } from "./foundation/borders";
import { font } from "./foundation/font";
import { shadows } from "./foundation/shadow";
import { sizes } from "./foundation/sizes";
import { spacing } from "./foundation/spacing";
import transition from "./foundation/transition";
import { utils } from "./foundation/utils";
import { zIndex } from "./foundation/zIndex";

export type { VariantProps } from "@stitches/react";

export const { config, css, styled, createTheme, theme } = createStitches({
  theme: {
    colors: {
      yellowBrand: "#FFD166",
      orangeBrand: "#9f5e25",
      whiteBrand: "#fcfcfc",
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...yellow,
      // Semantic colors
      hiContrast: "$gray12",
      loContrast: "white",
    },
    space: spacing.space,
    fontSizes: {
      ...font.fontSizes,
    },
    fonts: {
      untitled: "Untitled Sans, apple-system, sans-serif",
      mono: "Söhne Mono, menlo, monospace",
      sans: font.fonts.sans,
      serif: font.fonts.serif,
      oldFenris: font.fonts.oldFenris,
      alegreyaSans: font.fonts.alegreyaSans,
      trejanSans: font.fonts.trejanSans,
    },
    fontWeights: {
      ...font.fontWeights,
    },
    lineHeights: { ...font.lineHeights },
    letterSpacings: { ...font.letterSpacings },
    sizes: {
      ...spacing.space,
      ...sizes.sizes,
    },
    borderWidths: {
      ...borderWidth,
    },
    borderStyles: { ...borderStyles },
    radii: {
      ...borderRadius.radii,
    },
    shadows: { ...shadows },
    zIndices: { ...zIndex.zIndices },
    // transitions: { ...transition },
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
