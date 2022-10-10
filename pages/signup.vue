<script setup lang="ts">
definePageMeta({
  layout: "auth",
  loginRequired: false,
  middleware: ["is-unauthenticated"],
});
</script>
<template>
  <h1 class="text-display-1">entre</h1>
</template>
