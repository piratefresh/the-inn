import type { ThemeVars } from "@storybook/theming";
import { create } from "@storybook/theming";

// or global addParameters
const theme: ThemeVars = create({
  base: "light",
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",
});

export default theme;
