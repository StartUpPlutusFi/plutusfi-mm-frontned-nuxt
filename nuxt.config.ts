import { defineNuxtConfig } from "nuxt";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
});
