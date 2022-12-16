import { styled, VariantProps } from "../theme";
import { font } from "../theme/foundation/font";

export interface TextProps {
  children: React.ReactNode;
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "a";
  color?:
    | "red"
    | "crimson"
    | "pink"
    | "purple"
    | "violet"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "green"
    | "lime"
    | "yellow"
    | "yellow2"
    | "yellowBrand"
    | "orange"
    | "gold"
    | "bronze"
    | "gray"
    | "hiContrast"
    | "loContrast"
    | "lightContrast";
  font?: VariantProps<typeof font.fonts>;
  weight?: VariantProps<typeof font.fontWeights>;
  style?: React.CSSProperties;
  className?: string;
}

const StyledText = styled("span", {
  variants: {
    size: {
      xs: {
        fontSize: "$fontSizes$xs" /* 12px */,
        lineHeight: "$lineHeights$none" /* 16px */,
      },
      sm: {
        fontSize: "$fontSizes$sm" /* 12px */,
        lineHeight: "$lineHeights$shorter" /* 16px */,
      },
      base: {
        fontSize: "$fontSizes$base" /* 12px */,
        lineHeight: "$lineHeights$base" /* 16px */,
      },
      lg: {
        fontSize: "$fontSizes$lg" /* 12px */,
        lineHeight: "$lineHeights$7" /* 16px */,
      },
      xl: {
        fontSize: "$fontSizes$xl" /* 12px */,
        lineHeight: "$lineHeights$7" /* 16px */,
      },
      "2xl": {
        fontSize: "$fontSizes$2xl" /* 12px */,
        lineHeight: "$lineHeights$taller" /* 16px */,
      },
      "3xl": {
        fontSize: "$fontSizes$3xl" /* 12px */,
        lineHeight: "$lineHeights$9" /* 16px */,
      },
      "4xl": {
        fontSize: "$fontSizes$4xl" /* 12px */,
        lineHeight: "$lineHeights$10" /* 16px */,
      },
      "5xl": {
        fontSize: "$fontSizes$5xl" /* 12px */,
        lineHeight: "$lineHeights$none" /* 16px */,
      },
      "6xl": {
        fontSize: "$fontSizes$6xl" /* 12px */,
        lineHeight: "$lineHeights$none" /* 16px */,
      },
      "7xl": {
        fontSize: "$fontSizes$7xl" /* 12px */,
        lineHeight: "$lineHeights$none" /* 16px */,
      },
    },
    color: {
      red: {
        color: "$red11",
      },
      crimson: {
        color: "$crimson11",
      },
      pink: {
        color: "$pink11",
      },
      purple: {
        color: "$purple11",
      },
      violet: {
        color: "$violet11",
      },
      indigo: {
        color: "$indigo11",
      },
      blue: {
        color: "$blue11",
      },
      cyan: {
        color: "$cyan11",
      },
      teal: {
        color: "$teal11",
      },
      green: {
        color: "$green11",
      },
      lime: {
        color: "$lime11",
      },
      yellow: {
        color: "$yellow11",
      },
      yellow2: {
        color: "$yellow12",
      },
      yellowBrand: {
        color: "$yellowBrand",
      },
      orange: {
        color: "$orange11",
      },
      gold: {
        color: "$gold1",
      },
      bronze: {
        color: "$bronze11",
      },
      gray: {
        color: "$slate11",
      },
      hiContrast: {
        color: "$hiContrast",
      },
      loContrast: {
        color: "$loContrast",
      },
      lightContrast: {
        color: "rgb(237, 232, 205)",
      },
    },
    font: {
      mono: {
        fontFamiiy: "$fonts$mono",
      },
      serif: {
        fontFamiiy: "$fonts$serif",
      },
      sans: {
        fontFamiiy: "$fonts$sans",
      },
      untitled: {
        fontFamiiy: "$fonts$untitled",
      },
      trejan: {
        fontFamiiy: "$fonts$trejan",
      },
      alegreyasans: {
        fontFamiiy: "$fonts$alegreyasans",
      },
      cinzel: {
        fontFamily: "$fonts$cinzel",
      },
      oldfenris: {
        fontFamiiy: "$fonts$oldfenris",
      },
    },
    weight: {
      hairline: {
        fontWeight: "$fontWeghts$hairline",
      },
      thin: {
        fontWeight: "$fontWeghts$thin",
      },
      light: {
        fontWeight: "$fontWeghts$light",
      },
      normal: {
        fontWeight: "$fontWeghts$normal",
      },
      medium: {
        fontWeight: "$fontWeghts$medium",
      },
      semibold: {
        fontWeight: "$fontWeghts$semibold",
      },
      bold: {
        fontWeight: "$fontWeghts$bold",
      },
      extrabold: {
        fontWeight: "$fontWeghts$extrabold",
      },
      black: {
        fontWeight: "$fontWeghts$black",
      },
    },
  },
  defaultVariants: {
    size: "base",
    color: "loContrast",
  },
});

export const Text = ({
  size,
  as = "p",
  weight = "normal",
  color = "loContrast",
  style,
  className,
  font,
  children,
}: TextProps) => (
  <StyledText
    as={as}
    size={size}
    color={color}
    font={font}
    weight={weight}
    style={style}
    className={className}
  >
    {children}
  </StyledText>
);
