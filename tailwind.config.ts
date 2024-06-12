import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxl: "1886px",
        xs: { min: "376px" },
      },
      colors: {
        primary: "#010409",
        btnPrimary: "#471c7c",
        btnSecondary: "#7628d6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        primary: "#010409",
        "primary-two": "#22243b",
      },
      fontFamily:{
        "montserrat":["Nunito", "san-serif"]
      },
    },
  },
  plugins: [],
};
export default config;
