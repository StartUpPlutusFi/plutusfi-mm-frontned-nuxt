import {defineStore} from "pinia";
import {CreateExecution, GetAllExecutions, UpdateExecutionSettings} from "~/server/bookfiller/bookfiller-api";
import {ExecutionFormBookFiller, ResponseCreateExecutionBookfiller} from "~/storage/bookfiller/interfaces";
import {createToast} from "mosha-vue-toastify";

export const useBookFiller = defineStore("bookfiller", {
    state: () => {
        return {
            executions: [] as ResponseCreateExecutionBookfiller[]
        }
    },

    getters: {
        GetExecutionsList: state => state.executions,
        GetExecution: (state) => {
            return (index: number): ResponseCreateExecutionBookfiller => {
                return state.executions[index]
            }
        },
    },
    actions: {
        async LoadExecutions() {
            this.executions = await GetAllExecutions();
        },
        async NewExecution(data: ExecutionFormBookFiller): Promise<boolean> {
            try {
                this.executions.push(await CreateExecution(data));
                return true
            } catch (e) {
                createToast("An error occurred when try create a new Execution.", {
                    type: "warning",
                })
                return false
            }

        },
        async UpdateExecution(index: number, data: ExecutionFormBookFiller): Promise<Boolean> {
            try {
                const id = this.executions[index].id
                this.executions[index] = await UpdateExecutionSettings(id, data)
                return true
            } catch (e) {
                createToast("An error occurred when update settings.", {
                    type: "warning",
                    position: "top-left"
                })
                return false
            }
        }
    }


})