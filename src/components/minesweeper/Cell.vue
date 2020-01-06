<template>
  <div class="holder" @click="reveal" @contextmenu="flag">
    <div :class="hidden ? 'element-hidden' : 'element-showen'">
      <div class="effect-div" :class="hidden ? 'effect-div-hidden' : 'effect-div-showen'">
        <img v-if="flagged" src="../../assets/flag_red.png" alt="?" class="flag" />
        <div v-if="!hidden">
          <div v-if="value>0" class="index" :class="color">{{cellContent}}</div>
          <img v-if="value==-1" src="../../assets/mines_icon.png" alt="X" class="mine" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: ["value", "hidden", "index", "flagged", "firstTouch"],

  methods: {
    reveal() {
      if (!this.flagged) {
        this.$emit("reveal-cell", this.index);
        if (this.firstTouch) {
          this.$emit("startTimer");
        }
      }
    },
    flag() {
      if (this.hidden) {
        this.$emit("flag", this.index);
      }
    }
  },
  computed: {
    cellContent() {
      if (this.value == 0) return "";
      else return this.value;
    },
    color() {
      switch (this.value) {
        case 1:
          return "num1";
        case 2:
          return "num2";
        case 3:
          return "num3";
        case 4:
          return "num4";
        case 5:
          return "num5";
        case 6:
          return "num6";
        case 7:
          return "num7";
        case 8:
          return "num8";
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>
.holder {
  width: 35px;
  height: 35px;
  margin: 3px;
  text-align: center;
  border-radius: 10%;
  box-shadow: -5px -5px 5px black;
  background-color: #444362;
}

.mine {
  margin-top: 1px;
  max-width: 30px;
  max-height: 30px;
}
.flag {
  max-width: 30px;
  max-height: 30px;
}

.index {
  margin-top: 3px;
  font-size: 20px;
  font-weight: bold;
}

.element-hidden {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: inherit;
  display: inline-block;
  margin-top: 1px;
}
.effect-div-hidden {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: transparent;
  display: inline-block;
  margin-top: 1px;
}

.element-showen {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: inherit;
  display: inline-block;
  margin-top: 1px;
  box-shadow: inset -5px 5px 5px 1px #121219;
}
.effect-div-showen {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: transparent;
  display: inline-block;
  margin-top: 1px;
  box-shadow: inset 5px -5px 10px #5b5b76;
}

.num1 {
  color: #2e8137;
}
.num2 {
  color: #4988af;
}
.num3 {
  color: #b6261c;
}
.num4 {
  color: #7d005c;
}
.num5 {
  color: #b8b01f;
}
.num6 {
  color: #9e7237;
}
.num7 {
  color: #481514;
}
.num8 {
  color: #000;
}
</style>