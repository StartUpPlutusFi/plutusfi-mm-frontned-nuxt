import {useAuthStore} from "~/storage/auth/auth";
import {AutoTraderConfig} from "~/server/autotrader/interfaces";
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