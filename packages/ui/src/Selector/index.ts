export { Selector } from "./Selector";
export { AsyncSelector } from "./AsyncSelector";
export { CreatableSelector } from "./CreatableSelector";
import {
  ContainerProps,
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
} from "react-select";
import { theme } from "../theme";

export const selectorStyles:
  | StylesConfig<unknown, boolean, GroupBase<unknown>>
  | undefined = {
  container: (
    baseStyles: CSSObjectWithLabel,
    state: ContainerProps<unknown, boolean, GroupBase<unknown>>
  ) => ({
    ...baseStyles,
    borderRadius: theme.radii.md.value,
    border: `1px solid ${theme.colors.yellowBrand.value}`,
    color: `${theme.colors.loContrast}`,
    // backgroundOrigin: "border-box",
    // backgroundClip: "padding-box, border-box",
    // backgroundImage: `linear-gradient(${theme.colors.whiteA1.value}, ${theme.colors.whiteA1.value}),linear-gradient(${theme.colors.yellowBrand.value}, ${theme.colors.orangeBrand.value})`,
    fontSize: theme.fontSizes.base.value,
  }),
  control: (
    baseStyles: CSSObjectWithLabel,
    state: ContainerProps<unknown, boolean, GroupBase<unknown>>
  ) => ({
    ...baseStyles,

    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    ":hover": {
      border: "none",
    },
    ":active": {
      border: "none",
    },
  }),
  input: (provided: CSSObjectWithLabel) => ({ ...provided, color: "#fff" }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: `1px solid ${theme.colors.yellowBrand.value}`,
    boxShadow: "none",
    backgroundColor: "#0D0A00",
  }),
  option: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: "#0D0A00",
    ":hover": {
      border: "none",
    },
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: `${theme.colors.loContrast}`,
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: `${theme.colors.loContrast}`,
  }),

  indicatorSeparator: (provided: CSSObjectWithLabel) => {
    return {
      ...provided,
      backgroundColor: "transparent",
    };
  },
  indicatorsContainer: (provided: CSSObjectWithLabel) => {
    return {
      ...provided,
      paddingRight: theme.space[4].value,
    };
  },
};
