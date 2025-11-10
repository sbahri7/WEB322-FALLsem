/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],

    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
