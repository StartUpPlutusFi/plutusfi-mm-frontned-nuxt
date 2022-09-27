import { useAuthStore } from "~~/storage/auth";
import { createToast } from "mosha-vue-toastify";


export default defineNuxtPlugin(() => {
  addRouteMiddleware("is-authenticated", (to) => {
    const auth = useAuthStore()
    if (to.meta.loginRequired && !auth.getAccess) {
      createToast("Login is required to acess page.");
      return navigateTo("/login")
    }
  }, {})
});
