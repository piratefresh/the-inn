import { blackA } from "@radix-ui/colors";
import { styled } from "../theme";

const StyledTag = styled("div", {
  display: "inline-flex",
  borderRadius: 4,
  backgroundColor: "$yellowBrand",
  color: blackA.blackA12,
  padding: "$space$2",
  fontSize: "$fontSizes$sm",
  fontFamily: "Inter",
});

export const Tag = StyledTag;
