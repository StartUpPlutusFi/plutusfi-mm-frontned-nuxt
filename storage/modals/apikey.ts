import { defineStore } from "pinia";

export const useModalApiCredential = defineStore("modalApiCrendential", {
  state: () => {
    return {
      show: false,
    };
  },
  getters: {
    isShow(): boolean {
      return this.show;
    },
  },
  actions: {
    setShow(value: boolean): void {
      this.show = value;
    },
  },
});
