import { blackA } from "@radix-ui/colors";
import { styled } from "../theme";

const StyledTag = styled("div", {
  borderRadius: 4,
  backgroundColor: "$yellowBrand",
  color: blackA.blackA12,
  padding: "$sizes$4",
});

export const Tag = StyledTag;
