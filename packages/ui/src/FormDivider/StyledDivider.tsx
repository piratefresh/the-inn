import { styled } from "../theme";

export const StyledDivider = styled("div", {
  borderRadius: "$radii$md",
  borderBottom: "2px solid transparent",
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  backgroundImage:
    "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
});
