import { useLoader } from "./../storage/loader";
import { useAuthStore } from "~~/storage/auth/auth";
import { createToast } from "mosha-vue-toastify";
import { useProfile } from "~~/storage/profile";

export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "is-authenticated",
    (to) => {
      const auth = useAuthStore();
      const profile = useProfile();
      if (to.meta.loginRequired && !auth.getAccess) {
        createToast("Login is required to acess page.", {
          type: "danger",
          position: "top-center",
        });
        auth.clear()
        profile.clear()
        return navigateTo("/login");
      }
    },
    {}
  ),
    addRouteMiddleware("is-unauthenticated", (to) => {
      const auth = useAuthStore();
    });
});
