<script setup lang="ts">
import { useNavBar } from "~~/storage/navbar";
import { urlpatterns } from "./routes";

const route = useRoute();
const navbar = useNavBar();

onBeforeMount(() => {
  navbar.addRoutes(urlpatterns);
  navbar.setActiveRoute(route.fullPath);
});

watch(route, () => {
  switch (route.fullPath) {
    case "/":
      navbar.setActiveRoute(route.fullPath);
      break;
    case "/dashboard":
      navbar.setActiveRoute(route.fullPath);
      break;
    case "/exchange":
      navbar.setActiveRoute(route.fullPath);
      break;
  }
});
</script>
<template>
  <div class="w-full h-fit p-4 flex justify-between items-center">
    <div class="flex justify-between items-cente">
      <nuxt-link to="/">
        <img
          src="@/assets/img/logo-with-text.svg"
          alt="plutusfi-brand-logo"
          class="h-8"
        />
      </nuxt-link>
    </div>
    <div>
      <ul class="list-none hidden md:w-fit md:block">
        <li
          v-for="(route, index) in navbar.getRoutes"
          :key="index"
          class="inline-block px-1"
        >
          <NuxtLink
            :to="route.path"
            v-text="route.text"
            class="app-link"
            :class="{ 'text-white': route.active }"
          ></NuxtLink>
          <div v-if="route.active" class="indicador"></div>
        </li>
      </ul>
    </div>
    <div class="flex gap-5">
      <div class="md:block hidden">
        <ui-elements-user-card />
      </div>
      <div class="sandwich-menu">
        <div class="h-1 w-6"></div>
        <div class="h-1 w-6"></div>
        <div class="h-1 w-6"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.indicador {
  height: 2px;
  width: 50%;
  margin: 0 auto;
  background-color: #ccc;
  border-radius: 2px;
}
</style>
