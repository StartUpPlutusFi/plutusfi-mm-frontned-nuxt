<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {ExecutionFormBookFiller} from "~/storage/bookfiller/interfaces";
import {useApiCredentials} from "~/storage/apikeys";
import {useBookFiller} from "~/storage/bookfiller/bookfiller_storage";
import {useSideModal} from "~/storage/generics/sideModal";

const props = defineProps({
  index: {type: Number, required: true}
})

const bookfiller = useBookFiller()
const sideModal = useSideModal()

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

const api_credentials = useApiCredentials()


const Clear = () => {
  formData.value = {
    name: "",
    side: "0",
    pair_token: "",
    api_key_id: 0,
    budget: 0,
    number_of_orders: 0,
    order_size: 0,
    user_ref_price: 0,
    id: 0,
    created_at: "",
    updated_at: "",
    user_id: 0,
    api_key: 0
  }
}

onMounted(async () => {
  await api_credentials.LoadCrendentials()
  formData.value = bookfiller.GetExecution(props.index)
})

onUnmounted(() => {
  Clear()
})

const HandleUpdate = async () => {
  if(await bookfiller.UpdateExecution(props.index, formData.value)){
    sideModal.Close()
  }
}

</script>

<template>
  <form>
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
    <button @click.prevent="HandleUpdate" class="btn btn-primary btn-expand mt-5">Save</button>
  </form>
</template>


<style scoped>

</style>