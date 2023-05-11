/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: [
    // ... other paths ...
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};