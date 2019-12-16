<template>
  <div
    class="container"
    :class="{hiden :hiden, showen : !hiden}"
    @click="reveal"
    @contextmenu="changeflag"
  >{{cellContent}}</div>
</template>

<script>
import EventBus from "../../buses/minesweeperEventBus";

export default {
  name: "Cell",
  props: ["index", "value"],
  data() {
    return {
      hiden: true,
      flag: false
    };
  },
  methods: {
    reveal() {
      if (!this.flag) {
        this.hiden = false;
        if (this.value == -1) {
          this.$emit("reveal-mines");
        }
      }
    },
    changeflag() {
      if (this.hiden) {
        this.flag = !this.flag;
      }
    },
    show() {
      if (!this.flag) {
        this.hiden = false;
      }
    }
  },
  computed: {
    cellContent() {
      if (!this.hiden) return this.value;
      else if (this.flag) return "X";
      else return "";
    }
  },
  mounted() {
    let { i, j } = this.index;
    EventBus.$on("delete-cell", element => {
      let { rowIndex, columnIndex } = element;
      if (i == rowIndex && j == columnIndex) {
        this.show();
      }
    });
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