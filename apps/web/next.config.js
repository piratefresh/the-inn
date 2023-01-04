const path = require("path");

const withTM = require("next-transpile-modules")(["ui", "backend"]);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  withTM({
    reactStrictMode: true,
    images: {
      domains: ["res.cloudinary.com"],
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
  })
);
