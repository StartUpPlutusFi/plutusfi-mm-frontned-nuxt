<script setup lang="ts">
import {ApiDetail} from "~~/server/apiCreds/types";
import {useApiCredentials} from "~~/storage/apikeys";

const apiCredentialList = ref<ApiDetail[]>([]);
const credentials = useApiCredentials()

const deleteCredential = async (index: number) => {
  credentials.DeleteCredential(index)
};

onBeforeMount(async () => {
  await credentials.LoadCrendentials()
});
</script>

<template>
  <div class="grow flex flex-col mt-5 overflow-x-auto">
    <div
        class="w-full bg-gray-500"
        v-if="credentials.credentialList.length > 0"
    >
      <transition-group name="list" tag="ul" class="list-none">
        <li v-for="(cred, index) in credentials.credentialList" :key="cred">
          <div class="p-2 flex justify-between">
            <div>
              {{ cred.description }}
              <p>Default: {{ cred.default ? "yes" : "no" }}</p>
            </div>
            <button class="btn" @click="deleteCredential(index)">X</button>
          </div>
        </li>
      </transition-group>
    </div>
    <div v-else class="">
      <p class="text-center">No credentials registered.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>