<script setup lang="ts">
import { useProfile } from "~~/storage/profile";
import autoAnimate from "@formkit/auto-animate";
import { useAuthStore } from "~~/storage/auth/auth";

const showSettingsMenu = ref<boolean>(false);
const dropdown = ref<HTMLDivElement>();
const profile = useProfile();
const auth = useAuthStore();
const router = useRouter();

const toggle = () => {
  showSettingsMenu.value = !showSettingsMenu.value;
};

const logout = () => {
  profile.clear();
  auth.clear();
  navigateTo("/login");
};

onMounted(() => {
  autoAnimate(dropdown.value);
});
</script>
<template>
  <div class="md:w-40 h-full flex relative" ref="dropdown">
    <div class="px-3 text-right">
      <p class="capitalize text-gray-300 hover:text-white">
        {{ profile.get?.user.username }}
      </p>
      <span class="cursor-pointer text-sm text-gray-400" @click="toggle()"
        >settings</span
      >
    </div>
    <ui-elements-profile-picture />
    <div
      v-if="showSettingsMenu"
      class="absolute top-12 right-24 bg-gray-500 z-20 p-1 block rounded-md"
    >
      <ul class="list-none text-gray-300">
        <li class="list-link">Settings</li>
        <li
          class="list-link"
          @click="
            toggle();
            logout();
          "
        >
          Logout
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show {
  display: block !important;
  opacity: 1;
  transition: opacity 0.3s;
}
</style>
