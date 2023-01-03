import { useUncontrolled } from "@mantine/hooks";

export interface ChipProps {
  /** Chip radius from theme or number to set value in px */
  radius?: string;

  /** Predefined chip size */
  size?: string;

  /** Chip input type */
  type?: "radio" | "checkbox";

  /** Controls chip appearance, defaults to filled with dark theme and to outline in light theme */
  variant?: "outline" | "filled";

  /** Chip label */
  children: React.ReactNode;

  /** Checked state for controlled component */
  checked?: boolean;

  /** Default value for uncontrolled component */
  defaultChecked?: boolean;

  /** Calls when checked state changes */
  onChange?(checked: boolean): void;

  /** Active color from theme, defaults to theme.primaryColor */
  color?: string;

  /** Static id to bind input with label */
  id?: string;

  /** Static selector base */
  __staticSelector?: string;

  /** Props spread to wrapper element */
  wrapperProps?: { [key: string]: any };
}

export const Chips = ({
  radius,
  type,
  size,
  variant,
  disabled,
  __staticSelector,
  id,
  color,
  children,
  className,
  classNames,
  style,
  styles,
  checked,
  defaultChecked,
  onChange,
}) => {
  const [value, setValue] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
    // fix later
    // @ts-ignore
    rule: (val) => typeof val === "boolean",
  });

  return (
    <input id={id}>
      <label htmlFor={id}></label>
    </input>
  );
};
