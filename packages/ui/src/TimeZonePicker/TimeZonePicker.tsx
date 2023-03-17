import TimezoneSelect, { allTimezones } from "react-timezone-select";
import type { ITimezone, ITimezoneOption, Props } from "react-timezone-select";
import { styled, theme } from "../theme";
import { DropdownIndicator } from "../Selector/DropdownIndicator";
import { selectorStyles } from "../Selector";

export interface ITimeZonePicker extends Props {
  onChange: (v: ITimezone) => void;
  value: ITimezone;
}

const StyledSelect = styled(TimezoneSelect, {});

export const TimeZonePicker = ({ ...props }: ITimeZonePicker) => {
  return (
    <StyledSelect
      components={{ DropdownIndicator }}
      styles={selectorStyles}
      {...props}
    />
  );
};

export { ITimezone, ITimezoneOption, allTimezones };
