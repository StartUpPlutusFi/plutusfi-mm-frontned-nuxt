import { defineStore } from "pinia";
import { AuthCredentials } from "./interfaces";


export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      auth: null as AuthCredentials | null,
    };
  },
  getters: {
    getAccess: (state) => state.auth?.access,
    getRefresh: (state) => state.auth?.refresh,
    getAuth: (state) => state.auth
  },

  actions: {
    setAuthCredentials(auth: AuthCredentials) {
      this.auth = auth;
    },
  },
  persist: true,
});
