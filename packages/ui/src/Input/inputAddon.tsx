import React from "react";
import { styled } from "../theme";

type Placement = "left" | "right";

export interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  placements?: Placement;
}

const StyledAddon = styled("div", {
  flex: "0 0 auto",
  width: "auto",
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  padding: "0 $4",
  fontWeight: "bold",

  variants: {
    placements: {
      left: {
        marginEnd: "-1px",
        borderRightColor: "transparent",
        borderRadius: "$radii$md",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      right: {
        marginStart: "-1px",
        borderStartRadius: 0,
        borderStartColor: "transparent",
        borderRadius: "$radii$md",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
});

export const InputAddon = ({
  placements = "left",
  ...rest
}: InputAddonProps) => {
  return <StyledAddon {...rest} placements={placements} />;
};
