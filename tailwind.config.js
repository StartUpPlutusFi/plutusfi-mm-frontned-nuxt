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
    },
  },
  plugins: [],
}
