/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/_layout.{js,jsx,ts,tsx}", // Inclui o arquivo _layout.js
    "./app/**/*.{js,jsx,ts,tsx}", // Inclui todos os arquivos no diretório custom
    "./app/*.{js,jsx,ts,tsx}",
    "./app/(tabs)*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
