import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a1614",
        paper: "#f7f3ee",
        accent: "#c45c26",
        accentLight: "#e8a87c",
        sage: "#5c7a6b",
        muted: "#8a8279",
      },
      fontFamily: {
        display: ["Noto Serif SC", "Georgia", "serif"],
        sans: ["system-ui", "PingFang SC", "Microsoft YaHei", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
