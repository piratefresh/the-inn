import { createStyles } from "@mantine/core";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { styled, keyframes } from "@stitches/react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "rgba(10, 0, 5, 0.8)",
  },
}));

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(TooltipPrimitive.Content, {
  borderRadius: 4,
  padding: "0.5em",
  fontSize: 15,
  color: "white",
  maxWidth: "24em",
  lineHeight: "1.5rem",
  backgroundColor: "url(https://wow.zamimg.com/images/wow/tooltip.png)",
  //   boxShadow:
  //     "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  boxShadow:
    "-1px -1px 1px rgba(10, 0, 5, 0.5), -1px 1px 1px rgba(10, 0, 5, 0.5), 1px 1px 1px rgba(10, 0, 5, 0.5), 1px -1px 1px rgba(10, 0, 5, 0.5)",

  borderStyle: "solid",
  borderWidth: "5px",
  borderImage:
    "url(https://assets.codepen.io/13471/wow-tooltip-border-2.png) 5 repeat",

  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "forwards",
    willChange: "transform, opacity",
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

export const Tooltip = ({ children, content }: TooltipProps) => {
  const { classes } = useStyles();
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <StyledContent side="right" className={classes.root}>
          <TooltipPrimitive.Arrow />
          {content}
        </StyledContent>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
