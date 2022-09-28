import { createNuxtPersistedState } from "pinia-plugin-persistedstate/nuxt";
import { useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(
    createNuxtPersistedState(useCookie, {
      cookieOptions: {
        expires: new Date(3600),
        maxAge: 3600,
        sameSite: "strict",
      },
    })
  );
});
