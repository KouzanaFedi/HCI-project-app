<template>
  <div>
    <table>
      <tr v-for="(rows,i) in minesweeperGrid" :key="i">
        <td v-for="(cells,j) in rows" :key="j">
          <Cell @reveal-mines="loser" :value="minesweeperGrid[i][j]" :index="{i,j}" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Cell from "./Cell";
import EventBus from "../../buses/minesweeperEventBus";
export default {
  name: "Grid",
  props: ["minesweeperGrid", "minesPos"],
  components: {
    Cell
  },
  methods: {
    loser() {
      this.minesPos.forEach(element => {
        EventBus.$emit("delete-cell", element);
      });
    }
  }
};
</script>

<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 2px solid black;
}
table td {
  border: 2px solid black;
}
</style>