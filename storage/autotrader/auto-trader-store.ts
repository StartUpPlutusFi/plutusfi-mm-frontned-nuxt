import {defineStore} from "pinia";
import {AutoTraderList, CreateTradeBot} from "~/server/autotrader/trader-api";
import {AutoTraderCreateForm} from "~/server/autotrader/interfaces";
import {createToast} from "mosha-vue-toastify";

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
        },

        async CreateNewBot(body: FormData): Promise<boolean> {
            try {
                const data = await CreateTradeBot(body)
                this.traderList.push(data)
                return true
            }catch (e) {
                console.log("error", e)
                createToast("Failure to create a new Auto Trader Bot.")
                return false
            }
        }
    }
})