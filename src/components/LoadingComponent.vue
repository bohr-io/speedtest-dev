<template>
  <div class="loading__screen">
    <img
      src="../assets/svg/loading.svg"
      style="margin: 0 auto; display: block"
      alt=""
    />
  </div>
</template>
<style scoped>
.loading__screen {
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 100px);
  background-color: hsla(25, 85%, 5%, 1);
  z-index: 200;
}
</style>
