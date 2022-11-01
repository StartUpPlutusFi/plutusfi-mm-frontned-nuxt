<script setup lang="ts">
import { CreataApiCredentials, LoadExchanges } from "~~/server/apiCreds";
import { Exchange, CredentialForm } from "~~/server/apiCreds/types";
import { useModalApiCredential } from "~~/storage/modals/apikey";

const exchanges: Exchange[] = [];

const modal = useModalApiCredential();
const addDescription = ref<boolean>(false);
const overlay = ref<HTMLDivElement>();
const credentials = ref<CredentialForm>({
  api_key: "",
  api_secret: "",
  exchange: 0,
  description: "",
  default: false,
});

const loadExchanges = async () => {
  const data = await LoadExchanges();
  exchanges.push(...data);
};

watch(modal, () => {
  if (modal.isShow) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

onMounted(() => {
  loadExchanges();
});

const close = () => {
  modal.setShow(false);
  addDescription.value = false;
  clearForm();
};

const clearForm = () => {
  credentials.value.api_key = "";
  credentials.value.api_secret = "";
  credentials.value.default = false;
  credentials.value.description = "";
  credentials.value.exchange = 0;
};

const setExchange = (e: Event): void => {
  credentials.value.exchange = Number(e.target.value);
};

const MountBody = (): FormData => {
  const body = new FormData();

  body.append("api_key", credentials.value.api_key);
  body.append("api_secret", credentials.value.api_secret);
  body.append("default", credentials.value.default.toString());
  body.append("exchange", credentials.value.exchange.toString());
  if (credentials.value.description !== "") {
    body.append("description", credentials.value.description);
  }

  return body;
};

const handleCreateCredentials = async () => {
  const data = await CreataApiCredentials(credentials.value);
  console.log("data", data);
};

const overlayClose = (e: Event) => {
  if (e.target.classList.contains("overlay")) {
    close();
  }
};
</script>
<template>
  <transition name="slide-fade">
    <div
      v-if="modal.isShow"
      class="overlay min-h-screen w-full top-0 left-0 fixed z-10"
      @click="overlayClose"
    >
      <div
        class="w-full h-screen z-20 md:w-fit p-4 bg-gray-700 text-gray-200 fixed right-0 top-0 flex flex-col"
      >
        <button
          @click="close()"
          class="absolute right-2 top-2 rounded-full hover:bg-gray-400 hover:text-black transition-colors"
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
              class="w-full outline-none px-3 py-2 text-gray-600 rounded-md"
              v-model="credentials.api_key"
            />
          </div>
          <div class="mb-3">
            <label for="#id_apikey">API Secret</label>
            <input
              type="text"
              id="id_apikey"
              placeholder="API Secret"
              class="w-full outline-none px-3 py-2 text-gray-600 rounded-md"
              v-model="credentials.api_secret"
            />
          </div>
          <div class="mb-3">
            <label for="#id_default">default</label>
            <input
              v-model="credentials.default"
              type="checkbox"
              id="id_default"
              class="ml-2 outline-none"
            />
          </div>
          <div class="mb-3">
            <select
              @change="setExchange"
              class="w-full p-1 text-gray-500 outline-none rounded-md"
            >
              <option value="0">------</option>
              <option
                v-for="(value, key) in exchanges"
                :key="key"
                :value="value.id"
              >
                {{ value.name }}
              </option>
            </select>
          </div>
          <div class="mb-3 flex flex-col">
            <button
              v-if="!addDescription"
              @click="addDescription = true"
              class="btn"
            >
              add description
            </button>
            <textarea
              v-if="addDescription"
              v-model="credentials.description"
              class="text-gray-500 p-1 resize-none rounded-md"
              rows="5"
            ></textarea>
          </div>
        </form>
        <div class="flex gap-2">
          <button
            @click="handleCreateCredentials()"
            class="btn w-full btn-primary"
          >
            Save
          </button>
          <button @click="clearForm()" class="btn w-full">Clear</button>
        </div>
        <api-credential-list />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.overlay {
  background-color: #0000004d;
}
</style>
