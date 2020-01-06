<template>
  <div>
    <video autoplay muted loop id="myVideo">
      <source src="../assets/background_vid.mp4" type="video/mp4" />
    </video>
    <div class="main-container">
      <Statistics
        class="statistics"
        :nbMines="minesweeper.mineNotFlagged"
        :timer="chrono.formattedTime"
        :state="chrono.timerState"
        :difficulty="difficulty"
        :errors="errors"
      />
      <Grid
        class="grid"
        :key="JSON.stringify(this.minesweeper.grid)"
        :minesweeperGrid="minesweeper.grid"
        :firstTouch="minesweeper.firstClick"
        @reveal-cell="reveal"
        @startTimer="chrono.start()"
        @flag="flag"
      />
      <div class="difficulty-buttons">
        <button :class=" difficulty===3 ? 'active-button' : ''" @click="easy">Easy</button>
        <button :class=" difficulty===2 ? 'active-button' : ''" @click="meduim">Medium</button>
        <button :class=" difficulty===1 ? 'active-button' : ''" @click="hard">Hard</button>
        <GoBack :topY="'93%'" :leftX="'96.5%'" />
      </div>
    </div>
  </div>
</template>

<script>
import Minesweeper from "../logic/minesweeper";
import Grid from "../components/minesweeper/Grid";
import Statistics from "../components/minesweeper/Statistics";
import Chronometer from "../utility/Chronometer";
import GoBack from "../components/GoBack";

let minesweeperGrid = new Minesweeper(7, 7, 15);
const chrono = new Chronometer();

export default {
  name: "minesweeper",
  components: {
    Grid,
    Statistics,
    GoBack
  },
  data() {
    return {
      minesweeper: minesweeperGrid,
      chrono,
      difficulty: 2,
      errors: 0,
      gameOver: false
    };
  },
  methods: {
    reveal(index) {
      let { i, j } = index;
      if (!this.minesweeper.grid[i][j].isMine || this.minesweeper.firstClick) {
        this.minesweeper.reveal(i, j);
      } else if (!this.minesweeper.firstClick) {
        if (this.errors < this.difficulty - 1) {
          this.errors++;
          this.minesweeper.grid[i][j].show();
        } else {
          this.errors++;
          this.gameOver = true;
          this.minesweeper.minesPos.forEach(element => {
            let { rowIndex, columnIndex } = element;
            let cell = this.minesweeper.grid[rowIndex][columnIndex];
            if (!cell.flagged) {
              cell.show();
            }
          });
          this.chrono.pause();
        }
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
      let newGrid = new Minesweeper(7, 7, 8);
      this.minesweeper = newGrid;
      this.gameOver = false;
      this.errors = 0;
      this.difficulty = 3;
      this.minesweeper.firstClick = true;
      this.chrono.reset();
    },
    meduim() {
      let newGrid = new Minesweeper(7, 7, 15);
      this.minesweeper = newGrid;
      this.gameOver = false;
      this.errors = 0;
      this.difficulty = 2;
      this.minesweeper.firstClick = true;
      this.chrono.reset();
    },
    hard() {
      let newGrid = new Minesweeper(7, 7, 23);
      this.minesweeper = newGrid;
      this.difficulty = 1;
      this.gameOver = false;
      this.errors = 0;
      this.minesweeper.firstClick = true;
      this.chrono.reset();
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
.difficulty-buttons button {
  display: inline;
}

button {
  width: 120px;
  height: 30px;
  background-color: #7c4dbd;
  border: none;
  margin-left: 20px;
  border-radius: 15px;
  color: white;
  font-size: 17px;
  box-shadow: 5px -5px 60px rgb(8, 6, 6);
}

.active-button {
  background-color: #311e4c;
}

.difficulty-buttons {
  grid-area: buttons;
  justify-self: center;
  align-self: start;
}

.main-container {
  position: absolute;
  /* background-image: url("../assets/background.jpg");
  background-size: cover; */
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 280px auto;
  grid-template-rows: auto 100px;
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
  box-shadow: 5px -5px 30px rgb(8, 6, 6);
}

.grid {
  grid-area: grid;
  justify-self: center;
  align-self: center;
}
</style>