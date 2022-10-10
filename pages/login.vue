<script setup lang="ts">
definePageMeta({
  layout: "auth",
  loginRequired: false,
  middleware: ["is-unauthenticated"],
});
</script>
<template>
  <div>
    <auth-form-login />
  </div>
</template>
