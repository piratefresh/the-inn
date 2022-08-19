import { styled } from "../theme";
import { Header, Text } from "../Typography";
import { TextProps } from "../Typography/Text";

const StyledFormGroup = styled("div", {
  display: "flex",
  flexDirection: "column",

  [`& ${Text}`]: {},

  variants: {
    direction: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
      rowReverse: {
        flexDirection: "row",
      },
    },
    inline: {
      true: {
        display: "inline-flex",
      },
    },
  },
});

interface FormGroupProps extends TextProps {
  label: string;
  helperText: string;
  direction?: "row" | "column" | "rowReverse";
  inline?: boolean;
}

export const FormGroup = ({
  label,
  helperText,
  children,
  color,
  size,
  as = "h2" as "h2",
  font,
  direction,
  inline = false,
}: FormGroupProps) => (
  <StyledFormGroup direction={direction} inline={inline}>
    <Header color={color} size={size} as={as} font={font}>
      {label}
    </Header>
    {children}
    <Text color="contrast" size="sm" as="p">
      {helperText}
    </Text>
  </StyledFormGroup>
);
