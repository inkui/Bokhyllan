import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          deep: "#0e221f",
          literary: "#16362f",
          shadow: "#091815",
        },
        paper: {
          DEFAULT: "#efe3c7",
          soft: "#f6eddb",
          pale: "#fbf5ea",
        },
        walnut: {
          DEFAULT: "#5c3d2e",
          deep: "#3f2a20",
        },
        brass: {
          DEFAULT: "#b8956d",
          muted: "#8a6f48",
        },
        ink: {
          DEFAULT: "#1f1a14",
          soft: "#5d5248",
          muted: "#8f8172",
        },
      },
      fontFamily: {
        serif: ["var(--font-literary)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        paper: "0 24px 60px rgba(72, 50, 32, 0.12)",
        book: "0 28px 70px rgba(4, 14, 12, 0.36)",
        door: "0 18px 45px rgba(72, 50, 32, 0.14)",
      },
      transitionDuration: {
        calm: "420ms",
        reveal: "760ms",
      },
      borderRadius: {
        quiet: "0.375rem",
      },
    },
  },
  plugins: [],
};

export default config;
