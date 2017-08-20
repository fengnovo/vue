stroe<template>
  <div id="app">
    <h3>welcome vuex-demo</h3>
    <input type="button" value="增加" @click="increment"/>
    <input type="button" value="减少" @click="decrement"/>
    <input type="button" value="增加" @click="OddIncrement"/>
    <input type="button" value="减少" @click="incerementAync"/>
    <p>
         现在数字是：{{count}}，现在是{{isOdd}}
    </p>

    <p>
      <Loading loaderStyle="line-scale"/>
    </p>
  </div>
</template>

  <script>
import { mapGetters, mapActions } from 'vuex'

import Loading from './components/Loading'

export default {
  name: 'app',
  computed: mapGetters([
    'count',
    'isOdd'
  ]),
  methods:mapActions([
    'increment',
    'decrement',
    'OddIncrement',
    'incerementAync'
  ]),
  components: {Loading}
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
