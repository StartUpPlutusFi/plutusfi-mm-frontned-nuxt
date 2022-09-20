<script setup lang="ts">
import { useAuthStore } from "@/storage/auth";
const authStore = useAuthStore();

watch(authStore, () => {
  localStorage.setItem("token", authStore.token)
})

</script>

<template>
  <div>
    <p>
      store: {{ authStore.getToken }}
    </p>
    <p>
      <input type="text" v-model="authStore.token">
    </p>
  </div>
</template>
