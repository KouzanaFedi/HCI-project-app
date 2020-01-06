<template>
  <router-link to="/">
    <img :style="{top :topY,left :leftX}" src="../assets/back_icon.png" alt="<" class="back-icon" />
  </router-link>
</template>

<script>
export default {
  name: "GoBack",
  props: ["topY", "leftX"]
};
</script>

<style scoped>
.back-icon {
  width: 30px;
  height: 30px;
  position: absolute;
}
</style>