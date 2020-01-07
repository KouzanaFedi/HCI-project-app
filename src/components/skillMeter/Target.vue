<template>
  <div :class="state ? 'show':'hide'">
    <div
      @click="$emit('targetFound')"
      class="ring"
      :style="{top : `${y}px`,left : `${x}px`}"
      :class="scaleRing"
    >
      <div class="moving-object" :class="scaleTarget"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Target",
  props: ["diff", "state", "x", "y"],
  computed: {
    scaleTarget() {
      if (this.diff === 3) return "easy";
      else if (this.diff === 2) return "meduim";
      else return "hard";
    },
    scaleRing() {
      if (this.diff === 3) return "easy-ring";
      else if (this.diff === 2) return "meduim-ring";
      else return "hard-ring";
    }
  }
};
</script>

<style scoped>
.moving-object {
  background-color: #ea98fe;
  border-radius: 100%;
}
.moving-object:hover {
  cursor: pointer;
}
.show {
  display: flex;
}
.hide {
  display: none;
}
.ring {
  filter: blur(1px);
  position: relative;
  border-radius: 100%;
  background-color: transparent;
  position: absolute;
  border: 3px solid #caa4f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.easy {
  width: 35px;
  height: 35px;
  opacity: 1;
}
.easy-ring {
  width: 80px;
  height: 80px;
  opacity: 1;
}
.meduim {
  width: 25px;
  height: 25px;
  opacity: 0.85;
}
.meduim-ring {
  width: 60px;
  height: 60px;
  opacity: 0.85;
}
.hard {
  width: 15px;
  height: 15px;
  opacity: 0.7;
}
.hard-ring {
  width: 40px;
  height: 40px;
  opacity: 0.7;
}
</style>