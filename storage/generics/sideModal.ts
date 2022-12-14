import {defineStore} from "pinia";

export const useSideModal = defineStore("side-modal", {
    state: () => {
        return {
            open: false,
        }
    },

    getters: {
        IsOpen: state => state.open
    },

    actions: {
        Open() {
            this.open = true;
        },
        Close() {
            this.open = false;
        }
    }
})
