<template>
  <Minesweeper />
</template>

<script>
import Minesweeper from "./views/Minesweeper";
export default {
  name: "app",
  components: { Minesweeper }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
}
* > button:focus {
  outline: 0;
}
</style>
