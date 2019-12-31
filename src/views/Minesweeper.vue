<template>
  <div class="about">
    <router-link to="/">
      <h1>Minesweeper game goes here</h1>
    </router-link>
    <div class="main-container">
      <div class="statistics"></div>
      <div class="game-container">
        <Grid
          :key="JSON.stringify(this.minesweeper.grid)"
          :minesweeperGrid="minesweeper.grid"
          @reveal-cell="reveal"
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

let minesweeperGrid = new Minesweeper(10, 10, 25);

export default {
  name: "minesweeper",
  components: {
    Grid
  },
  data() {
    return {
      minesweeper: minesweeperGrid,
      started: false,
      minutes: 0,
      seconds: 0
    };
  },
  methods: {
    reveal(index) {
      this.started = true;
      let { i, j } = index;
      if (!this.minesweeper.grid[i][j].isMine) {
        this.minesweeper.reveal(i, j);
      } else {
        this.minesweeper.minesPos.forEach(element => {
          let { rowIndex, columnIndex } = element;
          let cell = this.minesweeper.grid[rowIndex][columnIndex];
          cell.show();
        });
        this.started = false;
      }
    },
    easy() {
      let newGrid = new Minesweeper(5, 5, 6);
      this.minesweeper = newGrid;
      this.started = false;
    },
    meduim() {
      let newGrid = new Minesweeper(10, 10, 25);
      this.minesweeper = newGrid;
      this.started = false;
    },
    hard() {
      let newGrid = new Minesweeper(14, 14, 35);
      this.minesweeper = newGrid;
      this.started = false;
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  height: 100%;
}
.statistics {
  margin: 25px;
  width: 300px;
  height: 600px;
  background: linear-gradient(#6c56c3, #7537bc, #9a34b4);
  float: left;
}

.game-container {
  float: right;
}
</style>