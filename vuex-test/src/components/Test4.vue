<template>
  <div class="hello">
    {{msg}}
    <p><h3>{{count}}</h3></p>
    <button @click="add(10)">加</button>
    <button @click="reduce(5)">减</button>   
  </div>
</template>

<script>
import store from '@/vuex/store4'
import { mapState, mapMutations, mapGetters } from 'vuex'


export default {
  name: 'hello',
  data () {
    return {
      msg: 'vuex Test4 store4 getters',
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
  // computed: mapState(['count']),
  // computed: {
  //   ...mapState(['count']),
  //   count() {
  //     return this.$store.getters.count
  //   }
  // },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['count'])  //每操作一次count给count加100，不管加还是减  
  },
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
