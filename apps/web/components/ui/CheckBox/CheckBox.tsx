import React from "react";
import CheckboxStyles from "./CheckBox.module.css";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  afterLabel?: string;
  beforeLabel?: string;
  value?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  checked?: boolean;
  className?: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?(x: React.ChangeEvent<HTMLInputElement>): void;
  onFocus?(x: React.FocusEvent<HTMLInputElement>): void;
  onBlur?(x: React.FocusEvent<HTMLInputElement>): void;
  size?: "tiny" | "small" | "medium" | "large" | "xlarge";
}

export function CheckBox({
  className,
  id,
  label,
  afterLabel,
  beforeLabel,
  description,
  name,
  checked,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  size = "medium",
  ref,
  ...props
}: InputProps) {
  let classes = [CheckboxStyles["mgui-checkbox"]];
  if (className) {
    classes.push(className);
  }
  if (size) {
    classes.push(CheckboxStyles[`mgui-checkbox-container--${size}`]);
  }
  const inputName = name;
  // if id does not exist, use label
  const markupId = id
    ? id
    : label
        .toLowerCase()
        .replace(/^[^A-Z0-9]+/gi, "")
        .replace(/ /g, "-");

  // if name does not exist on Radio then use Context Name from Radio.Group
  // if that fails, use the id
  const markupName = inputName ? inputName : name ? name : markupId;

  // check if checkbox checked is true or false
  // if neither true or false the checkbox will rely on native control
  const active = checked ?? undefined;
  return (
    <input
      id={markupId}
      name={markupName}
      type="checkbox"
      className={classes.join(" ")}
      onChange={onChange}
      onFocus={onFocus ? (event) => onFocus(event) : undefined}
      onBlur={onBlur ? (event) => onBlur(event) : undefined}
      checked={active}
      disabled={disabled}
      value={value}
      {...props}
    />
  );
}
