import "../styles/tailwind.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "default",
    values: [
      {
        name: "default",
        value: "rgb(13, 10, 0)",
      },
    ],
  },
};

export const globalTypes = {
  darkMode: true,
};
