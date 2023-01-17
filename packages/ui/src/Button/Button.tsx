import { blackA } from "@radix-ui/colors";
import { styled } from "../theme";
import type * as Stitches from "@stitches/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const StyledButton = styled("button", {
  // Reset

  alignItems: "center",
  boxSizing: "border-box",
  cursor: "pointer",
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

        padding: "$space$4",
      },
      large: {
        fontSize: "15px",

        padding: "$space$8",
      },
    },
    fullWidth: {
      true: {
        display: "flex",
        width: "100%",
      },
    },
    outlined: {
      primary: {
        backgroundColor: "transparent",
        border: "1px solid $yellowBrand",
      },
    },
    active: {
      true: {},
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "large";
  color?: "blue" | "yellow";
  css?: Stitches.CSS;
  fullWidth?: boolean;
  outlined?: "primary";
  className?: string;
}

export const Button = ({
  size,
  color,
  css,
  children,
  fullWidth,
  outlined,
  className,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      css={css}
      size={size}
      color={color}
      fullWidth={fullWidth}
      outlined={outlined}
      className={className}
      {...props}
    >
      {props.disabled && (
        <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
      )}
      {children}
    </StyledButton>
  );
};
