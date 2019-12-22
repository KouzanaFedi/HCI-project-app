<template>
  <div class="about">
    <router-link to="/">
      <h1>Minesweeper game goes here</h1>
    </router-link>
    <Grid :minesweeperGrid="minesweeperGrid" @reveal-cell="reveal" />
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
      minesweeperGrid: minesweeperGrid.grid
    };
  },
  methods: {
    reveal(index) {
      let { i, j } = index;
      if (!minesweeperGrid.grid[i][j].isMine) {
        minesweeperGrid.reveal(i, j);
      } else {
        minesweeperGrid.minesPos.forEach(element => {
          let { rowIndex, columnIndex } = element;
          minesweeperGrid.grid[rowIndex][columnIndex].show();
        });
      }
    }
  }
};
</script>