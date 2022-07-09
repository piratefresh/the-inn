const withTM = require("next-transpile-modules")(["ui", "backend", "database"]);

module.exports = withTM({
  reactStrictMode: true,
  presets: ["next/babel"],
  plugins: [
    ["styled-components", { ssr: true }],
    "istanbul",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
  images: {
    domains: ["res.cloudinary.com"],
  },
});
