<template>
  <div class="hello">
    {{msg}}
    <p><h3>{{count}}</h3></p>
    <p>
      <span>用普通方法</span>
      <button @click="add(10)">加</button>
      <button @click="reduce(5)">减</button>
    </p>  
    <p>
      <span>用action方法</span>
      <button @click="addAction">加</button>
      <button @click="reduceAction">减</button> 
    </p>  
  </div>
</template>

<script>
import store from '@/vuex/store6'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'


export default {
  name: 'hello',
  data () {
    return {
      msg: 'vuex Test6 store5 module',
    }
  },
  computed: {
    ...mapState(['count']),
    count() {
      return this.$store.state.a.count
    } 
  },
  methods: {
    ...mapMutations(['add','reduce']),
    ...mapActions(['addAction','reduceAction'])
  },
  store
}
</script>
