import { defineStore } from "pinia";

interface AuthCredentials {
  access: string;
  refresh: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      auth: null as AuthCredentials | null,
    };
  },
  getters: {
    getAccess: (state) => state.auth?.access,
    getRefresh: (state) => state.auth?.refresh,
  },

  actions: {
    setAuthCredentials(auth: AuthCredentials) {
      this.auth = auth;
    },
  },
  persist: true,
});
