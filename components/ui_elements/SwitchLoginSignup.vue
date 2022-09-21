<script setup lang="ts">
const checked = ref<boolean>(false);
const handleCheckedState = () => {
  checked.value = !checked.value;
};
</script>

<template>
  <div class="absolute z-20 top-5 right-1/4">
    <div class="switcher_wrapper">
      <input type="checkbox" name="switcher" id="switcher" v-model="checked" />
      <div class="component_swap_area">
        <div class="toggler"></div>
        <label for="">login</label>
        <label for="">signup</label>
      </div>
      <div class="trigger" @click="handleCheckedState()"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
.switcher_wrapper {
  background-color: #3c3c3c;
  border-radius: 30px;
  width: 140px;
  height: 40px;
  padding-inline: 1px;
  position: relative;

  .trigger {
    z-index: 20;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 30px;
    cursor: pointer;
  }
}
.switcher_wrapper input[type="checkbox"] {
  display: none;
}

.switcher_wrapper
  input[type="checkbox"]:checked
  ~ .component_swap_area
  label:nth-child(2) {
  color: #68bad4 !important;
}

.switcher_wrapper
  input[type="checkbox"]:checked
  ~ .component_swap_area
  .toggler {
  left: 50% !important;
}

.switcher_wrapper
  input[type="checkbox"]:not(:checked)
  ~ .component_swap_area
  label:nth-child(3) {
  color: #68bad4 !important;
}

.switcher_wrapper .component_swap_area {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: bisque; */
}

.switcher_wrapper .component_swap_area .toggler {
  width: 50%;
  height: 38px;
  position: absolute;
  top: 1px;
  left: 0;
  border-radius: 30px;
  background-color: #68bad4;
  transition: left 0.3s;
}
.switcher_wrapper .component_swap_area label {
  z-index: 10;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  transition: color 0.3s;
}

.switcher_wrapper .component_swap_area label:nth-child(2) {
  margin-left: 13px !important;
}

.switcher_wrapper .component_swap_area label:nth-child(3) {
  margin-right: 8px !important;
}

.toggler.checked {
  left: 50% !important;
}
</style>
