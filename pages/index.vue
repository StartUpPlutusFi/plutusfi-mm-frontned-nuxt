<script lang="ts" setup>
definePageMeta({
  loginRequired: true,
  middleware: ["is-authenticated"],
});
</script>

<template>
  <div>
    <h1 class="text-display-1">Index</h1>
  </div>
</template>
