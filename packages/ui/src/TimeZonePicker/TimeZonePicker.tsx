import TimezoneSelect, { allTimezones } from "react-timezone-select";
import type { ITimezone, ITimezoneOption, Props } from "react-timezone-select";
import { styled, theme } from "../theme";
import { DropdownIndicator } from "../Selector/DropdownIndicator";

export interface ITimeZonePicker extends Props {
  onChange: (v: ITimezone) => void;
  value: ITimezone;
}

const StyledSelect = styled(TimezoneSelect, {});

export const TimeZonePicker = ({ ...props }: ITimeZonePicker) => {
  return (
    <StyledSelect
      components={{ DropdownIndicator }}
      styles={{
        container: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: theme.radii.md.value,
          border: "3px solid transparent",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          backgroundImage: `linear-gradient(${theme.colors.whiteA1.value}, ${theme.colors.whiteA1.value}),linear-gradient(${theme.colors.yellowBrand.value}, ${theme.colors.orangeBrand.value})`,
          fontSize: theme.fontSizes.base.value,
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "none",
          boxShadow: "none",
          ":hover": {
            border: "none",
          },
          ":active": {
            border: "none",
          },
        }),
        indicatorSeparator: (provided) => {
          return {
            ...provided,
            backgroundColor: "transparent",
          };
        },
        indicatorsContainer: (provided) => {
          return {
            ...provided,
            paddingRight: theme.space[4].value,
          };
        },
      }}
      {...props}
    />
  );
};

export { ITimezone, ITimezoneOption, allTimezones };
