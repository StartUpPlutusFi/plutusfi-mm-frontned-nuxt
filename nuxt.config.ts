import { defineNuxtConfig } from "nuxt";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  css: ["~/assets/css/tailwind.css", "mosha-vue-toastify/dist/style.css"],
});
