<script setup lang="ts">
import {ResponseCreateExecutionBookfiller} from "~/storage/bookfiller/interfaces";
import {convertStringToDate} from "~/utils/date_utils"

const props = defineProps({
  index: {Type: Number, required: true},
  data: {Type: Object as unknown as ResponseCreateExecutionBookfiller, required: true}
})

const emit = defineEmits(["detail"])


</script>

<template>
  <div class="text-gray-200 border border-gray-500 hover:border-gray-900 bg-gray-700 hover:text-white hover:bg-gray-800 transition-colors hover: flex flex-col p-2 justify-between rounded">
    <div>
      <h4>{{ props.data.name }}</h4>
    </div>
    <p>
      <small>Execution at: {{ convertStringToDate(props.data.created_at).toDateString() }}</small>
    </p>
    <div class="flex justify-end gap-2">
      <small
          @click="emit('detail', props.index)"
          class="text-gray-400 hover:text-gray-50 cursor-pointer">detail</small>
      <small
          class="text-gray-400 hover:text-gray-50 cursor-pointer"
      >control</small>
    </div>
  </div>
</template>

<style scoped>

</style>