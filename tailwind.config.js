/** @type {import('tailwindcss').Config} */
// const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url('/src/assets/images/fondecran0.jpeg')",
      },
      bgGradientDeg: {
        75: "75deg",
      },
    },
  },
  plugins: [],
};
