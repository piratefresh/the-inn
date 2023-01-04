import React from "react";
import { styled } from "../../theme";
import { sizes } from "../../theme/foundation/sizes";
import { ChipGroupProvider } from "./ChipGroup.context";
import { useUncontrolled } from "../../hooks/useUncontrolled";

export type GroupPosition = "right" | "center" | "left" | "apart";

export const GROUP_POSITIONS = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  apart: "space-between",
};

const StyledGroup = styled("div", {
  display: "flex",
  flexDirection: "row",
  variants: {
    position: {
      left: {
        justifyContent: GROUP_POSITIONS.left,
      },
      right: {
        justifyContent: GROUP_POSITIONS.right,
      },
      center: {
        justifyContent: GROUP_POSITIONS.center,
      },
      apart: {
        justifyContent: GROUP_POSITIONS.apart,
      },
    },
  },
});

export interface ChipGroupProps<T extends boolean = false | true> {
  /** Key of theme.spacing or number to set gap in px */
  spacing?: typeof sizes.sizes;

  /** Allow multiple values to be selected at a time */
  multiple?: T;

  /** Controlled component value */
  value?: T extends true ? string[] : string | string[];

  /** Uncontrolled component initial value */
  defaultValue?: T extends true ? string[] : string;

  /** Called when value changes */
  onChange?(
    value: T extends true ? string[] : string | React.SetStateAction<string[]>
  ): void;

  /** Direction */
  direction?: "horizontal" | "vertical";

  /** Called when value changes */
  noWrap?: boolean;

  /** Defines justify-content property */
  position?: GroupPosition;

  /** <Chip /> components */
  children?: React.ReactNode;
}

export const ChipGroup = ({
  value,
  defaultValue,
  onChange,
  spacing,
  position,
  multiple,
  children,
  ...others
}: ChipGroupProps) => {
  const [_value, setValue] = useUncontrolled<string | string[]>({
    value,
    defaultValue,
    finalValue: [],
    onChange,
  });

  const isChipSelected = (val: string) =>
    Array.isArray(_value) ? _value.includes(val) : val === _value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;

    if (Array.isArray(_value)) {
      setValue(
        _value.includes(val)
          ? _value.filter((v) => v !== val)
          : [..._value, val]
      );
    } else {
      setValue(val);
    }
  };
  return (
    <ChipGroupProvider
      value={{ isChipSelected, onChange: handleChange, multiple }}
    >
      <StyledGroup
        position={position}
        css={{
          gap: "$12",
        }}
        {...others}
      >
        {children}
      </StyledGroup>
    </ChipGroupProvider>
  );
};
