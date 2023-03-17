import { KeyboardEventHandler, useState } from "react";
import { theme } from "../theme";
import { v4 as uuidv4 } from "uuid";
import CreatableSelect from "react-select/creatable";
import { OnChangeValue, StylesConfig } from "react-select";

const components = {
  DropdownIndicator: null,
};

interface IOptionType {
  label: string;
  value: string;
  id: string;
}

const createOption = (label: string): IOptionType => ({
  label,
  value: label,
  id: uuidv4(),
});

export function getUniqueListBy(
  arr: Record<string, string>[],
  key: string
): Record<string, string>[] {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

const colourStyles: StylesConfig<String, true> = {
  control: (styles) => ({
    ...styles,

    borderRadius: 6,
    cursor: "pointer",
    border: "1px solid #FFD166",
    backgroundColor: "transparent",
    boxShadow: "none",
    ":hover": {
      borderColor: "#FFD166",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,

      color: isDisabled ? "#ccc" : isSelected ? "white" : "black",
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? (isSelected ? "red" : "blue") : "purple",
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: theme.colors.yellowBrand.toString(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#000",
    borderRadius: 6,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    ":hover": {
      color: "#000",
    },
  }),
};

export interface MultiSelectProps {
  onChange: (e: any) => void;
  value: any;
  ref?: any;
}

export const MultiSelect = ({ onChange, value, ref }: MultiSelectProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
      case "Comma":
        setInputValue("");
        onChange(
          value
            ? getUniqueListBy([...value, createOption(inputValue)], "value")
            : [createOption(inputValue)]
        );

        event.preventDefault();
    }
  };

  /** Allow creating a new option with a different casing. */
  const isValidNewOption = (
    inputValue: string,
    selectValue: OnChangeValue<IOptionType, true>
  ): boolean => {
    return (
      !!inputValue &&
      selectValue.some(
        ({ value }) => value.toLowerCase() === inputValue.toLowerCase()
      )
    );
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={onChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      isValidNewOption={isValidNewOption}
      placeholder=""
      value={value}
      styles={colourStyles}
    />
  );
};
