module.exports = {
  extends: ["next", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": 0,
    "react-hooks/rules-of-hooks": 0, // Checks rules of Hooks
  },
};
