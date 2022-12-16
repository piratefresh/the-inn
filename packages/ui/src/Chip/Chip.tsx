import React from "react";
import { styled } from "../theme";
import { useChipGroup } from "./ChipGroup/ChipGroup.context";
import { useId } from "web/hooks/useId";
import { ChipGroup } from "./ChipGroup";
import { useUncontrolled } from "web/hooks/useUncontrolled";

const StyledChip = styled("input", {
  width: 0,
  height: 0,
  padding: 0,
  opacity: 0,
  margin: 0,
});

const StyledLabel = styled("label", {
  all: "unset",
  boxSizing: "border-box",
  display: "inline-flex",
  backgroundColor: "$loContrast",
  borderRadius: "$radii$lg",
  padding: "$space$4 $space$10",

  variants: {
    checked: {
      true: {
        backgroundColor: "$yellowBrand",
        fontWeight: "bold",
      },
    },
  },
});

export interface ChipProps
  extends Omit<React.ComponentPropsWithRef<"input">, "size" | "onChange"> {
  /** Chip label */
  children: React.ReactNode;

  /** Checked state for controlled component */
  checked?: boolean;

  /** Default value for uncontrolled component */
  defaultChecked?: boolean;

  /** Calls when checked state changes */
  onChange?(checked: boolean): void;
}

const Chip = React.forwardRef<HTMLInputElement, ChipProps>(
  (
    {
      checked,
      disabled,
      value,
      children,
      id,
      defaultChecked,
      onChange,
      style,
      type = "checkbox",
      ...rest
    },
    ref
  ) => {
    const [_value, setValue] = useUncontrolled({
      value: checked,
      defaultValue: defaultChecked,
      finalValue: false,
      onChange,
    });

    const ctx = useChipGroup();
    const uuid = useId(id);

    const contextProps = ctx
      ? {
          checked: ctx.isChipSelected(value as string),
          onChange: ctx.onChange,
          type: ctx.multiple ? "checkbox" : "radio",
        }
      : {};

    const _checked = contextProps.checked || _value;

    return (
      <div>
        <StyledChip
          id={uuid}
          type={type}
          checked={_checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.checked);
          }}
          disabled={disabled}
          ref={ref}
          value={value}
          {...contextProps}
          {...rest}
        />
        <StyledLabel
          htmlFor={uuid}
          checked={_checked}
          data-checked={_checked || undefined}
          data-disabled={disabled || undefined}
        >
          {children}
        </StyledLabel>
      </div>
    );
  }
);

const Group = ChipGroup;

export { Chip, Group };
