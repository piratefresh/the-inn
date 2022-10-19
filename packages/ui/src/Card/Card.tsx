import { styled } from "../theme";

const StyledCardWrapper = styled("div", {
  backgroundColor: "$loContrast",
  variants: {
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

const StyledCardSection = styled("div", {
  p: "$space$8",
});

const StyledCardImg = styled("img", {
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

export const Card = ({ children, gold, ...props }) => (
  <StyledCardWrapper gold={gold} {...props}>
    {children}
  </StyledCardWrapper>
);

Card.Image = StyledCardImg;
Card.Section = StyledCardSection;
