<template>
  <div class="about">
    <div class="main-container">
      <div v-if="ready&&started" class="chrono">{{chrono.formattedTime}}</div>
      <div v-if="!ready" class="menu">
        <div class="game-name">SkillMeter</div>
        <div class="difficulty-buttons">
          <button @click="easy">Easy</button>
          <button @click="easy">Meduim</button>
          <button @click="easy">Hard</button>
        </div>
      </div>
      <div v-else class="menu">
        <div v-if="!started&&roundCount<=10" class="content">Ready</div>
        <div v-if="roundCount==11" class="content">
          <div>Rounds:{{roundCount-1}}|Average:0000</div>
          <button @click="reset">Retry</button>
        </div>
      </div>
      <div class="game-area">
        <Target @targetFound="foundTarget" :state="state" :x="x" :y="y" />
      </div>
      <div v-if="roundCount<=10" class="records">
        <div v-for="(record,i) in records" :key="i" class="record">{{i+1}}-{{record}}</div>
      </div>
      <GoBack style="grid-area:records" :topY="'93%'" :leftX="'3.5%'" />
    </div>
  </div>
</template>

<script>
import Target from "../components/skillMeter/Target";
import GoBack from "../components/GoBack";
import Chronometer from "../utility/Chronometer";

const chrono = new Chronometer();
export default {
  name: "skillMeter",
  components: { Target, GoBack },
  data() {
    return {
      records: [],
      chrono,
      x: 50,
      y: 50,
      state: false,
      ready: false,
      started: false,
      roundCount: 0
    };
  },
  methods: {
    randomPos() {
      this.x = 250 + Math.random() * 900;
      this.y = 110 + Math.random() * 530;
    },
    foundTarget() {
      this.chrono.pause();
      this.records.push(this.chrono.formattedTime);
      this.chrono.reset();
      this.state = false;
      this.started = false;
      this.ready = true;
      this.roundCount++;
    },
    easy() {
      this.ready = true;
      this.roundCount++;
    },
    meduim() {
      this.ready = true;
      this.roundCount++;
    },
    hard() {
      this.ready = true;
      this.roundCount++;
    },
    reset() {
      this.started = false;
      this.ready = false;
      this.roundCount = 0;
      this.records = [];
    }
  },
  watch: {
    roundCount: {
      handler() {
        if (this.roundCount <= 10) {
          if (this.ready) {
            let xt = Math.random() * 5000;
            setTimeout(() => {
              this.started = true;
              this.chrono.start();
              this.randomPos();
              this.state = true;
            }, xt);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 250px auto 250px;
  grid-template-rows: 100px auto;
  grid-template-areas:
    "records chrono none"
    "records game game";
}

.records {
  grid-area: records;
  justify-self: center;
  align-self: center;
}

.difficulty-buttons {
  grid-row-start: 2;
  grid-row-end: 3;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
}
.content {
  font-size: 70px;
  grid-row-start: 2;
  grid-row-end: 3;
  justify-self: center;
  align-self: center;
}

.chrono {
  font-size: 80px;
  justify-self: center;
  align-self: center;
  grid-area: chrono;
}

.game-name {
  font-size: 40px;
  color: black;
  text-align: center;
  grid-row-start: 1;
  grid-row-end: 2;
  justify-self: center;
  align-self: flex-end;
}
.menu {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  display: grid;
  grid-template-rows: 100px auto;
}
.game-area {
  grid-area: game;
  background-color: transparent;
}
</style>