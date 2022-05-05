import React from "react";
import CardStyles from "../Card.module.css";

interface CardMediaProps {
  withBorder?: boolean;
  children: React.ReactNode;
}

export const CardMedia = ({ withBorder = true, children }: CardMediaProps) => {
  let classes = [CardStyles["image"]];

  if (withBorder) {
    classes.push(CardStyles["imageGoldenBorder"]);
  }
  return <div className={classes.join(" ")}>{children}</div>;
};
