import React from "react";
import { styled } from "../theme";

const StyledCardWrapper = styled("div", {
  backgroundColor: "$loContrast",
  variants: {
    background: {
      dark: {
        borderRadius: "$radii$md",
        border: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        backgroundImage:
          "linear-gradient(rgb(24,24,24), rgb(24,24,24)),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});

export const CardSection = styled("div", {
  p: "$space$8",
});

export const CardImage = styled("img", {
  objectFit: "cover",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",

  variants: {
    gold: {
      true: {
        borderBottom: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        backgroundImage:
          "linear-gradient(45deg,$yellowBrand, $orangeBrand),linear-gradient(45deg,$yellowBrand, $orangeBrand)",
      },
    },
  },
});

export interface CardProps extends React.ComponentPropsWithRef<"div"> {
  children: React.ReactNode;
  gold?: boolean;
  background?: "dark";
}

// There's currently an issue with ui-stitches and typescrip
// @ts-ignore
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, gold, ...props }, ref) => (
    <StyledCardWrapper ref={ref} gold={gold} {...props}>
      {children}
    </StyledCardWrapper>
  )
);
