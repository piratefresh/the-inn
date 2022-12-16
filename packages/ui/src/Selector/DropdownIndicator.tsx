import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export interface DropdownIndicator {
  selectProps: {
    menuIsOpen: boolean;
  };
}

export const DropdownIndicator = (props: DropdownIndicator) => {
  const { menuIsOpen } = props.selectProps;
  return menuIsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />;
};
