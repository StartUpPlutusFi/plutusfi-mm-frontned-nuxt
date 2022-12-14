<script setup lang="ts">
import {useBookFiller} from "~/storage/bookfiller/bookfiller_storage";
import {Icon} from "@iconify/vue";
import {ExecutionFormBookFiller} from "~/storage/bookfiller/interfaces";
import {onMounted, ref} from "vue";
import {useApiCredentials} from "~/storage/apikeys";
import {onClickOutside} from "@vueuse/core";
import {createToast} from "mosha-vue-toastify";

const bookFiller = useBookFiller()
const api_credentials = useApiCredentials()
onMounted(async () => {
  await api_credentials.LoadCrendentials()
})

const formRef = ref<HTMLFormElement>()
const emit = defineEmits(["close"])
const formData = ref<ExecutionFormBookFiller>({
  name: "",
  side: "0",
  pair_token: "",
  api_key_id: 0,
  budget: 0,
  number_of_orders: 0,
  order_size: 0,
  user_ref_price: 0
})

onClickOutside(formRef, () => emit("close"))

const HandleCreateExecution = async () => {
  if (formData.value.api_key_id === 0) {
    createToast("please, select a valid API Key.")
    return
  }
  if(await bookFiller.NewExecution(formData.value)) {
    emit("close")
  }
}

</script>
<template>
  <div
      class="fixed top-0 left-0 bg-gray-800 bg-opacity-30 flex items-center justify-center w-full h-screen backdrop-blur">
    <form ref="formRef" class="bg-gray-100 px-4 pt-6 pb-4 flex flex-col gap-2 relative">
      <div class="absolute right-3 top-2">
        <button
            @click.prevent="emit('close')"
            class="text-gray-400 hover:text-black transition-colors">
          <Icon icon="ic:baseline-close"/>
        </button>
      </div>
      <div class="flex gap-2">
        <div class="col gap-2">
          <div class="input-group">
            <label for="name">Name</label>
            <input
                class="text-input"
                type="text"
                name="name"
                v-model="formData.name"
            >
          </div>
          <div class="input-group">
            <label for="token">Token</label>
            <input
                type="text"
                name="token"
                class="text-input"
                v-model="formData.pair_token"
            >
          </div>
          <div class="input-group">
            <label for="api">API key</label>
            <select name="api" v-model="formData.api_key_id">
              <option value="0">------</option>
              <option
                  v-for="(cred, index) in api_credentials.getList"
                  :key="index"
                  :value="cred.id"
              >{{ cred.description }}{{ cred.default ? " | default" : "" }}
              </option>
            </select>
          </div>
          <div>
            <div>
              <input type="radio" name="side" value="0" v-model="formData.side">
              <label for="side">Sell</label>
            </div>
            <div>
              <input type="radio" name="side" value="1" v-model="formData.side">
              <label for="side">Buy</label>
            </div>
            <div>
              <input type="radio" name="side" value="2" v-model="formData.side">
              <label for="side">Random</label>
            </div>
          </div>
        </div>
        <div class="col gap-2">
          <div class="input-group">
            <label for="size">Size</label>
            <input type="number" name="size" class="text-input" v-model="formData.order_size">
          </div>
          <div class="input-group">
            <label for="num_orders">Number of orders</label>
            <input type="number" name="num_orders" class="text-input" v-model="formData.number_of_orders">
          </div>
          <div class="input-group">
            <label for="budget">Budget</label>
            <input type="number" name="budget" class="text-input" v-model="formData.budget">
          </div>
          <div class="input-group">
            <label for="ref_price">Reference price</label>
            <input type="number" name="ref_price" class="text-input" v-model="formData.user_ref_price">
          </div>
        </div>
      </div>
      <button @click.prevent="HandleCreateExecution()" class="btn btn-primary w-full">Create</button>
    </form>
  </div>
</template>
<style scoped>
.col {
  display: flex;
  flex-direction: column;
}

form div div input[type="radio"] {
  margin-right: 5px;
}
</style>