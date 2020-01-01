<template>
  <div>
    <table>
      <tr v-for="(rows,i) in minesweeperGrid" :key="i">
        <td v-for="(cells,j) in rows" :key="j">
          <Cell
            :hidden="minesweeperGrid[i][j].hidden"
            :value="minesweeperGrid[i][j].value"
            :flagged="minesweeperGrid[i][j].flagged"
            :index="{i,j}"
            :firstTouch="firstTouch"
            @flag="flag"
            @reveal-cell="reveal"
            @startTimer="$emit('startTimer')"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Cell from "./Cell";
export default {
  name: "Grid",
  props: ["minesweeperGrid", "firstTouch"],
  components: {
    Cell
  },
  methods: {
    reveal(index) {
      this.$emit("reveal-cell", index);
    },
    flag(index) {
      this.$emit("flag", index);
    }
  }
};
</script>

<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 2px transparent;
}
table td {
  border: 2px transparent;
}
</style>