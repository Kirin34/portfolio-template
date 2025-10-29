/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b388eb",
        accent: "#f6e9ff",
        dark: "#1f1b1c",
        light: "#ffffff",
      },
      fontFamily: {
        sans: ["'Poppins'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [],
};
