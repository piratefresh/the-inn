import { createMedia } from "@artsy/fresnel";

const newThemeBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const ReactionMedia = createMedia({
  breakpoints: newThemeBreakpoints,
  interactions: {
    // TODO: These should go into palette
    hover: "(pointer: coarse), (-moz-touch-enabled: 1)",
    notHover:
      "not all and (pointer: coarse), not all and (-moz-touch-enabled: 1)",
  },
});

export const Media = ReactionMedia.Media;
export const MediaContextProvider = ReactionMedia.MediaContextProvider;
export const createMediaStyle = ReactionMedia.createMediaStyle;
export const SortedBreakpoints = ReactionMedia.SortedBreakpoints;
export const findBreakpointsForWidths = ReactionMedia.findBreakpointsForWidths;
export const findBreakpointAtWidth = ReactionMedia.findBreakpointAtWidth;
export const valuesWithBreakpointProps =
  ReactionMedia.valuesWithBreakpointProps;

// TODO: Simplify this hideous typing.
export type MatchingMediaQueries = Array<
  "hover" | "notHover" | typeof SortedBreakpoints[0]
>;
