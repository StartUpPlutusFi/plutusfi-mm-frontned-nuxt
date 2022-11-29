<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {onBeforeMount} from "vue";
import {onClickOutside} from "@vueuse/core";
import {useAutoTrader} from "~/storage/autotrader/auto-trader-store";
import {AutoTraderConfig} from "~/server/autotrader/interfaces";
import {createToast} from "mosha-vue-toastify";

const props = defineProps(["id"])
const emit = defineEmits(["close-modal"])
const refModal = ref<HTMLFormElement>()
const autoTrade = useAutoTrader()
const isLoading = ref<boolean>(true)

const formData = ref<AutoTraderConfig>()

const loadForm = async () => {
  isLoading.value = true
  try {
    let data = await autoTrade.LoadConfiguration(props.id)
    formData.value = data[0]
    isLoading.value = false
  } catch (e) {
    isLoading.value = true
    emit("close-modal")
  }

}

onBeforeMount(async () => {
  if (props.id == 0 || props.id == undefined) {
    emit("close-modal")
    createToast("Invalid Auto trader ID")
  } else {
    await loadForm()
  }
})

onClickOutside(refModal, () => {
  emit("close-modal")
})

</script>

<template>
  <div
      class="w-full h-screen bg-black bg-opacity-30 backdrop-blur z-20 top-0 left-0 absolute flex justify-center items-center">
    <transition>
      <form v-if="!isLoading" ref="refModal" class="bg-gray-100 p-5 flex gap-5 relative">
        <div class="absolute right-3 top-3">
          <button
              @click.prevent="emit('close-modal')"
              class="text-gray-400 hover:text-gray-800 transition-colors">
            <Icon icon="ic:baseline-close"/>
          </button>
        </div>
        <div>
          <div class="mb-3 input-group">
            <label for="name">Project name</label>
            <input type="text" name="name" class="text-input" v-model="formData.name">
          </div>
          <div class="mb-3 input-group">
            <label for="description">Description</label>
            <input type="text" name="description" class="text-input" v-model="formData.description">
          </div>
          <div class="mb-3 input-group">
            <label for="side">Side</label>
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
          <div class="mb-3 input-group">
            <label for="token">Token</label>
            <input type="text" name="token" class="text-input" v-model="formData.pair_token">
          </div>
        </div>
        <div>
          <div class="mb-3 input-group">
            <label for="ref_price">Reference price</label>
            <input type="text" name="ref_price" class="text-input" v-model="formData.user_ref_price">
          </div>
          <div class="mb-3 input-group">
            <label for="candle">Candle</label>
            <input type="text" name="candle" id="" class="text-input" v-model="formData.trade_candle">
          </div>
          <div class="mb-3 input-group">
            <label for="amount">Amount</label>
            <input type="text" name="amount" class="text-input" v-model="formData.trade_amount">
          </div>
        </div>
      </form>
      <div v-else>
        <div class="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </transition>

  </div>

</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0s;
}

@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

</style>