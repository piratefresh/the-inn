import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import React from "react";
import { styled } from "../theme";

const StyledRadioItem = styled(RadioGroupPrimitive.Item, {
  all: "unset",
  backgroundColor: "white",
  border: "2px solid $yellowBrand",
  display: "flex",
  justifyContent: "center",
  py: "$space$8",
  px: "$space$8",
  borderRadius: "$radii$base",

  variants: {
    checked: {
      true: {
        backgroundColor: "$yellowBrand",
      },
    },
    size: {
      sm: {
        width: "$sizes$sm",
      },
      base: {
        width: "$sizes$base",
      },
      lg: {
        width: "$sizes$lg",
      },
    },
  },
});

const Flex = styled("div", { display: "flex" });

export interface OptionProps {
  value: string;
  label: string;
}

interface RadioGroupProps {
  value: string;
  height?: string;
  width?: string;
  onChange: (v: string) => void;
  options: OptionProps[];
}

export const RadioGroup = ({
  options,
  onChange,
  value,
  height,
  width,
}: RadioGroupProps) => {
  //   const [value, setValue] = React.useState<string>("Low");
  return (
    <RadioGroupPrimitive.Root value={value} onValueChange={(v) => onChange(v)}>
      {options.map((option) => (
        <Flex
          css={{ margin: "10px 0", alignItems: "center" }}
          key={option.value}
        >
          <StyledRadioItem
            checked={option.value === value}
            value={option.value}
            id={option.label}
            css={{ width, height }}
          >
            {option.label}
          </StyledRadioItem>
        </Flex>
      ))}
    </RadioGroupPrimitive.Root>
  );
};
