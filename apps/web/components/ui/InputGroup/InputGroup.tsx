import { FieldError } from "react-hook-form";
import InputStyles from "./InputGroup.module.css";

interface IInputGroupProps {
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  label: string;
  htmlFor?: string;
  direction?: "row" | "column" | "row-reverse";
  inline?: boolean;
  error?: FieldError | undefined;
}

const InputGroup = ({
  className,
  labelClassName,
  direction,
  color = "white",
  label,
  style,
  children,
  inline = false,
  error,
}: IInputGroupProps) => {
  let classes = [InputStyles["mgui-input-group"]];
  let labelClasses = [InputStyles["mgui-input-label"]];
  if (className) {
    classes.push(className);
  }

  if (direction === "row") {
    classes.push(InputStyles["mgui-input-group-row"]);
  }
  if (direction === "row-reverse") {
    classes.push(InputStyles["mgui-input-group-row-reverse"]);
  }
  if (inline) {
    classes.push(InputStyles["mgui-input-group-inline"]);
  }
  if (labelClassName) {
    labelClasses.push(labelClassName);
  }
  if (color) {
    labelClasses.push(`text-${color}`);
  }
  if (error) {
    labelClasses.push("text-red-800");
  }
  return (
    <div className={classes.join(" ")} style={style}>
      <label className={labelClasses.join(" ")}>{label}</label>
      {children}
    </div>
  );
};

export default InputGroup;
