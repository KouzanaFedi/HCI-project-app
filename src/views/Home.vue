<template>
  <div id="main-container">
    <div class="title">Game Center</div>
    <div id="games-album">
      <div>
        <router-link to="skillMeter">
          <div id="game-container1">
            <div id="game-thumbnail"></div>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="minesweeper">
          <div id="game-container2">
            <div id="game-thumbnail"></div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style  scoped>
.home-conatiner {
  position: absolute;
}
.title {
  color: white;
  font-size: 70px;
  text-align: center;
  margin-top: 20px;
}
a,
a:visited,
a:active {
  color: initial;
  text-decoration: none;
}

#game-container1 {
  position: absolute;
  background-image: url("../assets/skillMeter.png");
  background-size: cover;
  top: 40%;
  left: 57%;
  border-radius: 15px;
  width: 500px;
  height: 300px;
}
#game-container2 {
  position: absolute;
  top: 40%;
  background-image: url("../assets/minesweeper.png");
  background-size: cover;
  left: 5%;
  width: 500px;
  height: 300px;
  border-radius: 15px;
}
</style>