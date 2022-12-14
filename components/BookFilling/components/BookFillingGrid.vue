<script setup lang="ts">
import {GenericSideModal} from "#components";
import {useBookFiller} from "~/storage/bookfiller/bookfiller_storage";
import {onBeforeMount} from "vue";
import BookFillinExecutionCard from "~/components/BookFilling/components/BookFillerExecutionCard.vue";
import {useApiCredentials} from "~/storage/apikeys";
import {createToast} from "mosha-vue-toastify";
import BookFillerUpdateForm from "~/components/BookFilling/components/BookFillerUpdateForm.vue";
import {useSideModal} from "~/storage/generics/sideModal";

const bookfiller = useBookFiller()
const api_credentials = useApiCredentials()

const sideModal = useSideModal()
const indexUpdate = ref<number>(0)

onBeforeMount(async () => {
  await bookfiller.LoadExecutions()
  await api_credentials.LoadCrendentials()

})

const CloseUpdateModal = () => {
  sideModal.Close()
}

const OpenUpdateModal = () => {
  sideModal.Open()
}

const HandleUpdateExecution = (index: number) => {
  if (index > bookfiller.GetExecutionsList.length) {
    createToast("Execution invalid for this ID.", {
      type: "warning",
      position: "top-left"
    })
    return
  }
  indexUpdate.value = index
  OpenUpdateModal()
}

</script>

<template>
  <div>
    <div
        class="grid grid auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-auto expanded p-1 mx-5 sm:mx-0">
      <BookFillinExecutionCard
          v-for="(execution, index) in bookfiller.GetExecutionsList"
          :data="execution"
          :index="index"
          @detail="HandleUpdateExecution"
      />
    </div>
    <teleport to="body">
      <GenericSideModal
          @close="CloseUpdateModal()"
          v-if="sideModal.IsOpen">
        <BookFillerUpdateForm :index="indexUpdate"/>
      </GenericSideModal>
    </teleport>
  </div>
</template>

<style scoped>

</style>