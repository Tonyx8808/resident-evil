/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        mono: ["Share Tech Mono", "Courier New", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#080808",
        foreground: "#f0f0f0",
        accent: "#cc0000",
        "accent-dark": "#8b0000",
        "chrome-light": "#e8e8e8",
        "chrome-mid": "#b0b0b0",
        "chrome-dark": "#666",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};
