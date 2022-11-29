import {defineStore} from "pinia";
import {
    AutoTraderList, ControlAutoTradeBot,
    CreateTradeBot,
    DeleteTradeBot, GetStatusAutoTradeBot,
    GetTradeBotData,
    UpdateTradeBotSettings
} from "~/server/autotrader/trader-api";
import {AutoTraderConfig, AutoTraderCreateForm} from "~/server/autotrader/interfaces";
import {createToast} from "mosha-vue-toastify";
import {ControlState} from "~/server/autotrader/types";

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
            } catch (e) {
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
        },
        async UpdateBotSettings(botid: number, formData: AutoTraderCreateForm): Promise<boolean> {
            try {
                return await UpdateTradeBotSettings(botid, formData)
            } catch (e) {
                console.error(e)
                createToast("An error occurred while updating the robo", {
                    type: "danger",
                    position: "top-center"
                })

                return false
            }
        },
        async LoadAutoTradeStatus(id: number): Promise<string> {
            try {
                let status = await GetStatusAutoTradeBot(id)
                return status[0]["status"]
            } catch (e) {
                console.error(e)
                return "error..."
            }
        },
        async ChangeStateAutoTradeBot(index: number, id: number, state: ControlState) {
            try {
                let newState = await ControlAutoTradeBot(id, state)
                this.traderList[index].status = newState["auto_trade_bot_status"]
            } catch (e) {
                console.error(e)
                if (state === "start") {
                    createToast("An error occurred while trying to start the robot", {
                        type: "warning",
                    })

                } else {
                    createToast("An error occurred while trying to stop the robot", {
                        type: "warning",
                    })

                }
            }
        }

    }
})