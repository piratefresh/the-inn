import { GroupBase } from "react-select";
import CreatableSelect, { CreatableProps } from "react-select/creatable";
import { theme } from "../theme";
import { DropdownIndicator } from "./DropdownIndicator";

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = CreatableProps<Option, IsMulti, Group> & {
  label?: string;
  id?: string;
};

export const CreatableSelector = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  placeholder,
  name,
  onCreateOption,
  onChange,
  ...props
}: SelectProps<Option, IsMulti, Group>) => {
  return (
    <CreatableSelect
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
      isClearable
      onChange={onChange}
      onCreateOption={onCreateOption}
      noOptionsMessage={() => null}
      {...props}
    />
  );
};
