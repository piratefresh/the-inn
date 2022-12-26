import React from "react";
import { CreatableSelector } from "ui/src/Selector";
import GAMES from "./games.json";

export interface CreatableGameSelectorOption {
  readonly label: string;
  readonly value: string;
}

interface CreatableGameSelectorProps {
  onChange: (v: CreatableGameSelectorOption) => void;
  value: CreatableGameSelectorOption | null;
  className?: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

export const CreatableGameSelector = ({
  className,
  onChange,
  value,
}: CreatableGameSelectorProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState(GAMES);

  const handleCreate = (inputValue: string) => {
    if (inputValue) {
      setIsLoading(true);
      setTimeout(() => {
        const newOption = createOption(inputValue);
        setIsLoading(false);
        setOptions((prev) => [...prev, newOption]);
        onChange(newOption);
      }, 1000);
    }
  };

  return (
    <CreatableSelector
      className={className}
      isDisabled={isLoading}
      isLoading={isLoading}
      options={options}
      onChange={onChange}
      onCreateOption={handleCreate}
      value={value}
    />
  );
};
