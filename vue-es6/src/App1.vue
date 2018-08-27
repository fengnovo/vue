<template>
  <div id="app">
    <h3>welcome vuex-demo</h3>
    <input type="button" value="增加" @click="increment"/>
    <input type="button" value="减少" @click="decrement"/>
    <input type="button" value="增加" @click="OddIncrement"/>
    <input type="button" value="减少" @click="incerementAync"/>
    <p>
         现在数字是：{{count}}，现在是{{isOdd}}
    </p>
  </div>
</template>

  <script>

export default {
    name: 'app',
    computed: {
        count() {
            return this.$store.state.count;
        },
        isOdd() {
            return this.$store.getters.isOdd;
        }
    },
    methods: {
        increment() {
            this.$store.dispatch('increment')
        },
        decrement() {
            this.$store.dispatch('decrement')
        },
        OddIncrement() {
            this.$store.dispatch('OddIncrement')
        },
        incerementAync() {
            this.$store.dispatch('incerementAync')
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
