<script setup lang="ts">
import {AutoTraderCardBot, UpdateAutoTradeBotModal} from "#components";
import {useAutoTrader} from "~/storage/autotrader/auto-trader-store";
import {onBeforeMount} from "#imports";

const autoTrader = useAutoTrader()
const showUpdateModal = ref<boolean>(false)
const focusUpdateId = ref<number>()

onBeforeMount(async () => {
  await autoTrader.LoadTraders()
})

const DeleteBot = async (index: number) => {
  await autoTrader.DeleteBot(index)
}

const CloseModal = () => {
  showUpdateModal.value = false;
  focusUpdateId.value = 0
}

const HandleShowModal = (id: number) => {
  focusUpdateId.value = id
  showUpdateModal.value = true
}
</script>

<template>
  <Suspense>
    <template #default>
      <transition-group tag="ul" class="grid-auto-trader" name="list">
        <auto-trader-card-bot
            v-for="(trader, index) in autoTrader.getTraderList"
            :key="index"
            :id="trader.id"
            :index="index"
            :name="trader.name"
            :description="trader.description"
            @delete="DeleteBot"
            @open-update="HandleShowModal"
        />
      </transition-group>
    </template>
    <template #fallback>
      <p class="text-display-1">Loading</p>
    </template>
  </Suspense>
  <teleport to="body">
    <UpdateAutoTradeBotModal
        @close-modal="CloseModal"
        v-if="showUpdateModal"
        :id="focusUpdateId"
    />
  </teleport>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>