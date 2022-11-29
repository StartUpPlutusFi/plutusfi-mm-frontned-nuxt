import {defineStore} from "pinia";
import {AutoTraderList, CreateTradeBot, DeleteTradeBot, GetTradeBotData} from "~/server/autotrader/trader-api";
import {AutoTraderConfig} from "~/server/autotrader/interfaces";
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
            this.traderList = await AutoTraderList()
        },
        async LoadConfiguration(id: number): Promise<AutoTraderConfig> {
            try {
                return await GetTradeBotData(id)
            } catch (e) {
                createToast("There was a problem loading the bot's information.", {
                    type: "danger",
                    position: "top-center",
                })
                console.error(e)
            }
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
                await DeleteTradeBot(this.traderList[index].id);
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