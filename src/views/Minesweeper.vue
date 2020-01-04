<template>
  <div class="main-container">
    <Statistics
      class="statistics"
      :nbMines="minesweeper.mineNotFlagged"
      :timer="formattedTime"
      :state="timerState"
    />
    <Grid
      class="grid"
      :key="JSON.stringify(this.minesweeper.grid)"
      :minesweeperGrid="minesweeper.grid"
      :firstTouch="minesweeper.firstClick"
      @reveal-cell="reveal"
      @startTimer="start"
      @flag="flag"
    />
    <div class="difficulty-buttons">
      <button @click="easy">Easy</button>
      <button @click="meduim">Medium</button>
      <button @click="hard">Hard</button>
      <router-link to="/">
        <img src="../assets/back_icon.png" alt="<" class="back-icon" />
      </router-link>
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
      ticker: undefined
    };
  },
  methods: {
    reveal(index) {
      let { i, j } = index;
      if (!this.minesweeper.grid[i][j].isMine || this.minesweeper.firstClick) {
        this.minesweeper.reveal(i, j);
      } else if (!this.minesweeper.firstClick) {
        this.minesweeper.minesPos.forEach(element => {
          let { rowIndex, columnIndex } = element;
          let cell = this.minesweeper.grid[rowIndex][columnIndex];
          if (!cell.flagged) {
            cell.show();
          }
        });
        this.pause();
      }
      this.minesweeper.firstClick = false;
    },
    flag(index) {
      let { i, j } = index;
      if (this.minesweeper.mineNotFlagged >= 0) {
        this.minesweeper.updateMinesNotFlaggedCount(
          this.minesweeper.grid[i][j].flag(this.minesweeper.mineNotFlagged > 0)
        );
      }
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
      this.minesweeper.firstClick = true;
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
  grid-area: buttons;
  justify-self: center;
  align-self: start;
}

.main-container {
  background-image: url("../assets/background.jpg");
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 280px auto;
  grid-template-rows: auto 70px;
  grid-template-areas:
    "stat grid"
    "stat buttons";
}
.statistics {
  grid-area: stat;
  border-radius: 5px 5px 0 0;
  width: 250px;
  height: 670px;
  background: linear-gradient(#6c56c3, #7537bc, #9a34b4);
  justify-self: center;
  align-self: end;
}

.grid {
  grid-area: grid;
  justify-self: center;
  align-self: center;
}

.back-icon {
  width: 30px;
  height: 30px;
  top: 93%;
  left: 96.5%;
  position: absolute;
}
</style>