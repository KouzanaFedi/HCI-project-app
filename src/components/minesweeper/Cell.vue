<template>
  <div
    class="container"
    :class="{hiden :hiden, showen : !hiden}"
    @click="reveal"
    @contextmenu="changeCautious"
  >{{cellContent}}</div>
</template>

<script>
export default {
  name: "Cell",
  props: ["index"],
  data() {
    return {
      hiden: true,
      cautious: false
    };
  },
  methods: {
    reveal() {
      if (!this.cautious) {
        this.hiden = false;
      }
    },
    changeCautious() {
      if (this.hiden) {
        this.cautious = !this.cautious;
      }
    }
  },
  computed: {
    cellContent() {
      if (!this.hiden) return this.index;
      else if (this.cautious) return "X";
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