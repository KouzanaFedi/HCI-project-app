<template>
  <div>
    <video autoplay muted loop id="myVideo">
      <source src="../assets/background_vid2.mp4" type="video/mp4" />
    </video>
    <div class="main-container">
      <div v-if="ready&&started" class="chrono">{{chrono.formattedTime.slice(3)}}</div>
      <div v-if="!ready" class="menu">
        <div class="game-name">SkillMeter</div>
        <div class="difficulty-buttons">
          <button @click="easy">Easy</button>
          <button @click="meduim">Meduim</button>
          <button @click="hard">Hard</button>
        </div>
      </div>
      <div v-else class="menu">
        <div v-if="!started&&roundCount<=10" class="ready">Ready</div>
        <div v-if="roundCount==11" class="content">
          <div>Average {{average}} seconds</div>
          <button style="margin-top:50px;" @click="reset">Retry</button>
        </div>
      </div>
      <div class="game-area">
        <Target @targetFound="foundTarget" :diff="diff" :state="state" :x="x" :y="y" />
      </div>
      <div v-if="roundCount<=10&&ready" class="records">
        <div class="records-header">Previous rounds records</div>
        <div v-for="(record,i) in records" :key="i" class="record">
          <span>Round {{i+1}}</span>
          : {{record}}
        </div>
      </div>
      <GoBack style="grid-area:records" :topY="'93%'" :leftX="'1.5%'" />
    </div>
  </div>
</template>

<script>
import Target from "../components/skillMeter/Target";
import GoBack from "../components/GoBack";
import Chronometer from "../utility/Chronometer";

const chrono = new Chronometer(15);
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
      roundCount: 0,
      diff: 3
    };
  },
  methods: {
    randomPos() {
      this.x = 250 + Math.random() * 900;
      this.y = 110 + Math.random() * 530;
    },
    foundTarget() {
      this.chrono.pause();
      this.records.push(this.chrono.formattedTime.slice(3));
      this.chrono.reset();
      this.state = false;
      this.started = false;
      this.ready = true;
      this.roundCount++;
    },
    easy() {
      this.ready = true;
      this.roundCount++;
      this.diff = 3;
    },
    meduim() {
      this.ready = true;
      this.roundCount++;
      this.diff = 2;
    },
    hard() {
      this.ready = true;
      this.roundCount++;
      this.diff = 1;
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
            let xt = 1000 + Math.random() * 6000;
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
  },
  computed: {
    average() {
      let ms = 0;
      let s = 0;
      this.records.forEach(record => {
        ms += parseInt(record.slice(3));
        s += parseInt(record.slice(0, 2));
      });
      s += Math.floor(ms / 100);
      s = Math.floor(s / 10);
      ms = ms % 100;
      ms = Math.floor(ms / 10);
      return `${s / 10 > 0 ? s : "0" + s}:${ms}${Math.floor(
        Math.random() * 9
      )}`;
    }
  }
};
</script>

<style scoped>
#myVideo {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}
.main-container {
  position: absolute;
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
  height: 450px;
  width: 200px;
  border: 2px solid #acdffc;
}
.records-header {
  color: #acdffc;
  font-size: 25px;
  font-weight: bolder;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.record {
  color: #acdffc;
  font-size: 25px;
  margin-bottom: 4px;
  text-align: center;
}

.difficulty-buttons {
  height: 120px;
  grid-row-start: 2;
  grid-row-end: 3;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content {
  font-size: 70px;
  grid-row-start: 2;
  grid-row-end: 3;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #acdffc;
}
.ready {
  margin-bottom: 170px;
  font-size: 70px;
  grid-row-start: 2;
  grid-row-end: 3;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #acdffc;
}

.chrono {
  font-size: 80px;
  justify-self: center;
  color: #acdffc;
  align-self: center;
  grid-area: chrono;
}

button {
  width: 120px;
  height: 30px;
  background-color: #acdffc;
  color: #023476;
  border-radius: 50px;
  border: none;
  font-size: 17px;
  cursor: pointer;
  font-weight: 500;
}

.game-name {
  font-size: 80px;
  color: #acdffc;
  letter-spacing: 5px;
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