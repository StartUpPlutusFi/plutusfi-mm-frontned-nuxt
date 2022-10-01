<script setup lang="ts">
const navRoutes: { to: string; text: string }[] = [
  { to: "/", text: "Automation" },
  { to: "/dashboard", text: "Dashboard" },
  { to: "/exchange", text: "Exchange" },
];
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
        <li v-for="(route, index) in navRoutes" :key="index" class="inline-block px-1">
          <NuxtLink :to="route.to" v-text="route.text" class="app-link"></NuxtLink>
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
