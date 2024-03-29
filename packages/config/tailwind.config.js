const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    // "../../apps/docs/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class',
  mode: "jit",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Alegreya Sans", "Roboto", ...defaultTheme.fontFamily.sans],
        serif: ["Staatliches", ...defaultTheme.fontFamily.serif],
        oldFenris: ["OldFenris", ...defaultTheme.fontFamily.sans],
        alegreyaSans: ["Alegreya Sans", ...defaultTheme.fontFamily.sans],
        trejanSans: ["trajan-sans-pro", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: colors.orange,
        brandBlack: "#0D0A00",
        brandLightBlack: "#181818",
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
      zIndex: {
        100: "100",
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800,
      },
    },
  },
  variants: {
    typography: ["dark"],
    margin: ["first", "last", "responsive"],
    padding: ["first", "last", "responsive"],
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".bg-main": {
          position: "relative",
          background: "#0F2124",

          "&::before": {
            content: "''",
            display: "block",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            background:
              'url("https://res.cloudinary.com/film-it/image/upload/v1648261306/The%20inn/concrete-stylized.png")',
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            mixBlendMode: "screen",
            opacity: 0.12,
          },
        },
        ".border-b-brandYellowGradient": {
          borderBottom: "3px solid transparent",
          backgroundImage:
            "linear-gradient(#181818, #181818),linear-gradient(90deg, #ffd166, #9f5e25)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        },
      });
    }),
  ],
};
