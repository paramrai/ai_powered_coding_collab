/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollbar: {
        width: "thin",
        thumb: {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "10px",
          border: "2px solid rgba(0, 0, 0, 0.2)",
        },
        track: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
