<script setup lang="ts">
import { useLoader } from '~~/storage/loader';

const loader = useLoader()

</script>
<template>
  <div class="loader-wrap" :class="{'show': loader.getLoading}">
    <div class="overlay">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.loader-wrap.show > .overlay {
  display: flex;
  overflow: hidden;
}

.overlay {
  position: absolute;
  background: rgba(0, 0, 0, 0.582);
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: none;
  justify-content: center;
  align-items: center;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  top: 50px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
