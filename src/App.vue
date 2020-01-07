<template>
  <div>
    <router-link to="/"></router-link>
    <router-view />
  </div>
</template>



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
  background-image: url("./assets/background2.jpg");
  background-size: cover;
}
* > button:focus {
  outline: 0;
}
</style>
