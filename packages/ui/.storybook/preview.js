import "../styles/fonts.css";
import "../styles/storybook.css";
import { MantineProvider } from "@mantine/core";
import * as NextImage from "next/image";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "white",
        value: "#ffffff",
      },
      {
        name: "dark",
        value: "#212121",
      },
    ],
  },
};

export const decorators = [
  (Story) => (
    <MantineProvider>
      <Story />
    </MantineProvider>
  ),
];

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
