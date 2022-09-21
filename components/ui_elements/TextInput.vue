<script setup lang="ts">
const props = defineProps(["placeholder", "type"])
</script>
<template>
    <input :type="props.type" class="input-text" :placeholder="props.placeholder">
</template>

<style lang="scss" scoped>

</style>