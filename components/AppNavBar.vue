<script setup lang="ts">
const navRoutes: { to: string; text: string }[] = [
  { to: "/", text: "Automation" },
  { to: "/dashboard", text: "Dashboard" },
  { to: "/exchange", text: "Exchange" },
];
</script>
<template>
  <div class="w-full h-12 p-4 flex justify-between items-cente">
    <div>
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
        <div>
            <p>username</p>
        </div>
        <div>
            menu
        </div>
    </div>
  </div>
</template>
