/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#35408e",
          dark: "#2a326b",
          accent: "#ffd400",
        },
      },
      zIndex: {
        9999: "9999",
      },
    },
  },
  plugins: [],
};
