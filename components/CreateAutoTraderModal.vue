<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import {AutoTraderCreateForm} from "../server/autotrader/interfaces";
import {useApiCredentials} from "~/storage/apikeys";
import {onClickOutside} from "@vueuse/core";
import {Icon} from "@iconify/vue";
import {useAutoTrader} from "~/storage/autotrader/auto-trader-store";


const emit = defineEmits(['close-modal'])
const credential = useApiCredentials();
const autoTrader = useAutoTrader();

onBeforeMount(() => {
  credential.LoadCrendentials()
})

const formData = ref<AutoTraderCreateForm>({
  name: '',
  description: '',
  api_key_id: 0,
  side: 0,
  pair_token: '',
  user_ref_price: 0.0,
  trade_candle: 0,
  trade_amount: 0,
})

const formRef = ref<HTMLDivElement>()
const sideChecked = ref<boolean>(false)
const apiId = ref<number>()

const resetForm = () => {
  formData.value = {
    name: "",
    description: "",
    api_key_id: 0,
    side: 0,
    pair_token: "",
    user_ref_price: 0,
    trade_candle: 0,
    trade_amount: 0
  }
}
const emitClose = () => {
  emit('close-modal')
  resetForm()
}
onClickOutside(formRef, emitClose)

const mountBody = (): FormData => {
  const body = new FormData()
  for (const key in formData.value) {
    body.append(key, formData.value[key])
  }
  return body
}

const createBot = async () => {
  console.log("create bot", formData.value)
}

const checkSideOption = () => {
  sideChecked.value = !sideChecked.value
  if (sideChecked.value) {
    // 1 represent side action to Buy orders
    formData.value.side = 1
  } else {
    // 0 represent side action to Sell orders
    formData.value.side = 0
  }
}

</script>

<template>
  <div class="overlay w-full h-screen absolute top-0 left-0 z-30 flex items-center justify-center">
    <div class="w-full sm:w-fit h-screen sm:h-fit bg-gray-100 relative">
      <div
          @click="emitClose"
          class="text-black absolute right-2 top-1 text-xl hover:bg-gray-500 rounded-full hover:text-gray-200 hover:cursor-pointer">
        <Icon icon="ic:baseline-close"/>
      </div>
      <div>
        <h1 class="text-3xl ml-4 mt-4">Auto Trader Creation Form</h1>
      </div>
      <form
          ref="formRef"
          @submit.prevent="createBot"
          class="p-4"
      >
        <div class="flex flex-col sm:flex-row gap-10">
          <div>
            <div class="mb-2 input-group">
              <label for="name">Project Name</label>
              <input
                  class="text-input"
                  type="text" name="name" v-model="formData.name"/>
            </div>
            <div class="mb-2 input-group">
              <label for="description">Description</label>
              <input class="text-input" type="text" name="description" v-model="formData.description">
            </div>
            <div class="mb-2 input-group">
              <label for="api_credential">API credential</label>
              <select ref="selectApiRef" name="api_credential">
                <option value="0">---</option>
                <option
                    v-for="cred in credential.getList"
                    :value="cred.id"
                >{{ cred.description }}
                </option>
              </select>
            </div>
            <div class="mb-2 input-group">
              <label for="token">Token</label>
              <input class="text-input" type="text" name="token" v-model="formData.pair_token">
            </div>
          </div>
          <div>
            <div class="mb-2 input-group">
              <label for="ref_price">Reference price</label>
              <input class="text-input" type="text" name="ref_price" v-model="formData.user_ref_price">
            </div>
            <div class="mb-2 input-group">
              <label for="candle">Candle</label>
              <input class="text-input" type="text" name="candle" v-model="formData.trade_candle">
            </div>
            <div class="mb-2 input-group">
              <label for="amount">Amount</label>
              <input class="text-input" type="text" name="amount" v-model="formData.trade_amount">
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary m-2">Create</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background-color: #000000aa;
}
</style>