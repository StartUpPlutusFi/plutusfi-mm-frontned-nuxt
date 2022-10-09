<script setup lang="ts">
const gridLayout = ref<HTMLSelectElement>()
const changeLayout = () => {
    console.log(gridLayout.value.value);
    
}
</script>
<template>
  <div class="container mx-auto">
    <h1 class="text-display-6 text-gray-300 ml-10 font-semibold">
      Auto Trader
    </h1>
    <div class="command-panel flex w-full justify-center gap-2">
      <button class="btn">add</button>
      <button class="btn">stop all open orders</button>
    </div>
    <div class="content">
        <div class="w-full flex justify-end">
            <select ref="gridLayout" @change="changeLayout" name="gridlayout" id="id_grid_layout">
                <option value="default">Auto</option>
                <option value="2">2 cols</option>
                <option value="4">4 cols</option>
            </select>
        </div>
        <div class="grid-auto-trader">
            <auto-trader-card-bot v-for="n in 12"/>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
