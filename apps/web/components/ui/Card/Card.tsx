import CardStyles from "./Card.module.css";
import React from "react";

type CardProps = {
  /** Predefined box-shadow from theme.shadows (xs, sm, md, lg, xl) or any valid css box-shadow property */
  //   shadow?: MantineShadow;

  /** Predefined border-radius value from theme.radius or number for border-radius in px */
  //   radius?: MantineNumberSize;

  /** Adds 1px border with theme.colors.gray[2] color in light color scheme and theme.colors.dark[6] in dark color scheme */
  /* Default is tr */
  withBorder?: boolean;

  /* Card Content */
  children?: React.ReactNode;
};

export const Card = React.forwardRef<HTMLInputElement, CardProps>(
  ({ withBorder = true, children }, ref: any) => {
    let classes = [CardStyles["root"]];

    if (withBorder) {
      classes.push(CardStyles["goldenBorder"]);
    }
    return (
      <a ref={ref} className={classes.join(" ")}>
        {children}
      </a>
    );
  }
);

Card.displayName = "Card";
