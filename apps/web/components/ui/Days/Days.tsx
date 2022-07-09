import {
  MultiSelect,
  MultiSelectProps,
  Box,
  CloseButton,
  SelectItemProps,
  MultiSelectValueProps,
} from "@mantine/core";
import { forwardRef } from "react";

const DaysData = [
  { label: "Monday", value: "Mon" },
  { label: "Tuesday", value: "Tue" },
  { label: "Wednesday", value: "Wed" },
  { label: "Thursday", value: "Thu" },
  { label: "Friday", value: "Fri" },
  { label: "Saturday", value: "Sat" },
  { label: "Sunday", value: "Sun" },
];

const flags = {
  /* Record with flag icon components */
};

export function DayValue({
  value,
  label,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string }) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

export const Item = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, value, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <Box mr={10}></Box> */}
          <div>{label}</div>
        </Box>
      </div>
    );
  }
);

Item.displayName = "Item";

export const MultiSelectDays = (props: Partial<MultiSelectProps>) => {
  return (
    <MultiSelect
      data={DaysData}
      limit={20}
      valueComponent={DayValue}
      itemComponent={Item}
      searchable
      defaultValue={["Mon", "Tue"]}
      placeholder="Pick playing days"
      {...props}
    />
  );
};
