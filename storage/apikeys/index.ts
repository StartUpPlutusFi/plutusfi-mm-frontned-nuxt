import {CredentialForm} from "~~/server/apiCreds/types";
import {defineStore} from "pinia";
import {CreataApiCredentials, DeleteApiCredential, LoadApiCredentialList,} from "~~/server/apiCreds";
import {ApiDetail} from "~~/server/apiCreds/types";
import {createToast} from "mosha-vue-toastify";
import {AxiosError} from "axios";

export const useApiCredentials = defineStore("api-cred", {
    state: () => {
        return {
            credentialList: [] as ApiDetail[],
        };
    },

    getters: {
        getCredential: (state) => {
            return (index: number) => state.credentialList[index];
        },
        getList: (state) => state.credentialList,
    },

    actions: {
        async LoadCrendentials() {
            this.credentialList = await LoadApiCredentialList();
        },

        async CreateCredential(body: CredentialForm): Promise<boolean> {
            try {
                const data = await CreataApiCredentials(body);
                this.credentialList.push(data);
                return true
            } catch (e: AxiosError) {
                createToast("Invalid form data.", {
                    type: "danger",
                    position: "top-center"
                })
                return false
            }

        },
        async DeleteCredential(index: number) {
            const data = await DeleteApiCredential(this.credentialList[index].id);
            if (data) {
                this.credentialList.splice(index, 1)
            } else {
                console.log("Falha ao deletar api");
            }
        },
    },
});
