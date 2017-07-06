<template>
  <div class="hello">
    {{msg}}
    <p><h3>{{count}}</h3></p>
    <button @click="add(10)">加</button>
    <button @click="reduce(5)">减</button>
  </div>
</template>

<script>
import store from '@/vuex/store3'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'vuex Test3，加10减5',
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
  computed: mapState(['count']),
  // methods: {
  //   add(num) {
  //     this.$store.commit('add',num)
  //   },
  //   reduce(num) {
  //     this.$store.commit('reduce',num)
  //   }
  // },
  methods: mapMutations(['add','reduce']),
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
