import HeroImageStyles from "./HeroImage.module.css";
import Image from "next/image";

export interface HeroImageProps {
  image: string;
}

export const HeroImage = ({ image }: HeroImageProps) => {
  const classes = [HeroImageStyles["root"]];
  return (
    <div className={classes.join(" ")}>
      <Image src={image} layout="fill" objectFit="cover" alt="Hero Image" />
    </div>
  );
};
