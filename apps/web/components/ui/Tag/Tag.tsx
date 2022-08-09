import { styled } from "@components/Theme/Theme";
import { blackA } from "@radix-ui/colors";

const StyledTag = styled("div", {
  borderRadius: 4,
  backgroundCOlor: "$yellowBrand",
  color: blackA.blackA12,
});

export const Tag = StyledTag;
