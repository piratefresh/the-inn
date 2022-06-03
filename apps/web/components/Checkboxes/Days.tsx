import React from "react";
import { CheckBox } from "@components/ui/CheckBox";
import InputGroup from "@components/ui/InputGroup";
import { useController } from "react-hook-form";

export const CheckBoxes = ({
  options,
  control,
  name,
  size = "medium",
  type = "primary",
  direction = "column",
  color = "white",
}) => {
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = React.useState(field.value || []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    console.log("e.target: ", e.target);
    const valueCopy = [...value];

    // update checkbox value
    valueCopy[index] = e.target.checked ? e.target.value : "";

    // send data to react hook form
    field.onChange(valueCopy);
    field.value.filter((x) => x);
    // update local state
    setValue(valueCopy);
  };

  const classes =
    type === "primary"
      ? "items-center flex-inline"
      : "items-center flex-inline bg-white font-b rounded-md mr-4 p-4 border border-Brandblue";
  return (
    <>
      {options.map((option, index) => (
        <InputGroup
          direction={direction}
          inline
          color={color}
          className={classes}
          label={option}
          key={option}
        >
          <CheckBox
            className="bg-gray-400"
            onChange={(e) => onChange(e, index)}
            key={option}
            label={option}
            checked={value.includes(option)}
            value={option}
            size={size}
          />
        </InputGroup>
      ))}
    </>
  );
};
