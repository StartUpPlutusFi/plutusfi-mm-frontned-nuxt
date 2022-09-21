/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    extend: {
      colors: {
        "plutusfi-login-bg-color": "#485A6A",
        "switcher-black-bg-color": "#3c3c3c",
        "switcher-blue-contrast-color": "#68bad4"
      },
      fontSize: {
        "display-1": "5rem",
        "display-2": "4.5rem",
        "display-3": "4rem",
        "display-4": "3.5rem",
        "display-5": "3rem",
        "display-6": "2.5rem",
      }
    },
  },
  plugins: [],
}
