module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Nunito", "sans-serif"],
      body: ["Montserrat", "sans-serif"],
      mono: ['"Ubuntu Mono"', "ui-monospace", "monospace"],
    },
    extend: {
      zIndex: {
        "-10": "-10",
      },
      colors: {
        panpink: {
          DEFAULT: "#FF1B8D"
        },
        panblue: {
          DEFAULT: "#1BB3FF",
          dark: "#0077b3" // for styling text, to meet accessibility guidelines
        },
        panyellow: {
          DEFAULT: "#FFDA00"
        }
      },
      gridAutoRows: {
        "0": "0px",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
