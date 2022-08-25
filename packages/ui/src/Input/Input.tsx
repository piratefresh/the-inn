import { StyledInput } from "./StyledInput";

interface IInputProps
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
}

export const Input = ({ gold, size = "medium", ...props }: IInputProps) => {
  return <StyledInput gold={gold} size={size} {...props} />;
};
