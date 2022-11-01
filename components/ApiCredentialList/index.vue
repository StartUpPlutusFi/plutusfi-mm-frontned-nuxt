<script setup lang="ts">
import { LoadApiCredentialList } from "~~/server/apiCreds"
import { ApiDetail } from "~~/server/apiCreds/types";

const apiCredentialList = ref<ApiDetail[]>([])

onBeforeMount(async () => {
    const data = await LoadApiCredentialList()
    apiCredentialList.value = data
    
})
</script>

<template>
    <div class="grow flex flex-col mt-5 overflow-x-auto">
        <div class="w-full bg-gray-500 rounded-md" v-if="apiCredentialList.length > 0">
            <transition-group name="list" tag="ul" class="list-none">
                <li v-for="cred in apiCredentialList" :key="cred">
                    <div class="p-2 flex justify-between">
                        <div>
                            {{ cred.description }}
                            <p>Default: {{ cred.default ? "yes": "no" }}</p>
                        </div>
                        <button class="btn">X</button>
                    </div>
                </li>
            </transition-group>
        </div>
        <div v-else class="">
            <p class="text-center">No credentials registered.</p>
        </div>
    </div>
</template>