import { DefaultProps, Selectors } from "@mantine/styles";
import { useUncontrolled } from "@mantine/hooks";
import { Box } from "@mantine/core";

export interface ChipProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithoutRef<"input">, "size" | "onChange"> {
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

export const Chip = ({
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
  ...props
}: ChipProps) => {
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
    <Box>
      <input
        className="border border-yellow-400"
        type={type}
        checked={value}
        onChange={(event) => setValue(event.currentTarget.checked)}
        id={id}
        {...props}
      >
        <label htmlFor={id}>
          {value}
          {children}
        </label>
      </input>
    </Box>
  );
};
