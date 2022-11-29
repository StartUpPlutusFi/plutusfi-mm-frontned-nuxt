<script setup lang="ts">
import {onClickOutside} from '@vueuse/core'
import {ref} from "#imports";
import { Icon } from "@iconify/vue";

const props = defineProps({
  id: {type: Number, required: true},
  index: {type: Number, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true}
})

const emit = defineEmits(["delete", "open-update"])
const showOptions = ref<boolean>(false)
const optionRef = ref<HTMLDivElement>()

const CloseOptionsMenu = () => {
  showOptions.value = false
}

const emitDelete = () => {
  emit("delete", props.index)
}

const emitOpen = () => {
  emit("open-update", props.id)
}

onClickOutside(optionRef, CloseOptionsMenu)
</script>
<template>
  <div class="p-3 w-full bg-gray-700 rounded-md flex relative">
    <div @click="showOptions = !showOptions" class="absolute right-1 text-gray-400  top-2 hover:text-white hover:cursor-pointer w-5">
      <Icon icon="charm:menu-kebab" />
    </div>
    <div v-if="showOptions" ref="optionRef" class="min-h-fit absolute right-3 top-7 bg-gray-300 rounded">
      <ul>
        <li class="hover:bg-gray-500 hover:text-white cursor-pointer px-2 py-1 text-center rounded-t">Info</li>
        <li
            class="hover:bg-gray-500 hover:text-white cursor-pointer px-2 py-1 text-center"
            @click="emit('open-update', props.id)"
        >Settings</li>
        <li
            class="hover:bg-gray-500 hover:text-white cursor-pointer px-2 py-1 text-center rounded-b"
            @click="emitDelete">Delete</li>
      </ul>
    </div>
    <div class="mr-2">
      <img
          class="w-20"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png" 
      alt="project-name-pic" width="180" height="180" />
    </div>
    <div>
        <div>
            <h4 class="font-semibold text-gray-100">{{ props.name }}</h4>
            <span
            class="text-sm text-gray-400"
              >{{ props.description }}</span
            >
        </div>
        <div class="mt-2">
            <button class="btn btn-primary">start</button>
        </div>
    </div>
  </div>
</template>
