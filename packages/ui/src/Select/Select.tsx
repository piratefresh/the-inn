import { Listbox as ListboxPrimitive } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React from "react";
import { styled } from "../theme";

const people = [
  { id: 1, name: "Dungeon and Dragons", unavailable: false },
  { id: 2, name: "Pathfinder", unavailable: false },
  { id: 3, name: "Star Wars FFG", unavailable: false },
  { id: 4, name: "Hero System", unavailable: true },
  { id: 5, name: "Shadowrun", unavailable: false },
];

const StyledButton = styled(ListboxPrimitive.Button, {
  position: "relative",
  all: "reset",
  border: "1px solid $yellowBrand",
  backgroundColor: "$loContrast",
  padding: "$space$4",
  width: "100%",
  borderRadius: "$radii$md",
  display: "flex",
  justifyContent: "flex-start",

  variants: {
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});
const StyledOptions = styled(ListboxPrimitive.Options, {
  paddingLeft: 0,
  marginTop: "$space$2",
  listStyle: "none",
  borderRadius: "$radii$md",
  border: "1px solid $yellowBrand",
  borderTop: "none",
  backgroundColor: "$loContrast",
  padding: "$space$4",

  variants: {
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
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

export const Select = () => {
  const [selectedPerson, setSelectedPerson] = React.useState(people[0]);
  return (
    <ListboxPrimitive value={selectedPerson} onChange={setSelectedPerson}>
      {({ open }) => (
        <>
          {/*  @ts-ignore */}
          <StyledButton gold>
            <StyledTitle>{selectedPerson.name}</StyledTitle>
            <StyledIcon>
              {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </StyledIcon>
          </StyledButton>
          {/*  @ts-ignore */}
          <StyledOptions gold>
            {people.map((person) => (
              // @ts-ignore
              <StyledOption
                key={person.id}
                value={person}
                disabled={person.unavailable}
              >
                {({ active, selected }) => (
                  <StyledItem active={active} disabled={person.unavailable}>
                    {person.name}
                  </StyledItem>
                )}
              </StyledOption>
            ))}
          </StyledOptions>
        </>
      )}
    </ListboxPrimitive>
  );
};
