<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1 v-text="title"></h1>
  </div>
</template>

<script>
export default {
  title: 'this is a list',
  items: [{
    lable: 'coding',
    isFinish: false
  },{
    lable: 'walking',
    isFinish: true
  }]
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
