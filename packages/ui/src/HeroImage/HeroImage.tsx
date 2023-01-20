import Image, { ImageProps } from "next/image";
import { styled } from "../theme";

const StyledHeroImage = styled(Image, {
  position: "relative",
  fontFamily: "$fonts$trejanSans",
  textTransform: "uppercase",
  color: "$hiContrast",
  objectFit: "cover",
});

const StyledRoot = styled("div", {
  position: "relative",
  borderRadius: "$radii$md",
  height: "100%",
  width: "auto",

  variants: {
    gold: {
      true: {
        border: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});

interface HeroImageProps extends ImageProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  gold?: boolean;
}

export const HeroImage = ({ src, gold = false, ...props }: HeroImageProps) => {
  return (
    <StyledRoot gold={gold}>
      <StyledHeroImage src={src} {...props} />
    </StyledRoot>
  );
};
