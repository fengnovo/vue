<template>
  <div id="app">
    <li v-if='flag'><span @click='edit()'>点击一下</span></li>
    <input type="text" v-else @change='input()'>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
    name: 'App',
    components: {
        HelloWorld
    },
    data() {
       return {
          flag: true
       }
    },
    methods:{
        edit(){
            this.flag=false;
        },
        input(){
            this.flag=true;
        }
    }
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
