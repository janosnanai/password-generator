/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#a2ffb2",
        "custom-yellow": "#fad06c",
        "custom-gray-light": "#24232a",
        "custom-gray-dark": "#19171e",
        "custom-text-gray-light-1": "#e3e2e9",
        "custom-text-gray-light-2": "#d2d1d8",
        "custom-text-gray-dark": "#6f6d76",
        "custom-bg-gray-light": "#131219",
        "custom-bg-gray-dark": "#09080d",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
