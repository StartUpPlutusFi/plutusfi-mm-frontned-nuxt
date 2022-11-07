import {defineStore} from "pinia";
import {AutoTraderList} from "~/server/autotrader/trader-api";

export const useAutoTrader = defineStore("auto-trader", {
    state: () => {
        return {
            traderList: []
        }
    },

    getters: {
        getTraderList: state => state.traderList
    },

    actions: {
        async LoadTraders() {
            const data = await AutoTraderList()
            this.traderList = data
        }
    }
})