<template>
  <div class="statistics-holder">
    <div class="bombs-label">Bombs</div>
    <div class="animation">
      <div class="loader"></div>
      <div class="purple-layer">
        <div class="nb-mines-display">
          <div class="nb-mines-effect">
            <div class="nb-mines-label">{{nbMines}}</div>
          </div>
        </div>
      </div>
    </div>
    <Hearts :difficulty="difficulty" :errors="errors" />
    <div class="label">Time</div>
    <div class="holder">
      <div class="wrapper">{{timer}}</div>
    </div>
    <div class="label">Best</div>
    <div class="holder">
      <div class="wrapper">{{recordPerDif}}</div>
    </div>
    <div class="label">Games won</div>
    <div class="records">
      <div class="record-holder">
        <div class="mode">Easy</div>
        <div class="record">{{data.easy.gamesWon}}</div>
      </div>
      <div class="record-holder">
        <div class="mode">Medium</div>
        <div class="record">{{data.medium.gamesWon}}</div>
      </div>
      <div class="record-holder">
        <div class="mode">Hard</div>
        <div class="record">{{data.hard.gamesWon}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Hearts from "./hearts";
export default {
  name: "Statistics",
  props: ["timer", "state", "nbMines", "difficulty", "errors", "data"],
  components: { Hearts },
  computed: {
    recordPerDif() {
      if (this.difficulty == 3) return this.data.easy.best;
      else if (this.difficulty == 2) return this.data.medium.best;
      else return this.data.hard.best;
    }
  }
};
</script>

<style scoped>
.records {
  margin-left: 37.5px;
  border-radius: 20px;
  height: 100px;
  width: 175px;
  background-color: #5e2f9f;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.record-holder {
  display: flex;
  justify-content: space-between;
}
.mode {
  margin-left: 20px;
  font-size: 20px;
  font-weight: 200;
  color: #e4d9ff;
}
.record {
  margin-right: 20px;
  font-size: 20px;
  font-weight: 200;
  color: #e4d9ff;
}
.bombs-label {
  font-size: 35px;
  text-align: center;
  margin: 20px 0px;
  color: #e4d9ff;
  font-weight: 200;
}

.label {
  font-size: 30px;
  text-align: center;
  margin: 15px 0px;
  color: #e4d9ff;
  font-weight: 200;
}

.statistics-holder {
  text-align: center;
}

.holder {
  font-size: 20px;
  background-color: #5e2f9f;
  width: 175px;
  height: 40px;
  color: #e4d9ff;
  border-radius: 20px;
  display: inline-block;
}

.wrapper {
  margin-top: 7.5px;
}

.nb-mines-display {
  z-index: 3;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  background-color: #e4d9ff;
  display: inline-block;
  text-align: center;
  margin-top: 4px;
}
.purple-layer {
  left: 0;
  top: 0;
  z-index: 4;
  border-radius: 50%;
  width: 118px;
  height: 118px;
  background-color: #6c56c3;
  display: inline-block;
  text-align: center;
  position: absolute;
  margin-top: 4px;
  margin-left: 4px;
}

.nb-mines-effect {
  z-index: 2;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  background-color: #d7b8e4;
  display: inline-block;
  margin-top: 10px;
}

.nb-mines-label {
  font-size: 40px;
  font-weight: 200;
  margin-top: 22.5px;
}

.animation {
  display: inline-block;
  position: relative;
  width: 130px;
  height: 130px;
}

.loader {
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1;
  font-size: 10px;
  text-indent: -9999em;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background: transparent;
  background: -moz-linear-gradient(
    left,
    #4aa0db 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #4aa0db 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #4aa0db 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #4aa0db 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #4aa0db 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>