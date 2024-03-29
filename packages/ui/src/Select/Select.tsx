import { Listbox as ListboxPrimitive } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React from "react";
import { styled, theme } from "../theme";

const StyledRoot = styled("div", {
  position: "relative",
});

const StyledButton = styled(ListboxPrimitive.Button, {
  all: "reset",
  position: "relative",
  color: "$loContrast",
  border: "1px solid $yellowBrand",
  backgroundColor: "transparent",
  padding: "$space$4",
  width: "100%",
  borderRadius: "$radii$md",
  display: "flex",
  justifyContent: "flex-start",
  fontSize: theme.fontSizes.base.value,
  minHeight: "38px",

  variants: {
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "1px solid $yellowBrand",
        // backgroundOrigin: "border-box",
        // backgroundClip: "padding-box, border-box",
        // backgroundImage:
        //   "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});
const StyledOptions = styled(ListboxPrimitive.Options, {
  position: "absolute",
  width: "100%",
  paddingLeft: 0,
  marginTop: "$space$4",
  listStyle: "none",
  borderRadius: "$radii$md",
  border: "1px solid $yellowBrand",
  borderTop: "none",
  backgroundColor: "transparent",
  padding: "$space$4",
  maxHeight: "$sizes$5xl",
  zIndex: "$zIndices$dropdown",
  fontSize: theme.fontSizes.base.value,
  color: "$slate1",

  variants: {
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "1px solid $yellowBrand",
        backgroundColor: "#0d0a00",
        // backgroundOrigin: "border-box",
        // backgroundClip: "padding-box, border-box",
        // backgroundImage:
        //   "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});
const StyledOption = styled(ListboxPrimitive.Option, {
  cursor: "pointer",

  "&::disabled": {
    backgroundColor: "$hiContrast",
  },
  "&::hover": {
    backgroundColor: "$yellowBrand",
    color: "$loContrast",
  },
});

const StyledItem = styled("div", {
  py: "$space$2",
  px: "$space$4",
  variants: {
    active: {
      true: {
        backgroundColor: "$yellowBrand",
        color: "$loContrast",
      },
    },
    disabled: {
      true: {
        textDecoration: "line-through",
        cursor: "auto",
      },
    },
  },
});

const StyledTitle = styled("span", {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "block",
  paddingRight: "$space$10",
});

const StyledIcon = styled("span", {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  paddingRight: "$space$4",
});

export interface SelectOption {
  value: any;
  name: string;
  unavailable?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
  selected: SelectOption;
  className?: string;
  style?: React.CSSProperties;
  isDisabled?: boolean;
  placeholder?: string;
  error?: boolean;
}

export const Select = ({
  options,
  onChange,
  selected,
  isDisabled,
  error,
  ...props
}: SelectProps) => {
  return (
    <ListboxPrimitive
      value={selected}
      onChange={onChange}
      disabled={isDisabled}
      {...props}
    >
      {({ open }) => (
        <StyledRoot>
          {/*  @ts-ignore */}
          <StyledButton gold error={error}>
            <StyledTitle>{selected.name}</StyledTitle>
            <StyledIcon>
              {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </StyledIcon>
          </StyledButton>
          {/*  @ts-ignore */}
          <StyledOptions gold error={error}>
            {options.map((option) => (
              // @ts-ignore
              <StyledOption
                key={option.value}
                value={option}
                disabled={option.unavailable}
              >
                {({ active, selected }: { active: any; selected: any }) => (
                  <StyledItem active={active} disabled={option.unavailable}>
                    {option.name}
                  </StyledItem>
                )}
              </StyledOption>
            ))}
          </StyledOptions>
        </StyledRoot>
      )}
    </ListboxPrimitive>
  );
};
