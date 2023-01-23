import { styled } from "../theme";
import TextareaAutosize from "react-textarea-autosize";
import type { TextareaAutosizeProps } from "react-textarea-autosize";

export const StyledTextArea: any = styled(TextareaAutosize, {
  // Reset
  all: "unset",
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  fontFamily: "inherit",
  margin: "0",
  outline: "none",
  px: "$space$4",
  width: "100%",
  whiteSpace: "pre-wrap",
  overflowY: "auto",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },

  variants: {
    size: {
      small: {
        height: "$sizes$10",
        fontSize: "$fontSizes$sm",
        lineHeight: "$lineHeights$short",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
      medium: {
        height: "$sizes$14",
        fontSize: "$fontSizes$sm",
        lineHeight: "$lineHeight$base",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
      large: {
        height: "$sizes$18",
        fontSize: "$fontSizes$sm",
        lineHeight: "$lineHeight$taller",
        "&:-webkit-autofill::first-line": {
          fontSize: "$1",
        },
      },
    },
    iconPlacement: {
      left: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: "transparent",
      },
      right: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightColor: "transparent",
      },
      none: {},
    },
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
    errorStyle: {
      true: {
        border: "3px solid red",
      },
    },
  },
});

/* 
  Fix typescript
*/
export interface ITextAreaProps extends TextareaAutosizeProps {
  required?: boolean;
  className?: string;
  disabled?: boolean;
  error?: string;
  inputRef?: string;
  gold?: boolean;
}

export const TextArea = ({ gold, error, ...props }: ITextAreaProps) => {
  return <StyledTextArea gold={gold} errorStyle={!!error} {...props} />;
};
