import React from "react";
import { Text } from "@mantine/core";
import InputStyles from "./Input.module.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  error?: string;
  inputRef?: string;
  name?: string;
  register?: any;
  children?: React.ReactNode;
  gold?: boolean;
}
interface ITextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  error?: string;
  inputRef?: string;
  name?: string;
  cols?: number;
  rows?: number;
  gold?: boolean;
}

export const Input = ({
  required = false,
  className,
  style,
  disabled,
  error,
  inputRef,
  type,
  name,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  placeholder,
  register,
  gold,
  id,
  ...props
}: IInputProps) => {
  let classes = [InputStyles["root"]];
  if (className) {
    classes.push(className);
  }
  if (type === "file") {
    classes.push(InputStyles["input-file"]);
  }

  return (
    <input
      className={classes.join(" ")}
      id={id}
      name={name}
      onChange={onChange ? (event) => onChange(event) : undefined}
      onFocus={onFocus ? (event) => onFocus(event) : undefined}
      onBlur={onBlur ? (event) => onBlur(event) : undefined}
      onKeyDown={onKeyDown ? (event) => onKeyDown(event) : undefined}
      placeholder={placeholder}
      type={type}
      required={required}
      style={style}
      {...props}
    />
  );
};

const TextArea = ({
  required = false,
  className,
  style,
  disabled,
  error,
  inputRef,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  placeholder,
  id,
  name,
  value,
  cols = 100,
  rows = 6,
}: ITextAreaProps) => {
  let classes = [InputStyles["root"]];
  if (className) {
    classes.push(className);
  }
  return (
    <textarea
      className={classes.join(" ")}
      cols={cols}
      required={required}
      rows={rows}
      id={id}
      name={name}
      defaultValue={value}
      onChange={onChange ? (event) => onChange(event) : undefined}
      onFocus={onFocus ? (event) => onFocus(event) : undefined}
      onBlur={onBlur ? (event) => onBlur(event) : undefined}
      onKeyDown={onKeyDown ? (event) => onKeyDown(event) : undefined}
      placeholder={placeholder}
      style={style}
    />
  );
};

const InputFile = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      required = false,
      className,
      style,
      disabled,
      error,
      inputRef,
      type = "file",
      name,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      placeholder,
      register,
      id,
      children,
      ...props
    },
    ref
  ) => {
    let classes = [InputStyles["root"]];
    if (className) {
      classes.push(className);
    }
    if (type === "file") {
      classes.push(InputStyles["input-file"]);
    }

    return (
      <label
        htmlFor={name}
        className="w-full h-48 bg-white p-5 border-dashed border-2 border-blue-800 block cursor-pointer rounded-md"
      >
        <input
          className={classes.join(" ")}
          id={id}
          name={name}
          onChange={onChange ? (event) => onChange(event) : undefined}
          placeholder={placeholder}
          type={type}
          required={required}
          style={style}
          ref={ref}
          {...props}
        />
        <div className="grid content-center h-full w-full">{children}</div>
      </label>
    );
  }
);

InputFile.displayName = "InputFile";

Input.TextArea = TextArea;
Input.File = InputFile;
export default Input;
