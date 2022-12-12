<script setup lang="ts">
import {useModalApiCredential} from "~~/storage/modals/apikey";
import {AutoTradeGrid} from "#components";
import {ref} from "#imports";
import {onClickOutside} from "@vueuse/core";

const modal = useModalApiCredential();
const showOptionsMenu = ref<boolean>(false);
const optionMenuRef = ref<HTMLElement>()
const gridLayout = ref<HTMLSelectElement>();
const showCreateAutoTraderModal = ref<boolean>(false)


const closeCreateAutoTradeModal = () => {
  showCreateAutoTraderModal.value = false
}

const changeLayout = () => {
  console.log(gridLayout.value.value);
};

const showModal = () => {
  modal.setShow(true);
};

const closeOptionMenu = () => {
  showOptionsMenu.value = false
}

onClickOutside(optionMenuRef, closeOptionMenu)
</script>
<template>
  <div class="container mx-auto">
    <h1 class="text-display-6 text-gray-300 ml-10 font-semibold">
      Auto Trader
    </h1>
    <div class="command-panel flex w-full justify-center gap-2 px-5">
      <button @click="showCreateAutoTraderModal = !showCreateAutoTraderModal" class="btn">New bot</button>
    </div>
    <div class="content">
      <div class="w-full flex justify-end">
        <div class="relative">
          <button
              @click="showOptionsMenu = !showOptionsMenu"
              class="text-gray-400 mr-4 hover:text-gray-100 transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path
                  fill="currentColor"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </button>
          <ul
              ref="optionMenuRef"
              v-show="showOptionsMenu"
              class="list-none absolute z-10 bg-gray-400 p-2 right-5 top-8 rounded-md"
          >
            <li
                @click="
                showModal();
                closeOptionMenu()
              "
                class="whitespace-nowrap text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              API Credentials
            </li>
          </ul>
        </div>
        <select
            class="hidden"
            ref="gridLayout"
            @change="changeLayout"
            name="gridlayout"
            id="id_grid_layout"
        >
          <option value="default">Auto</option>
          <option value="2">2 cols</option>
          <option value="4">4 cols</option>
        </select>
      </div>
      <auto-trade-grid/>
    </div>
    <teleport to="body">
      <transition name="slide-fade">
        <register-api-key-side-modal/>
      </transition>
    </teleport>
    <teleport to="body">
      <create-auto-trader-modal v-if="showCreateAutoTraderModal" @close-modal="closeCreateAutoTradeModal"/>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
