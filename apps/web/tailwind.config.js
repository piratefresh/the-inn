const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class',
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Alegreya Sans", "Roboto", ...defaultTheme.fontFamily.sans],
        serif: ["Staatliches", ...defaultTheme.fontFamily.serif],
        oldFenris: ["Old Fenris", ...defaultTheme.fontFamily.sans],
        alegreyaSans: ["Alegreya Sans", ...defaultTheme.fontFamily.sans],
        trejanSans: ["trajan-sans-pro", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: colors.orange,
        brandBlack: "#0D0A00",
        brandBlue: "#26547C",
        brandGray: "#273435",
        brandYellow: "#FFD166",
        gamesBg: "#0F2124",
        thunderbird: {
          DEFAULT: "#C9301B",
          50: "#F3B1A8",
          100: "#F1A196",
          200: "#EC8172",
          300: "#E7614E",
          400: "#E2412A",
          500: "#C9301B",
          600: "#982414",
          700: "#66180E",
          800: "#350D07",
          900: "#030100",
        },
        cork: {
          DEFAULT: "#3E231A",
          50: "#B96F57",
          100: "#B1644A",
          200: "#94543E",
          300: "#774332",
          400: "#5B3326",
          500: "#3E231A",
          600: "#160D09",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        "cocoa-brown": {
          DEFAULT: "#312223",
          50: "#9B6F72",
          100: "#916568",
          200: "#795457",
          300: "#614345",
          400: "#493334",
          500: "#312223",
          600: "#100B0B",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        roti: {
          DEFAULT: "#BDA846",
          50: "#EDE8CD",
          100: "#E8E1BE",
          200: "#DDD2A0",
          300: "#D2C482",
          400: "#C8B664",
          500: "#BDA846",
          600: "#968535",
          700: "#6C6027",
          800: "#433B18",
          900: "#1A1709",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.red.500"),
            strong: {
              color: theme("colors.orange.500"),
            },
            blockquote: {
              color: theme("colors.orange.700"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.500"),
            strong: {
              color: theme("colors.pink.500"),
            },
            blockquote: {
              color: theme("colors.pink.700"),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
};
