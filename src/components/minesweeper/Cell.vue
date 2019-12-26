<template>
  <div
    class="container"
    :class="{hiden :hidden, showen : !hidden}"
    @click="reveal"
    @contextmenu="flag"
  >{{cellContent}}</div>
</template>

<script>
export default {
  name: "Cell",
  props: ["value", "hidden", "index"],
  data() {
    return { flagged: false };
  },
  methods: {
    reveal() {
      if (!this.flagged) {
        this.$emit("reveal-cell", this.index);
      }
    },
    flag() {
      if (this.hidden) {
        this.flagged = !this.flagged;
      }
    }
  },
  computed: {
    cellContent() {
      if (!this.hidden) {
        if (this.value == 0) {
          return "";
        } else return this.value;
      } else if (this.flagged) return "X";
      else return "";
    }
  }
};
</script>

<style scoped>
.container {
  width: 45px;
  height: 45px;
  text-align: center;
}

.hiden {
  background-color: rgb(76, 73, 73);
}

.showen {
  background-color: white;
}
</style>