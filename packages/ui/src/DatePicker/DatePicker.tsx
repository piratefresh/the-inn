import { useRef } from "react";
import {
  useDatePickerState,
  DatePickerStateOptions,
} from "@react-stately/datepicker";
import { useDatePicker } from "@react-aria/datepicker";

export const DatePicker = (props: DatePickerStateOptions) => {
  let state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: false,
  });
  let ref = useRef(null);
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  return <div>date picker</div>;
};
