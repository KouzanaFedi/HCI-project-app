<template>
  <div class="about">
    <router-link to="/">
      <h1>Minesweeper game goes here</h1>
    </router-link>
    <div class="container">
      <div class="difficulty-buttons">
        <button @click="easy">Easy</button>
        <button @click="meduim">Medium</button>
        <button @click="hard">Hard</button>
      </div>
      <Grid
        :key="JSON.stringify(this.minesweeper.grid)"
        :minesweeperGrid="minesweeper.grid"
        @reveal-cell="reveal"
      />
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
      minesweeper: minesweeperGrid
    };
  },
  methods: {
    reveal(index) {
      let { i, j } = index;
      if (!this.minesweeper.grid[i][j].isMine) {
        this.minesweeper.reveal(i, j);
      } else {
        this.minesweeper.minesPos.forEach(element => {
          let { rowIndex, columnIndex } = element;
          let cell = this.minesweeper.grid[rowIndex][columnIndex];
          cell.show();
        });
      }
    },
    easy() {
      let newGrid = new Minesweeper(5, 5, 6);
      this.minesweeper = newGrid;
    },
    meduim() {
      let newGrid = new Minesweeper(10, 10, 25);
      this.minesweeper = newGrid;
    },
    hard() {
      let newGrid = new Minesweeper(14, 14, 35);
      this.minesweeper = newGrid;
    }
  }
};
</script>

<style scoped>
.difficulty-buttons {
  height: 100%;
  width: 120px;
  display: block;
}
.container {
  display: inline;
}

Grid {
  float: left;
}
</style>