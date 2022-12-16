import { KeyboardEventHandler, useState } from "react";
import { theme } from "../theme";
import { v4 as uuidv4 } from "uuid";
import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
  id: uuidv4(),
});

const colourStyles: StylesConfig<String, true> = {
  control: (styles) => ({
    ...styles,
    height: 42,
    borderRadius: 6,
    cursor: "pointer",
    border: "3px solid transparent",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    backgroundImage: `linear-gradient(#fcfcfc, #fcfcfc),
      linear-gradient(#ffd166, #9f5e25)`,
    boxShadow: "none",
    ":hover": {
      borderColor: "transparent",
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
            ? [...value, createOption(inputValue)]
            : [createOption(inputValue)]
        );

        event.preventDefault();
    }
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
      placeholder=""
      value={value}
      styles={colourStyles}
    />
  );
};
