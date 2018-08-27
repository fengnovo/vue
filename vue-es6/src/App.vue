<template>
  <div id="app">
    <h3>welcome vuex-demo</h3>
    <input type="button" value="增加" @click="increment"/>
    <input type="button" value="减少" @click="decrement"/>
    <input type="button" value="增加" @click="OddIncrement"/>
    <input type="button" value="减少" @click="incerementAync"/>
    <input type="button" value="fetchData" @click="fetchData"/>
    <p>
         现在数字是：{{count}}，现在是{{isOdd}}
    </p>
    <p>
      {{data}}
    </p>
  </div>
</template>

  <script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
      ...mapState(['count', 'data']),
      ...mapGetters(['isOdd'])
    },
    methods: {
      ...mapMutations([
          'increment',
          'decrement']),
      ...mapActions([
          'OddIncrement',
          'incerementAync',
          'fetchData'
      ])
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
