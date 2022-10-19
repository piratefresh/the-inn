import { useRef } from "react";
import { useDatePickerState, DatePickerState } from "@react-stately/datepicker";
import { useDatePicker } from "@react-aria/datepicker";

export const DatePicker = () => {
  let state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: false,
  });
  let ref = useRef();
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  return <div>date pcierk</div>;
};
