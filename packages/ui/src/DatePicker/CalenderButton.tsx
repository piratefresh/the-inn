import { useRef } from "react";
import { useButton } from "@react-aria/button";
import { styled } from "../theme";

const StyledButton = styled("button", {
  reset: "all",
  border: "none",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  height: "1.5rem",
  backgroundColor: "transparent",
  borderRadius: "$radii$md",

  "&:hover": {
    backgroundColor: "$yellowBrand",
  },

  variants: {
    disabled: {
      true: {
        backgroundColor: "$yellow1",
        color: "$gray8",
      },
    },
  },
});

export function CalendarButton(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  return (
    <StyledButton {...buttonProps} ref={ref}>
      {props.children}
    </StyledButton>
  );
}

export function FieldButton(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  return (
    <StyledButton {...buttonProps} ref={ref}>
      {props.children}
    </StyledButton>
  );
}
