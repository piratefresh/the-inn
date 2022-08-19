import { styled } from "../theme";

const StyledChip = styled("div", {
  all: "unset",
  display: "inline-flex",
  backgroundColor: "$loContrast",
  borderRadius: "$radii$lg",
  padding: "$space$4 $space$10",

  variants: {
    selected: {
      true: {
        backgroundColor: "$yellowBrand",
        fontWeight: "bold",
      },
    },
  },
});

export const Chip = StyledChip;
