<script setup lang="ts">
  useMeta({
    title: "PlutusFi MM"
  })
</script>
<template>
  <ui-elements-loader>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ui-elements-loader>
</template>

<style lang="scss">
  /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>