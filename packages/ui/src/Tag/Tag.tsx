import { blackA } from "@radix-ui/colors";
import React from "react";
import { styled, VariantProps } from "../theme";

const StyledTag = styled("div", {
  display: "inline-flex",
  borderRadius: 4,
  backgroundColor: "$yellowBrand",
  color: blackA.blackA12,
  padding: "$space$4",
  fontSize: "$fontSizes$xs",
  fontFamily: "Inter",
  whiteSpace: "nowrap",
  margin: "$space$4 $space$4 $space$4 0px",
});

interface TagProps extends React.ComponentProps<typeof StyledTag> {
  children?: React.ReactNode;
  as?: string;
}

export const Tag = ({ children, ...props }: TagProps) => {
  return <StyledTag {...props}>{children}</StyledTag>;
};
