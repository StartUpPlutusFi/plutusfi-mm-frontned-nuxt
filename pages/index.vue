<script lang="ts" setup>
definePageMeta({
  loginRequired: true,
  middleware: ["is-authenticated"],
});
</script>

<template>
  <div>
    <h1 class="text-display-6 hidden md:block ml-10 text-gray-50">Auto Trader</h1>
  </div>
</template>
