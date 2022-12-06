import React from "react";
import Select, { GroupBase, Props } from "react-select";

// interface SelectorProps extends AsyncProps {

// }

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group> & {
  label?: string;
  id?: string;
};

export const Selector = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  placeholder,
  name,
  onChange,
  ...props
}: SelectProps<Option, IsMulti, Group>) => {
  return (
    <Select
      placeholder={placeholder}
      name={name}
      className="basic-multi-select"
      classNamePrefix="select"
      isClearable
      onChange={onChange}
      noOptionsMessage={() => null}
      {...props}
    />
  );
};
