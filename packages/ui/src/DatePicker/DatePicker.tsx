import * as Popover from "@radix-ui/react-popover";
import {
  CalendarIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { useDatePicker } from "@react-aria/datepicker";
import { useDatePickerState } from "@react-stately/datepicker";
import { useRef } from "react";
import { AriaDatePickerProps, I18nProvider, useLocale } from "react-aria";
import { Calendar } from "./Calendar";
import { DateField, StyledField } from "./DateField";

type DatePickerProps = AriaDatePickerProps<DateValue> & {
  variant: "simple" | "with-trigger";
  name?: string;
  value?: Date;
};

export function DatePicker({
  variant,
  errorMessage,
  minValue,
  ...props
}: DatePickerProps) {
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: true,
  });
  const ref = useRef(null);
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    errorMessageProps,
  } = useDatePicker(
    {
      ...props,
      minValue: today(getLocalTimeZone()),
    },
    state,
    ref
  );

  const { locale } = useLocale();

  const onFieldClick = () => {
    state.setOpen(true);
  };

  const hasTrigger = variant === "with-trigger";

  return (
    <I18nProvider locale={locale}>
      <Popover.Root
        {...dialogProps}
        open={state.isOpen}
        onOpenChange={(open) => state.setOpen(open)}
        modal={true}
      >
        <Popover.Trigger className="relative" {...groupProps} ref={ref}>
          <Popover.Anchor className="relative inline-block">
            <StyledField
              onClick={onFieldClick}
              className={`bg-white text-black group inline-flex items-center rounded-md px-4`}
            >
              {!hasTrigger && (
                <CalendarIcon className=" mr-1 h-5 w-5 text-black" />
              )}
              <DateField name={props.name} {...fieldProps} />
              {state.validationState === "invalid" && (
                <ExclamationCircleIcon className="w-6 h-6 text-red-500 absolute right-1" />
              )}
            </StyledField>
          </Popover.Anchor>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            alignOffset={50}
            className="bg-white rounded-md p-4 relative z-10"
          >
            <Calendar {...calendarProps} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </I18nProvider>
  );
}
