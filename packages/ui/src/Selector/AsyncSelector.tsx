import React from "react";
import { GroupBase } from "react-select";
import AsyncSelect, { AsyncProps } from "react-select/async";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { theme } from "../theme";

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = AsyncProps<Option, IsMulti, Group> & {
  label?: string;
  id?: string;
};

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;
  return menuIsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />;
};

export const AsyncSelector = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  placeholder,
  name,
  loadOptions,
  onChange,
  ...props
}: SelectProps<Option, IsMulti, Group>) => {
  return (
    <AsyncSelect
      components={{ DropdownIndicator }}
      placeholder={placeholder}
      name={name}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={{
        container: (provided) => ({
          ...provided,
          borderRadius: theme.radii.md.value,
          border: "3px solid transparent",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          backgroundImage: `linear-gradient(${theme.colors.whiteA1.value}, ${theme.colors.whiteA1.value}),linear-gradient(${theme.colors.yellowBrand.value}, ${theme.colors.orangeBrand.value})`,
          fontSize: theme.fontSizes.base.value,
        }),
        control: (provided) => ({
          ...provided,
          border: "none",
          boxShadow: "none",
          ":hover": {
            border: "none",
          },
          ":active": {
            border: "none",
          },
        }),
        indicatorSeparator: (provided) => {
          return {
            ...provided,
            backgroundColor: "transparent",
          };
        },
        indicatorsContainer: (provided) => {
          return {
            ...provided,
            paddingRight: theme.space[4].value,
          };
        },
      }}
      loadOptions={loadOptions}
      isClearable
      onChange={onChange}
      noOptionsMessage={() => null}
      {...props}
    />
  );
};
