<script setup lang="ts">
import autoAnimate from "@formkit/auto-animate";

const show = ref<boolean>(true);
const overlay = ref<HTMLDivElement>();

useMeta({
  bodyAttrs: {
    class: show.value ? "overflow-hidden" : "",
  },
});

onMounted(() => {
  autoAnimate(overlay.value);
});

const close = () => {
  show.value = false;
}

</script>
<template>
  <div
    ref="overlay"
    v-if="show"
    class="overlay min-h-screen w-full top-0 left-0 fixed flex items-center justify-center"
  >
    <div class="w-full md:w-fit p-4 bg-gray-300 rounded-md relative">
      <button
        @click.prevent="close()"
        class="absolute right-2 top-2 rounded-full hover:bg-gray-400 hover:text-white transition-colors p-1 h-8 w-8"
      >
      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
      </button>
      <form action="">
        <h3 class="text-2xl">
          API Credentils
        </h3>
        <div class="mb-3">
          <label for="#id_apikey">API Key</label>
          <input
            type="text"
            id="id_apikey"
            placeholder="API KEY"
            class="w-full outline-none px-3 py-2"
          />
        </div>
        <div class="mb-3">
          <label for="#id_apikey">API Secret</label>
          <input
            type="text"
            id="id_apikey"
            placeholder="API KEY"
            class="w-full outline-none px-3 py-2"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  background-color: #0000004d;
}
</style>
