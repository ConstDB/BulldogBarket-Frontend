/** @type {import('tailwindcss').Config} */

export default{
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        '9999': '9999',
      }
    }, 
  },
  plugins: [],
};