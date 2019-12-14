<template>
  <div class="container">{{index}}</div>
</template>

<script>
export default {
  name: "Cell",
  props: ["index"],
  data() {
    return {
      hiden: true
    };
  }
};
</script>

<style scoped>
.container {
  width: 45px;
  height: 45px;

  text-align: center;
}
</style>