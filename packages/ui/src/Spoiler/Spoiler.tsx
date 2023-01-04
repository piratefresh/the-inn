import React, { useState, useEffect, forwardRef } from "react";
import { useElementSize } from "@mantine/hooks";
import { styled } from "../theme";

const Root = styled("div", {
  position: "relative",
});

const StyledContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transitionProperty: "max-height",
  transitionTimingFunction: "ease",
  transitionDuration: `200ms`,
  whiteSpace: "pre",

  "@media (prefers-reduced-motion)": {
    transitionDuration: "0ms",
  },
});

export interface SpoilerProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Max height of visible content, when this point is reached spoiler appears */
  maxHeight: number;

  /** Label for close spoiler action */
  hideLabel: React.ReactNode;

  /** Label for open spoiler action */
  showLabel: React.ReactNode;

  /** Get ref of spoiler toggle button */
  controlRef?: React.ForwardedRef<HTMLButtonElement>;

  /** Initial spoiler state, true to wrap content in spoiler, false to show content without spoiler, opened state will be updated on mount */
  initialState?: boolean;

  /** Spoiler reveal transition duration in ms, 0 or null to turn off animation */
  transitionDuration?: number;

  styles?: React.CSSProperties;

  className?: string;
}

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>(
  (
    {
      children,
      maxHeight = 100,
      showLabel = "Show more",
      hideLabel = "Hide",
      transitionDuration = 200,
      controlRef,
      initialState,
      className,
      styles,
      ...others
    },
    ref
  ) => {
    const [show, setShowState] = useState(initialState);
    const [spoiler, setSpoilerState] = useState(initialState);
    const { ref: contentRef, height } = useElementSize();

    const spoilerMoreContent = show ? hideLabel : showLabel;

    useEffect(() => {
      setSpoilerState(maxHeight < height);
    }, [height, maxHeight, children]);

    return (
      <Root ref={ref} {...others}>
        <StyledContent
          style={{
            maxHeight: !show ? maxHeight : height || undefined,
          }}
        >
          <div ref={contentRef}>{children}</div>
        </StyledContent>

        {spoiler && (
          <a ref={controlRef} onClick={() => setShowState((opened) => !opened)}>
            {spoilerMoreContent}
          </a>
        )}
      </Root>
    );
  }
);

Spoiler.displayName = "Spoiler";
