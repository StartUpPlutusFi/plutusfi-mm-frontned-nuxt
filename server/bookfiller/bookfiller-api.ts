import {useAuthStore} from "~/storage/auth/auth";
import API from "~/server/api";
import {ExecutionFormBookFiller, ResponseCreateExecutionBookfiller} from "~/storage/bookfiller/interfaces";

export const GetAllExecutions = async () => {
    const auth = useAuthStore()
    const {data} = await API.get(`/bookfiller/list`, {
        headers: {
            Authorization: `Bearer ${auth.getAccess}`,
            "Content-Type": "application/json",
        }
    })

    return data
}

export const CreateExecution = async (creationData: ExecutionFormBookFiller): Promise<ResponseCreateExecutionBookfiller> => {
    const auth = useAuthStore()
    const {data} = await API.post(`/bookfiller/add`, creationData,{
        headers: {
            Authorization: `Bearer ${auth.getAccess}`,
            "Content-Type": "application/json",
        }
    })

    return data
}