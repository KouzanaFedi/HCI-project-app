<template>
  <div id="main-container">
    <h1 id="title">Title</h1>
    <div>
      <h3 id="labels">Available games :</h3>
      <div id="games-album">
        <router-link to="skillMeter">
          <div id="game-container">
            <div id="game-thumbnail"></div>
            <h4 id="game-title">Skill Meter</h4>
          </div>
        </router-link>
        <router-link to="minesweeper">
          <div id="game-container">
            <div id="game-thumbnail"></div>
            <h4 id="game-title">Minesweeper</h4>
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

<style>
#main-conatiner {
  display: inline-block;
  position: absolute;
}

#title {
  margin: 0.4em;
  text-align: center;
}
#labels {
  margin-left: 0.4em;
  margin-bottom: 0.5em;
}
#games-album {
  margin: 1.5em;
}
#game-container {
  width: 150px;
  height: 100px;
  border-radius: 7.5%;
  background-color: blue;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  margin: 1em;
}

#game-title {
  align-self: baseline;
  text-align: center;
}
a,
a:visited,
a:active {
  color: initial;
  text-decoration: none;
}
#game-thumbnail {
  width: 100%;
  height: 80%;
  background-color: aqua;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
</style>