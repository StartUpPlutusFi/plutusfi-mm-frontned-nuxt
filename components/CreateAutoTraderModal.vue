<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import {AutoTraderCreateForm} from "~/server/autotrader/interfaces";
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
  const body = mountBody()
  if (await autoTrader.CreateNewBot(body)) {
    emitClose()
  }
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

const setApiId = () => {
  formData.value.api_key_id = apiId.value
}

</script>

<template>
  <div class="overlay w-full h-screen backdrop-blur absolute top-0 left-0 z-30 flex items-center justify-center">
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
              <select name="api_credential" v-model="apiId" @change="setApiId">
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
              <input class="text-input" type="number" name="ref_price" v-model="formData.user_ref_price">
            </div>
            <div class="mb-2 input-group">
              <label for="candle">Candle</label>
              <input class="text-input" type="text" name="candle" v-model="formData.trade_candle">
            </div>
            <div class="mb-2 input-group">
              <label for="amount">Amount</label>
              <input class="text-input" type="number" name="amount" v-model="formData.trade_amount">
            </div>
            <div class="mb-2 mt-6 flex flex-col">
              <span>Side</span>
              <div>
                <input type="radio" name="side" value="0" class="mr-2" v-model="formData.side">
                <label for="side">Sell</label>
              </div>
              <div>
                <input type="radio" name="side" value="1" class="mr-2" v-model="formData.side">
                <label for="side">Buy</label>
              </div>
              <div>
                <input type="radio" name="side" value="2" class="mr-2" v-model="formData.side">
                <label for="side">Random</label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary m-2 w-full sm:w-fit">Create</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  background-color: #000000aa;
}

.switch-wrapper {

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked + .switch-container .switch-indicator {
    right: 2px;
    background-color: #31a1e0;
  }

  .switch-container {
    width: 40px;
    height: 20px;
    background-color: #e3e3e3;
    border-radius: 15px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 2px;

    .switch-overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 20;
      border-radius: 15px;
      cursor: pointer;
    }

    .switch-indicator {
      width: 15px;
      height: 15px;
      background-color: #e12525;
      position: absolute;
      border-radius: 50%;
      right: 58%;
      transition: all 0.3s ease;
    }
  }
}

</style>