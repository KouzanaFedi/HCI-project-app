<template>
  <div>
    <table>
      <tr v-for="(rows,i) in minesweeperGrid" :key="i">
        <td v-for="(cells,j) in rows" :key="j">
          <Cell
            :hidden="minesweeperGrid[i][j].hidden"
            :value="minesweeperGrid[i][j].value"
            :index="{i,j}"
            @reveal-cell="reveal"
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
  data() {
    return {
      firstTouch: false
    };
  },
  props: ["minesweeperGrid"],
  components: {
    Cell
  },
  methods: {
    reveal(index) {
      this.$emit("reveal-cell", index);
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