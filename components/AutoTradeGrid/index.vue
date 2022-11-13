<script setup lang="ts">
import {AutoTraderCardBot} from "#components";
import {useAutoTrader} from "~/storage/autotrader/auto-trader-store";
import {onBeforeMount} from "#imports";

const autoTrader = useAutoTrader()

onBeforeMount(async () => {
  await autoTrader.LoadTraders()
})

const DeleteBot = async (index: number) => {
  await autoTrader.DeleteBot(index)
}

</script>

<template>
  <Suspense>
  <template #default>
    <transition-group tag="ul" class="grid-auto-trader" name="list">
      <auto-trader-card-bot
          v-for="(trader, index) in autoTrader.getTraderList"
          :index="index"
          :name="trader.name"
          :description="trader.description"
          @delete="DeleteBot"
      />
    </transition-group>
  </template>
    <template #fallback>
      <p class="text-display-1">Loading</p>
    </template>
  </Suspense>
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