/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#C7E7C7",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        josefin: ["var(--font-josefin)"],
        sans: ["var(--font-josefin)"],
      },
    },
  },
  plugins: [],
};
