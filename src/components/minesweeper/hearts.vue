<template>
  <div class="hearts-holder">
    <div v-for="i in difficulty" :key="i">
      <div v-if="i<=difficulty-errors">
        <img class="heart" src="../../assets/white_heart.png" alt="<3" />
      </div>
      <div v-else>
        <img class="heart" src="../../assets/grey_heart.png" alt="</3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hearts",
  props: ["difficulty", "errors"]
};
</script>

<style scoped>
.heart {
  max-width: 30px;
  max-height: 30px;
}

.hearts-holder {
  display: flex;
  justify-content: center;
}
</style>