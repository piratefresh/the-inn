import { CheckCircleIcon } from "@heroicons/react/24/outline";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";

export const DropdownMenuRoot = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuPortal = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <DropdownMenuPrimitive.Portal className="dropdown-trigger">
    {children}
  </DropdownMenuPrimitive.Portal>
);

type DropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive["Content"]
>;
export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content {...props} ref={forwardedRef}>
        {children}
        <DropdownMenuPrimitive.Arrow />
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});

type DropdownMenuCheckboxItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive["CheckboxItem"]
>;
export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem {...props} ref={forwardedRef}>
      {children}
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckCircleIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuItem = DropdownMenuPrimitive.Item;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;

export const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuRadioItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.RadioItem {...props} ref={forwardedRef}>
      {children}
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckCircleIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.RadioItem>
  );
});

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
DropdownMenuContent.displayName = "DropdownMenuContent";
