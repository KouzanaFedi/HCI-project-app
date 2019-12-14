<template>
  <table>
    <tr v-for="(rows,i) in minesweeperGrid" :key="i">
      <td v-for="(cells,j) in rows" :key="j">{{minesweeperGrid[i][j]}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Grid",
  props: ["minesweeperGrid"]
};
</script>

<style>
</style>