import { CaretDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { keyframes } from "@stitches/react";
import React, { forwardRef } from "react";
import { styled } from "../theme";

export { NavigationMenuPrimitive };

const enterFromRight = keyframes({
  from: { transform: "translateX(200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: "translateX(-200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(200px)", opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(-200px)", opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const itemStyles = {
  padding: "8px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: "inherit",
};

export const NavigationMenuRoot = styled(NavigationMenuPrimitive.Root, {
  position: "relative",
  display: "flex",
  width: "100vw",
  zIndex: 1,
});

export const NavigationMenuList = styled(NavigationMenuPrimitive.List, {
  display: "flex",
  justifyContent: "center",
  padding: 4,
  borderRadius: 6,
  listStyle: "none",
  //   boxShadow: `0 2px 10px ${blackA.blackA7}`,
  margin: 0,
});

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenuTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: "unset",
  backgroundColor: "transparent",
  display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  gap: 2,
});

export const NavigationMenuLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  display: "block",
  textDecoration: "none",
  fontSize: 15,
  lineHeight: 1,
});

export const NavigationMenuContent = styled(NavigationMenuPrimitive.Content, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  "@media only screen and (min-width: 600px)": { width: "auto" },
  animationDuration: "250ms",
  animationTimingFunction: "ease",
  '&[data-motion="from-start"]': { animationName: enterFromLeft },
  '&[data-motion="from-end"]': { animationName: enterFromRight },
  '&[data-motion="to-start"]': { animationName: exitToLeft },
  '&[data-motion="to-end"]': { animationName: exitToRight },
});

export const NavigationMenuSub = NavigationMenuPrimitive.Sub;

export const NavigationMenuIndicator = styled(
  NavigationMenuPrimitive.Indicator,
  {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 10,
    top: "100%",
    overflow: "hidden",
    zIndex: 1,
    transition: "width, transform 250ms ease",
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  }
);

export const NavigationMenuViewport = styled(NavigationMenuPrimitive.Viewport, {
  position: "relative",
  transformOrigin: "top center",
  marginTop: 10,
  width: "100vw",
  backgroundColor: "white",
  borderRadius: 6,
  overflow: "hidden",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  height: "var(--radix-navigation-menu-viewport-height)",
  transition: "width, height, 300ms ease",
  '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
  '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  "@media only screen and (min-width: 600px)": {
    width: "var(--radix-navigation-menu-viewport-width)",
  },
});

export const List = styled("ul", {
  display: "grid",
  width: "100%",
  backgroundColor: "$lightBlackBrand",
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: "none",
  variants: {
    layout: {
      one: {
        "@media only screen and (min-width: 600px)": {
          width: 500,
          gridTemplateColumns: ".75fr 1fr",
        },
      },
      two: {
        "@media only screen and (min-width: 600px)": {
          width: 600,
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(3, 1fr)",
        },
      },
    },
  },
  defaultVariants: {
    layout: "one",
  },
});

type NavigationMenuPrimitiveLinkProps = React.ComponentProps<
  typeof NavigationMenuPrimitive["Link"]
>;

interface ListItemProps extends NavigationMenuPrimitiveLinkProps {
  children?: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenuPrimitive.Link {...props} asChild>
        <ListItemLink ref={forwardedRef}>
          <ListItemHeading>{title}</ListItemHeading>
          <ListItemText>{children}</ListItemText>
        </ListItemLink>
      </NavigationMenuPrimitive.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";

export const ListItemLink = styled("a", {
  display: "block",
  outline: "none",
  textDecoration: "none",
  userSelect: "none",
  padding: 12,
  borderRadius: 6,
  fontSize: 15,
  lineHeight: 1,
  color: "white",
});

const ListItemHeading = styled("div", {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
});

const ListItemText = styled("p", {
  all: "unset",

  lineHeight: 1.4,
  fontWeight: "initial",
});

const Callout = styled("a", {
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column",
  width: "100%",
  height: "100%",

  borderRadius: 6,
  padding: 25,
  textDecoration: "none",
  outline: "none",
  userSelect: "none",
});

const CalloutHeading = styled("div", {
  color: "white",
  fontSize: 18,
  fontWeight: 500,
  lineHeight: 1.2,
  marginTop: 16,
  marginBottom: 7,
});

const CalloutText = styled("p", {
  all: "unset",

  fontSize: 14,
  lineHeight: 1.3,
});

export const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  top: "100%",
  left: 0,
  perspective: "2000px",
});

const CaretDown = styled(CaretDownIcon, {
  position: "relative",

  top: 1,
  transition: "transform 250ms ease",
  "[data-state=open] &": { transform: "rotate(-180deg)" },
});

const Arrow = styled("div", {
  position: "relative",
  top: "70%",
  backgroundColor: "white",
  width: 10,
  height: 10,
  transform: "rotate(45deg)",
  borderTopLeftRadius: 2,
});
