<template>
  <div class="about">
    <router-link to="/">
      <img src="../assets/back_icon.png" alt="<" class="back-icon" />
    </router-link>
    <div class="main-container">
      <Statistics
        class="statistics"
        :nbMines="minesweeper.nbMines"
        :timer="formattedTime"
        :state="timerState"
      />
      <div class="game-container">
        <Grid
          :key="JSON.stringify(this.minesweeper.grid)"
          :minesweeperGrid="minesweeper.grid"
          :firstTouch="firstTouch"
          @reveal-cell="reveal"
          @startTimer="start"
          @flag="flag"
        />
        <div class="difficulty-buttons">
          <button @click="easy">Easy</button>
          <button @click="meduim">Medium</button>
          <button @click="hard">Hard</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Minesweeper from "../logic/minesweeper";
import Grid from "../components/minesweeper/Grid";
import Statistics from "../components/Statistics";

let minesweeperGrid = new Minesweeper(10, 10, 25);

export default {
  name: "minesweeper",
  components: {
    Grid,
    Statistics
  },
  data() {
    return {
      minesweeper: minesweeperGrid,
      timerState: "stopped",
      currentTimer: 0,
      formattedTime: "00:00:00",
      ticker: undefined,
      firstTouch: true
    };
  },
  methods: {
    reveal(index) {
      if (this.firstTouch) {
        this.firstTouch = false;
      }
      let { i, j } = index;
      if (!this.minesweeper.grid[i][j].isMine) {
        this.minesweeper.reveal(i, j);
      } else {
        this.minesweeper.minesPos.forEach(element => {
          let { rowIndex, columnIndex } = element;
          let cell = this.minesweeper.grid[rowIndex][columnIndex];
          if (!cell.flagged) {
            cell.show();
          }
        });
        this.pause();
      }
    },
    flag(index) {
      let { i, j } = index;
      this.minesweeper.grid[i][j].flag();
    },
    easy() {
      let newGrid = new Minesweeper(5, 5, 6);
      this.minesweeper = newGrid;
      this.reset();
    },
    meduim() {
      let newGrid = new Minesweeper(10, 10, 25);
      this.minesweeper = newGrid;
      this.reset();
    },
    hard() {
      let newGrid = new Minesweeper(14, 14, 35);
      this.minesweeper = newGrid;
      this.reset();
    },
    start() {
      if (this.timerState !== "running") {
        this.tick();
        this.timerState = "running";
      }
    },
    pause() {
      window.clearInterval(this.ticker);
      this.timerState = "paused";
    },
    reset() {
      window.clearInterval(this.ticker);
      this.currentTimer = 0;
      this.formattedTime = "00:00:00";
      this.timerState = "reseted";
      this.firstTouch = true;
    },
    tick() {
      this.ticker = setInterval(() => {
        this.currentTimer++;
        this.formattedTime = this.formatTime(this.currentTimer);
      }, 1000);
    },
    formatTime(seconds) {
      let measuredTime = new Date(null);
      measuredTime.setSeconds(seconds);
      let MHSTime = measuredTime.toISOString().substr(11, 8);
      return MHSTime;
    }
  }
};
</script>

<style scoped>
.difficulty-buttons button {
  display: inline;
}

button {
  width: 120px;
  height: 30px;
  background-color: #7c4dbd;
  border: none;
  margin: 20px;
  border-radius: 15px;
  color: white;
  font-size: 17px;
}

.difficulty-buttons {
  height: 200px;
  width: 100%;
  display: block;
  float: inline-end;
}

.main-container {
  width: 100%;
  height: 100px;
}
.statistics {
  margin: 25px;
  width: 250px;
  height: 600px;
  background: linear-gradient(#6c56c3, #7537bc, #9a34b4);
  float: left;
}
.game-container {
  position: relative;
  width: 1200px;
}

Grid {
  position: absolute;
  width: 50%;
}

.back-icon {
  width: 30px;
  height: 30px;
  padding-top: 10px;
  padding-left: 10px;
}
</style>