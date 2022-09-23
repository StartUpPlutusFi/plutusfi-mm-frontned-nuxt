import { defineStore } from "pinia";

export const useLoader = defineStore("loader", {
  state: () => {
    return {
      isLoading: false,
    };
  },
  getters: {
    getLoading: (state) => state.isLoading,
  },
  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});
