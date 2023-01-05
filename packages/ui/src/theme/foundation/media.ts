interface MediaProps {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export const media: MediaProps = {
  xs: "@media (min-width: 0px)",
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  "2xl": "@media (min-width: 1536px)",
};

export const mediaString: MediaProps = {
  xs: "(min-width: 0px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};
