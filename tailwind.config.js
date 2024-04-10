const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure your paths are correct
  theme: {
    extend: {},
  },
  plugins: [],
});
