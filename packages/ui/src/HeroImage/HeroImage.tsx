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
  borderRadius: "$radii$md",

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
  width?: number;
  height?: number;
  gold?: boolean;
}

export const HeroImage = ({
  src,
  gold = false,
  height,
  width,
  ...props
}: HeroImageProps) => {
  return (
    <StyledRoot gold={gold}>
      <StyledHeroImage
        height={height}
        width={width}
        layout="responsive"
        src={src}
        {...props}
      />
    </StyledRoot>
  );
};
