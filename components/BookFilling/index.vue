<script setup lang="ts">
import {BookFillingGrid} from "#components";
import NewExecutionModal from "./components/NewExecutionModal";
import {ref} from "vue";
import {useBookFiller} from "~/storage/bookfiller/bookfiller_storage";

const bookFiller = useBookFiller()
const creationModalIsVisible = ref<boolean>(false)

const CloseCreationModal = () => {
  creationModalIsVisible.value = false;
}

const OpenCreationModal = () => {
  creationModalIsVisible.value = true;
}

</script>
<template>
  <div class="mx-auto container flex flex-col">
    <h1 class="text-white text-display-6 ml-5 sm:ml-0">Book Filling</h1>
    <div class="w-full my-5">
      <Button
          @click="OpenCreationModal()"
          class="btn ml-5 sm:ml-0">New execution</Button>
    </div>
    <BookFillingGrid />
    <teleport to="body">
      <NewExecutionModal v-if="creationModalIsVisible" @close="CloseCreationModal" />
    </teleport>
  </div>
</template>

<style scoped lang="scss">
  .expanded {
    height: calc(100vh - 280px);
  }
</style>