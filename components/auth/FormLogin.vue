<script setup lang="ts">
import { createToast } from "mosha-vue-toastify";
import { LoginAPI } from "~/server/auth/login";
import { useAuthStore } from "~~/storage/auth/auth";
import { AuthCredentials } from "~~/storage/auth/interfaces";
import { useLoader } from "~~/storage/loader";

const loader = useLoader();
const auth = useAuthStore();
const credentials = ref<FormData>({ username: "", password: "" });
const wasScrolled = ref<boolean>(false);
const scrolledArea = ref(null);

const SideScrollForm = () => {
  wasScrolled.value = !wasScrolled.value;
  if (typeof scrolledArea.value !== null) {
    if (wasScrolled.value) {
      scrolledArea.value.scrollTo({
        top: 0,
        left: scrolledArea.value.scrollWidth,
        behavior: "smooth",
      });
    } else {
      scrolledArea.value.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }
};
const handleLogin = async () => {
  try {
    loader.setLoading(true);
    const data = await LoginAPI(credentials.value);
    
    if (data) {
      auth.setAuthCredentials(data);
      navigateTo("/")
      createToast("Login Success", {
        type: "success",
        position: "top-center"
      })
    }
  } finally {
    loader.setLoading(false);
  }
};
</script>
<template>
  <form action="" class="flex flex-col items-center justify-around h-full">
    <div
      class="flex flex-col justify-center w-full items-center text-white mb-12"
    >
      <h1 class="text-white lg:text-display-6 text-2xl font-normal">
        Welcome Back!
      </h1>
      <p>make login again!</p>
    </div>

    <div
      ref="scrolledArea"
      id="row-input"
      class="max-w-full overflow-hidden gap-12 md:w-60 w-1/2"
    >
      <ui-elements-text-input
        placeholder="Username"
        type="text"
        v-model:value="credentials.username"
      />
      <ui-elements-text-input
        placeholder="Password"
        type="password"
        v-model:value="credentials.password"
      />
    </div>
  </form>
  <div class="flex justify-between items-center md:w-60 mt-5 m-auto">
    <ui-elements-button v-if="!wasScrolled" text="Next" @roll="SideScrollForm()" />
    <ui-elements-button v-else text="Login" @roll="handleLogin()" />
    <a
      href="#"
      v-if="!wasScrolled"
      class="text-gray-400 hover:text-gray-200 transition-colors whitespace-nowrap mx-5"
      >forgot password?
    </a>
    <a
      href="#"
      v-else
      class="text-gray-400 hover:text-gray-200 transition-colors mx-5"
      @click="SideScrollForm()"
      >back
    </a>
  </div>
  <div class="flex flex-col items-center mt-10 text-white">
    <div class="flex justify-center items-center gap-2 w-full">
      <div class="line"></div>
      <label>or</label>
      <div class="line"></div>
    </div>
    <div class="grid grid-cols-3 justify-items-center w-full mt-10">
      <a href="#">Google</a>
      <a href="#">Facebook</a>
      <a href="#">Github</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#row-input {
  display: flex;
}
</style>
