/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        cloudBlue: "#AEE1E1",
        cloudGray: "#D3E0DC",
        cloudGray2: "#b0c8c1",
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

