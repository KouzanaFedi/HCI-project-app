<template>
  <div class="about">
    <router-link to="/">
      <h1>Minesweeper game goes here</h1>
    </router-link>
    <Grid :minesweeperGrid="minesweeperGrid" :minesPos="minesPos" />
  </div>
</template>

<script>
import Minesweeper from "../logic/minesweeper";
import Grid from "../components/minesweeper/Grid";

let minesweeperGrid = new Minesweeper(4, 5, 8);
export default {
  name: "minesweeper",
  components: {
    Grid
  },
  data() {
    return {
      minesweeperGrid: minesweeperGrid.grid,
      minesPos: minesweeperGrid.minesPos
    };
  }
};
</script>