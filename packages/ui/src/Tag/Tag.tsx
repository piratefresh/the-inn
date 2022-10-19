import { blackA } from "@radix-ui/colors";
import { styled } from "../theme";

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

export const Tag = StyledTag;
