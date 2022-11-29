import {useAuthStore} from "~/storage/auth/auth";
import {AutoTraderConfig, AutoTraderCreateForm, ControlStateResponse} from "~/server/autotrader/interfaces";
import API from "~/server/api";
import {AxiosResponse} from "axios";
import {ControlState} from "~/server/autotrader/types";

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

export const DeleteTradeBot = async (id: number): Promise<AxiosResponse> => {
    const auth = useAuthStore()
    return await API.delete(`/autotrade/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${auth.getAccess}`,
            "Content-Type": "application/json",
        }
    })
}

export const GetTradeBotData = async (id: number): Promise<AutoTraderConfig> => {
    const auth = useAuthStore()
    const {data} = await API.get(`/autotrade/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${auth.getAccess}`,
            "Content-Type": "application/json",
        }
    })

    return data
}

export const UpdateTradeBotSettings = async (botId: number, formData: AutoTraderCreateForm): Promise<boolean> => {
    const auth = useAuthStore()
    const response = await API.put(`/autotrade/update/${botId}`, formData, {
        headers: {
            Authorization: `Bearer ${auth.getAccess}`,
            "Content-Type": "application/json",
        }
    })

    return response.status === 200
}

export const GetStatusAutoTradeBot = async (id: number): Promise<string> => {
    const auth = useAuthStore()
    const {data} = await API.get(`/autotrade/status/${id}`, {
        headers: {
            Authorization: `Bearer ${auth.getAccess}`,
            "Content-Type": "application/json",
        }
    })

    return data
}

export const ControlAutoTradeBot = async (id: number, state: ControlState): Promise<ControlStateResponse> => {
    const auth = useAuthStore()
    const {data} = await API.post(`/autotrade/ctrl/${id}`, {
            "status": state
        },
        {
            headers: {
                Authorization: `Bearer ${auth.getAccess}`,
                "Content-Type": "application/json",
            }
        })

    return data
}