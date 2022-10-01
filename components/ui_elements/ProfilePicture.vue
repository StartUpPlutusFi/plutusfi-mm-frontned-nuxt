<script setup lang="ts">
import { useProfile } from "~~/storage/profile";

const apiURL = import.meta.env?.VITE_BACKEND_BASE_URL;
const profile = useProfile();

const file = ref<File>()

const picture = ref<string>(`url("/defaul-profile-pic.png")`);

watch(profile, () => {
  if (profile.get.picture !== null) {
    picture.value = `url(${apiURL}${profile.get?.picture})`;
  }
});
onBeforeMount(async () => {
  await profile.getProfile();
});

const onFileChange = (e: Event) => {
    console.log(e.target.files)
}

const clickOnFile = () => {
    file.value.click()
}


</script>

<template>
  <div
    class="h-12 w-12 profile-pic rounded-full"
    :style="{ backgroundImage: picture }"
    style="background-position: center; background-size: cover"
  >
    <div
    @click="clickOnFile"
      class="w-full h-full bg-black rounded-full opacity-0 justify-center items-center hover:opacity-50 flex cursor-pointer"
    >
      <img src="/icon/photo-camera-interface-symbol-for-button.png" width="20" height="20" />
    </div>
    <input @change="onFileChange" ref="file" type="file" class="hidden" accept="image/*"/>
  </div>
</template>

<style lang="scss" scoped></style>
