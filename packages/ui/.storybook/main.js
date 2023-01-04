module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", {
    name: "@storybook/addon-postcss",
    options: {
      postcssLoaderOptions: {
        implementation: require("postcss")
      }
      // cssLoaderOptions: {
      //   // When you have splitted your css over multiple files
      //   // and use @import('./other-styles.css')
      //   importLoaders: 1,
      // },
    }
  }, "storybook-tailwind-dark-mode"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  }
};