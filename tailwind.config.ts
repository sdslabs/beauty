import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#000000",
        },
        foreground: {
          light: "#000000",
          dark: "#a5a5a5",
        },
        primary: "#e44f26",
      },
    },
  },
  darkMode: "class", // Enables class-based dark mode
  plugins: [],
};
export default config;
