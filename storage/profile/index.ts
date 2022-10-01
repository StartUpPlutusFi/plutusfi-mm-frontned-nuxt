import { defineStore } from "pinia";
import { GetProfileInfo } from "~~/server/auth/profile";
import { ProfileInfo } from "./interfaces";

export const useProfile = defineStore("profile", {
  state: () => {
    return {
      profile: null as ProfileInfo | null,
    };
  },
  getters: {
    get: (state) => state.profile,
  },
  actions: {
    async getProfile() {
      const data = await GetProfileInfo();
      if (data) {
        this.profile = data;
      }
    },
  },
});
