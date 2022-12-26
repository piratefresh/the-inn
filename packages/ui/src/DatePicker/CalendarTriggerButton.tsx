import { CalendarIcon } from "@heroicons/react/24/outline";
import { CalendarOutline24Icon } from "@vygruppen/spor-icon-react";
import React from "react";
import { AriaButtonProps, useButton } from "react-aria";
import { Button } from "../Button";

type CalendarTriggerButtonProps = AriaButtonProps<"button">;
export const CalendarTriggerButton = (props: CalendarTriggerButtonProps) => {
  const ref = React.useRef(null);
  const { buttonProps } = useButton(props, ref);
  return (
    <Button ref={ref} {...(buttonProps as any)}>
      <CalendarIcon />
    </Button>
  );
};
