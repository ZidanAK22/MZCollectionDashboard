import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        'text': '#0b1313',
        'background': '#f8fbfb',
        'primary': '#63a4a8',
        'secondary': '#93a7e1',
        'accent': '#8e7eb7',
        'dark-bg': '#040606'
      },
    },
  },
  plugins: [],
} satisfies Config;
