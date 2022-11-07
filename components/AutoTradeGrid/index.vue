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
  <div class="grid-auto-trader">
    <auto-trader-card-bot
        v-for="trader in autoTrader.getTraderList"
        :name="trader.name"
        :description="trader.description"
    />
  </div>
</template>

<style scoped>

</style>