import { useAuthStore } from "~~/storage/auth/auth";
import { createToast } from "mosha-vue-toastify";


export default defineNuxtPlugin(() => {
  addRouteMiddleware("is-authenticated", (to) => {
    const auth = useAuthStore()
    if (to.meta.loginRequired && !auth.getAccess) {
      createToast("Login is required to acess page.", {
        type: "danger",
        position: "top-center"
      });
      return navigateTo("/login")
    }
  }, {})
});
