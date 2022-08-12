import { blackA } from "@radix-ui/colors";
import { styled, theme } from "../theme";

const StyledButton = styled("button", {
  // Reset
  all: "unset",
  alignItems: "center",
  boxSizing: "border-box",
  userSelect: "none",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },

  // Custom reset?
  position: "relative",
  display: "inline-flex",
  flexShrink: 0,
  justifyContent: "center",
  whiteSpace: "nowrap",
  lineHeight: "1",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  borderRadius: 4,
  backgroundColor: "$yellowBrand",
  color: blackA.blackA12,
  padding: "$space$2",
  fontSize: "$fontSizes$sm",
  fontFamily: "Inter",

  variants: {
    color: {
      blue: {
        backgroundColor: "$blue2",
        boxShadow: "inset 0 0 0 1px $colors$blue7",
        color: "$blue11",
      },
      yellow: {
        backgroundColor: "$yellowBrand",
        boxShadow: "inset 0 0 0 1px $colors$blue7",
        color: "$blue11",
      },
    },
    size: {
      small: {
        fontSize: "13px",
        height: "25px",
        paddingRight: "$space$4",
        paddingLeft: "$space$4",
      },
      large: {
        fontSize: "15px",
        height: "35px",
        paddingLeft: "$space$8",
        paddingRight: "$space$8",
      },
    },
  },
});

interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "large";
  color?: "blue" | "yellow";
}

export const Button = ({ size, color, children }: ButtonProps) => {
  return (
    <StyledButton size={size} color={color}>
      {children}
    </StyledButton>
  );
};
