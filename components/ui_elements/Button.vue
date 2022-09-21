<script setup lang="ts">
const props = defineProps(["text"])
const emit = defineEmits(["roll"]);
const callEmitRoll = () => {
  emit("roll");
};
</script>
<template>
  <button @click="callEmitRoll()" v-text="props.text" class="btn btn-primary btn-expand"></button>
</template>
