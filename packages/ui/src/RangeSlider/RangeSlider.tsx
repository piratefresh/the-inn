import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import type { SliderProps } from "@radix-ui/react-slider";
import { styled, theme } from "../theme";
import React from "react";

export const RangeSlider = React.forwardRef(
  (
    { value, onValueChange, min, max, step }: SliderProps,
    ref: React.Ref<{ changeSliderValue: (v: number) => void }>
  ) => {
    return (
      <>
        <StyledSlider
          value={value}
          onValueChange={([value]) => onValueChange && onValueChange([value])}
          min={min}
          max={max}
          step={step}
        >
          <StyledTrack>
            <StyledRange />
          </StyledTrack>
          {[value].map((v, index) => (
            <StyledThumb key={index} title={v?.[0].toString()} />
          ))}
        </StyledSlider>
      </>
    );
  }
);

RangeSlider.displayName = "RangeSlider";

const StyledSlider = styled(Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: "100%",
  maxWidth: "100%",
  '&[data-orientation="horizontal"]': {
    height: "100%",
  },
  ' &[data-orientation="vertical"]': {
    flexDirection: "column",
    width: "20px",
    height: "100px",
  },
});

const StyledTrack = styled(Track, {
  backgroundColor: theme.colors.whiteA8.value,
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",
  '&[data-orientation="horizontal"]': {
    height: "0.3em",
  },
  '&[data-orientation="vertical"]': {
    width: "0.3em",
  },
});

const StyledRange = styled(Range, {
  position: "absolute",
  backgroundColor: theme.colors.whiteA12.value,
  borderRadius: "9999px",
  height: "100%",
});

const StyledThumb = styled(Thumb, {
  all: "unset",
  display: "block",
  width: "1em",
  height: "1em",
  cursor: "pointer",
  backgroundColor: theme.colors.yellowBrand.value,
  borderRadius: "50%",
  zIndex: 9999,
  "&:focus": {
    boxShadow: `0 0 0 2px ${theme.colors.blackA4}`,
  },
});
