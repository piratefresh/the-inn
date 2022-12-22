import { useRef } from "react";
import {
  useDatePickerState,
  DatePickerStateOptions,
} from "@react-stately/datepicker";
import { useDatePicker } from "@react-aria/datepicker";
import {
  CalendarIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { DateField } from "./DateField";
import { FieldButton } from "./FieldButton";

import { Dialog } from "@radix-ui/react-dialog";
import { Calendar } from "./Calender";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { formatISO } from "date-fns";
import React from "react";
import { Popover } from "./Popover";

export interface DatePickerProps extends Omit<DatePickerStateOptions, "value"> {
  onClick?: () => void;
  value?: Date;
}

export const DatePicker = ({
  label,
  minValue,
  onClick,
  ...props
}: DatePickerProps) => {
  const value = React.useMemo(() => {
    if (!props.value) return undefined;

    return parseDate(
      formatISO(new Date(props.value), { representation: "date" })
    );
  }, [props.value]);

  let state = useDatePickerState({
    ...props,
    value,
  });

  let ref = useRef(null);
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(
    {
      label,
      minValue: minValue ?? today(getLocalTimeZone()),
    },
    state,
    ref
  );

  const handleFieldClick = () => {
    state.setOpen(true);
  };

  return (
    <div className="relative inline-flex flex-col text-left">
      <span {...labelProps} className="text-sm text-gray-800">
        {label}
      </span>
      <div
        {...groupProps}
        onClick={handleFieldClick}
        ref={ref}
        className="flex group"
      >
        <div className="bg-white border border-r-0 border-brandYellow group-hover:border-yellow-400 transition-colors rounded-l-md pr-10 group-focus-within:border-brandYellow group-focus-within:group-hover:border-brandYellow p-1 relative flex items-center">
          <DateField {...fieldProps} />
          {state.validationState === "invalid" && (
            <ExclamationCircleIcon className="w-6 h-6 text-red-500 absolute right-1" />
          )}
        </div>
        {/* <FieldButton {...buttonProps}>
          <CalendarIcon className="w-5 h-5 text-gray-700" />
        </FieldButton> */}
      </div>
      {state.isOpen && (
        <Popover
          {...dialogProps}
          state={state}
          triggerRef={ref}
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
        >
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
};
