/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "rgba(151, 154, 165, 0.21)",
        //  'primary':'#9747FF',
      },
    },
  },
  plugins: [],
};
