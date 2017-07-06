<template>
  <div id="app">
    <div>
      <router-link to="/home">home page</router-link>
      <router-link to="/hello">hello page</router-link>
      <router-link to="/hello/hi1">hello hi1 page</router-link>
      <router-link to="/hello/hi2">hello hi2 page</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
