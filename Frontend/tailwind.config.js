/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        cloudBlue: "#AEE1E1",
        cloudGray: "#D3E0DC",
        cloudPink: "#FCD1D1",
        darkBlue: "#A5CDCE",
        darkPurple: "#5B4B8A",
        deepRed: "#B24A4A",
        mellowPink: "#D19BC0",
        darkTeal: "#004B47",
        slateGray: "#3C3F4E",
        softPlum: "#8D5B9C",
        deepSlate: "#2F4A6E"
      }
    },
  },
  plugins: [],
}

