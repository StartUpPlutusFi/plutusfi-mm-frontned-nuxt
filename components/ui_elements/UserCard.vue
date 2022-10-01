<script setup lang="ts">
const showSettingsMenu = ref<boolean>(false);

const toggle = () => {
  showSettingsMenu.value = !showSettingsMenu.value;
};

</script>
<template>
  <div class="md:w-40 h-full flex relative">
    <div class="px-3 text-right">
      <p class="capitalize text-gray-300 hover:text-white">username</p>
      <span class="cursor-pointer text-sm text-gray-400" @click="toggle()"
        >settings</span
      >
    </div>
    <ui-elements-profile-picture />
    <div
      :class="{ show: showSettingsMenu }"
      class="absolute top-12 right-20 bg-gray-500 p-5 z-20 hidden opacity-0"
    >
      <ul>
        <li>option</li>
        <li>option</li>
        <li>option</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show {
  display: block !important;
  opacity: 1;
  transition: opacity 0.3s;
}
</style>
