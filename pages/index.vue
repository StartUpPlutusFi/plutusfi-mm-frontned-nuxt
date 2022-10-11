<script lang="ts" setup>
import { ConcreteComponent } from "vue";
// import { AutoTrader } from "~~/.nuxt/components";

definePageMeta({
  loginRequired: true,
  middleware: ["is-authenticated"],
});

const app = {
  components: [
    { name: "autotrader", component: resolveComponent("AutoTrader") },
    { name: "bookfilling", component: resolveComponent("BookFilling") },
  ],
  selectComponent(name: string): ConcreteComponent {
    return this.components.find((component) => component.name === name)
      .component;
  },
};

const componentName = ref<string>("autotrader");
const componentIs = computed(() => app.selectComponent(componentName.value))

</script>

<template>
  <div class="flex grow flex-col items-center">
    <div class="sub-menu">
      <ul class="list-none flex items-center">
        <li class="inline-block">
          <button
            @click.prevent="componentName = 'autotrader'"
            class="text-sm text-gray-300 hover:text-gray-50 transition-colors"
            to="#"
          >
            Auto Trader
          </button>
        </li>
        <li class="inline-block mx-2">
          <div style="width: 2px" class="h-5 bg-white rounded-sm"></div>
        </li>
        <li class="inline-block">
          <button
            @click.prevent="componentName = 'bookfilling'"
            class="text-sm text-gray-300 hover:text-gray-50 transition-colors"
            to="#"
          >
            Book Filling
          </button>
        </li>
      </ul>
    </div>
    <div class="grow w-full">
      <component :is="componentIs" />
    </div>
  </div>
</template>
