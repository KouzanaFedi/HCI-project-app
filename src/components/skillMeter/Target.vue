<template>
  <div
    @click="$emit('targetFound')"
    class="moving-object"
    :style="{top : `${y}px`,left : `${x}px`}"
    :class="state ? 'show':'hide'"
  ></div>
</template>

<script>
export default {
  name: "Target",
  props: ["state", "x", "y"]
};
</script>

<style scoped>
.moving-object {
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 100%;
  position: absolute;
}

.moving-object:hover {
  cursor: pointer;
}

.show {
  display: block;
}
.hide {
  display: none;
}
</style>