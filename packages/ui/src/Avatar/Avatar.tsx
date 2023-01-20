import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { styled } from "../theme";
import { Tooltip } from "../Tooltip";
import { getInitials } from "../utils/getInitials";

export interface AvatarProps {
  name: string;
  imageUrl?: string;
}

const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: 45,
  height: 45,
  borderRadius: "100%",
  backgroundColor: "$yellowBrand",
  border: "1px solid $yellowBrand",
});

const AvatarImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$lightBlackBrand",
  color: "$yellowBrand",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
});

const Flex = styled("div", { display: "flex" });

export const Avatar = ({ name, imageUrl }: AvatarProps) => {
  const initials = getInitials(name);
  return (
    <Tooltip content={name}>
      <AvatarRoot>
        {imageUrl && (
          <AvatarImage className="AvatarImage" src={imageUrl} alt={name} />
        )}

        <AvatarFallback>{initials}</AvatarFallback>
      </AvatarRoot>
    </Tooltip>
  );
};
