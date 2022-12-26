import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { AriaButtonProps } from "@react-aria/button";

import React from "react";
import { Header } from "../Typography";
import { CalendarButton } from "./CalendarButton";
import { MonthNavigationButton } from "./MonthNavigationButton";

type CalendarHeaderProps = {
  title: string;
  previousButtonProps: AriaButtonProps<"button">;
  nextButtonProps: AriaButtonProps<"button">;
};
export function CalendarHeader({
  title,
  previousButtonProps,
  nextButtonProps,
}: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <CalendarButton {...previousButtonProps}>
        <ArrowLeftIcon className="h-5 w-5" />
      </CalendarButton>
      <Header size="sm" weight="bold" color="hiContrast">
        {capitalize(title)}
      </Header>
      <CalendarButton {...nextButtonProps}>
        <ArrowRightIcon className="h-5 w-5" />
      </CalendarButton>
    </div>
  );
}

const capitalize = (str: string = "") =>
  str.charAt(0).toUpperCase() + str.slice(1);
