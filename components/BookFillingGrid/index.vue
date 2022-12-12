<script setup lang="ts">

import {useBookFiller} from "~/storage/bookfiller/bookfiller_storage";
import {onBeforeMount} from "vue";

const bookfiller = useBookFiller()

onBeforeMount(async () => {
  await bookfiller.LoadExecutions()
})

</script>

<template>
  <div class="grid grid auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-auto expanded p-1 mx-5 sm:mx-0">
    <div
        v-for="execution in bookfiller.GetExecutionsList"
        class="border border-gray-700 bg-gray-500 cursor-pointer hover:text-white hover:bg-gray-800 transition-colors hover: flex flex-col p-2 justify-between rounded" >
      <div class="font-medium">Pair: {{ execution.pair_token }}</div>
      <div>Executed at: {{ execution.created_at }}</div>
      <div>Number of orders: {{ execution.number_of_orders }}</div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>

</style>