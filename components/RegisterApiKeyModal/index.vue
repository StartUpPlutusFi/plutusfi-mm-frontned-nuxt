<script setup lang="ts">
import autoAnimate from "@formkit/auto-animate";
import { useModalApiCredential } from "~~/storage/modals/apikey";

type CredentialForm = {
  api: string;
  secrete: string;
};

const modal = useModalApiCredential();
const overlay = ref<HTMLDivElement>();
const credentials = ref<CredentialForm>({ api: "", secrete: "" });

// useMeta({
//   bodyAttrs: {
//     class: modal.isShow ? "overflow-hidden" : "",
//   },
// });

watch(modal, () => {
  if (modal.isShow) {
    document.body.classList.add("overflow-hidden")
  } else {
    document.body.classList.remove("overflow-hidden")
  }
})


const close = () => {
  modal.setShow(false);
};

const clearForm = () => {
  credentials.value.api = "";
  credentials.value.secrete = "";
}

const HandleCreateCredentials = () => {
  for (const key in credentials.value) {
    console.log(key, credentials.value[key]);
    
  }
}

</script>
<template>
  <div
    ref="overlay"
    v-if="modal.isShow"
    class="overlay min-h-screen w-full top-0 left-0 fixed flex items-center justify-center"
  >
    <div class="w-full md:w-fit p-4 mx-5 bg-plutusfi-login-bg-color rounded-md relative">
      <button
        @click="close()"
        class="absolute right-2 top-2 rounded-full hover:bg-gray-400 hover:text-white transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          />
        </svg>
      </button>
      <form action="">
        <h3 class="text-2xl">API Credentils</h3>
        <div class="mb-3">
          <label for="#id_apikey">API Key</label>
          <input
            type="text"
            id="id_apikey"
            placeholder="API KEY"
            class="w-full outline-none px-3 py-2"
            v-model="credentials.api"
          />
        </div>
        <div class="mb-3">
          <label for="#id_apikey">API Secret</label>
          <input
            type="text"
            id="id_apikey"
            placeholder="API Secret"
            class="w-full outline-none px-3 py-2"
            v-model="credentials.secrete"
          />
        </div>
      </form>
      <div class="flex gap-2">
        <button @click="HandleCreateCredentials()" class="btn w-full btn-primary">Save</button>
        <button @click="clearForm()" class="btn w-full">Clear</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  background-color: #0000004d;
}
</style>
