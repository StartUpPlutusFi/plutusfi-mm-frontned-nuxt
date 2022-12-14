<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {onClickOutside} from "@vueuse/core";

const contentRef = ref<HTMLDivElement>()
const emit = defineEmits(["close"])

onClickOutside(contentRef, () => emit('close'))
</script>

<template>
  <div class="outer w-full h-screen bg-gray-700 bg-opacity-50 z-20- fixed top-0 left-0 backdrop-blur flex justify-end">
    <!--  container  -->
    <div ref="contentRef" class="inner w-full md:w-80 h-screen bg-gray-300 flex flex-col overflow-auto pb-4">
      <div class="h-20 p-3 flex justify-end md:justify-start text-xl">
        <Icon
            @click="emit('close')"
            class="text-gray-500 hover:text-gray-200 cursor-pointer transition-colors"
            icon="ic:baseline-close"/>
      </div>
      <div class="px-4">
        <slot name="default" />
      </div>
    </div>
    <!--  container  -->
  </div>
</template>

<style scoped>

</style>