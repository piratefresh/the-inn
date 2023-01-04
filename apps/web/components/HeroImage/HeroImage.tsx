import HeroImageStyles from "./HeroImage.module.css";
import Image, { ImageProps } from "next/image";

export interface HeroImageProps extends ImageProps {
  image: string;
}

export const HeroImage = ({ image, objectFit, ...props }: HeroImageProps) => {
  const classes = [HeroImageStyles["root"]];
  return (
    <div className={classes.join(" ")}>
      <Image
        src={image}
        layout="fill"
        objectFit={objectFit}
        alt="Hero Image"
        {...props}
      />
    </div>
  );
};
