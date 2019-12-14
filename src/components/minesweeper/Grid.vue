<template>
  <table>
    <tr v-for="(rows,i) in minesweeperGrid" :key="i">
      <td v-for="(cells,j) in rows" :key="j">
        <Cell :index="minesweeperGrid[i][j]" />
      </td>
    </tr>
  </table>
</template>

<script>
import Cell from "./Cell";
export default {
  name: "Grid",
  props: ["minesweeperGrid"],
  components: {
    Cell
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