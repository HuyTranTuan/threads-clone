module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "semi-transparent-white": "rgba(255, 255, 255, 0.25)",
      },
      screens: {
        short: { raw: "(max-height: 400px)" },
        tall: { raw: "(min-height: 600px)" },
      },
    },
  },
  plugins: [],
};
