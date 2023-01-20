import { StyledInput } from "./StyledInput";

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  error?: string;
  inputRef?: string;
  name?: string;
  register?: any;
  children?: React.ReactNode;
  // Variants
  size?: "small" | "medium" | "large";
  iconPlacement?: "left" | "right" | "none";
  gold?: boolean;
}

export const Input = ({
  gold,
  size = "medium",
  iconPlacement = "none",
  error,
  ...props
}: IInputProps) => {
  return (
    <StyledInput
      gold={gold}
      size={size}
      errorStyle={!!error}
      iconPlacement={iconPlacement}
      {...props}
    />
  );
};
