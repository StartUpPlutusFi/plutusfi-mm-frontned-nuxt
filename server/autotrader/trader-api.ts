import {useAuthStore} from "~/storage/auth/auth";
import {AutoTraderConfig, AutoTraderCreateForm} from "~/server/autotrader/interfaces";
import API from "~/server/api";

export const AutoTraderList = async (): Promise<AutoTraderConfig[]> => {
    const auth = useAuthStore()
    const {data} = await API.get("/autotrade/list", {
        headers: {
            Authorization: `Bearer ${auth.getAccess}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    return data
}

export const CreateTradeBot = async (body: FormData): Promise<AutoTraderConfig> => {
    const auth = useAuthStore()
    const {data} = await API.post("/autotrade/add", body, {
        headers: {
            Authorization: `Bearer ${auth.getAccess}`,
            "Content-Type": "application/json",
        }
    })
    return data
}