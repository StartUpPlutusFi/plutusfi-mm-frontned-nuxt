<template>
  <div class="container max-w-full bg-plutusfi-login-bg-color flex flex-col items-center justify-center">
    <nuxt-link to="/">
      <img src="~/assets/svg/logo-with-text.svg" alt="logo" class="absolute z-20 top-5 left-5 h-8">
    </nuxt-link>
    <ui-elements-switch-login-signup/>
    <div
      id="bg_tiles"
      class="min-w-full h-screen opacity-30 static inset-0 z-10"
    ></div>
    <div id="form_wrapper" class="">
      <slot />
    </div>
    <div id="wave" class="absolute bottom-0 w-full z-10">
      <img src="~/assets/svg/wave.svg"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#bg_tiles {
  background-image: url("~/assets/img/oriental-tiles.png");
}
</style>
