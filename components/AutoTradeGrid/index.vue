<script setup lang="ts">
import {AutoTraderCardBot} from "#components";
import {useAutoTrader} from "~/storage/autotrader/auto-trader-store";
import {onBeforeMount} from "#imports";

const autoTrader = useAutoTrader()

onBeforeMount(async () => {
  await autoTrader.LoadTraders()
  console.log(autoTrader.getTraderList)
})
</script>

<template>
  <transition-group tag="ul" class="grid-auto-trader" name="list">
    <auto-trader-card-bot
        v-for="trader in autoTrader.getTraderList"
        :name="trader.name"
        :description="trader.description"
    />
  </transition-group>
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