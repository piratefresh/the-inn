import { GroupBase } from "react-select";
import CreatableSelect, { CreatableProps } from "react-select/creatable";
import { selectorStyles } from ".";
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
      styles={selectorStyles}
      isClearable
      onChange={onChange}
      onCreateOption={onCreateOption}
      noOptionsMessage={() => null}
      {...props}
    />
  );
};
