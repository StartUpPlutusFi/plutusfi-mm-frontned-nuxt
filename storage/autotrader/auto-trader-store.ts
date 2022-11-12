import {defineStore} from "pinia";
import {AutoTraderList, CreateTradeBot, DeleteTradeBot} from "~/server/autotrader/trader-api";
import {AutoTraderConfig, AutoTraderCreateForm} from "~/server/autotrader/interfaces";
import {createToast} from "mosha-vue-toastify";

export const useAutoTrader = defineStore("auto-trader", {
    state: () => {
        return {
            traderList: [] as AutoTraderConfig[]
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
                createToast("Failure to create a new Auto Trader Bot.")
                return false
            }
        },
        async DeleteBot(index: number): Promise<boolean> {
            try {
                const response = await DeleteTradeBot(this.traderList[index].id)
                this.traderList.splice(index, 1)
                return true
            } catch (e) {
                createToast("Failure to delete Auto Trader bot", {
                    position: "top-center",
                    type: "danger"
                })
                return false
            }
        }
    }
})