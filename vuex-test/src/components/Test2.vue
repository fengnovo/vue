<template>
  <div class="hello">
    {{msg}}
    <p><h3>{{count}}</h3></p>
    <button @click="$store.commit('add')">加</button>
    <button @click="$store.commit('reduce')">减</button>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState } from 'vuex'
// console.log(store);

export default {
  name: 'hello',
  data () {
    return {
      msg: 'vuex Test2',
    }
  },
  // computed: {
  //   count() {
  //     return this.$store.state.count
  //   },
  // },
  // computed: mapState({
  //   count: state => state.count
  // }),
  computed: mapState(['count']),  //访问对象的三种方式
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
