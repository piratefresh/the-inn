import { GroupBase } from "react-select";
import AsyncSelect, { AsyncProps } from "react-select/async";
import { selectorStyles } from ".";
import { DropdownIndicator } from "./DropdownIndicator";

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = AsyncProps<Option, IsMulti, Group> & {
  label?: string;
  id?: string;
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
      styles={selectorStyles}
      loadOptions={loadOptions}
      isClearable
      onChange={onChange}
      noOptionsMessage={() => null}
      {...props}
    />
  );
};
