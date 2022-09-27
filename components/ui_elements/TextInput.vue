<script setup lang="ts">
const props = defineProps(["placeholder", "type", "value"]);
const emit = defineEmits(['update:value'])

const value = ref(props.value)
</script>

<template>
  <input
    :type="props.type"
    class="input-text"
    :placeholder="props.placeholder"
    :value="props.value"
    @input="$emit('update:value', $event.target.value)"
    tabindex="-1"
  />
</template>

<style lang="scss" scoped></style>
