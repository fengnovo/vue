<template>
  <div class="hello">
    <div v-html="content"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import config from '@/config.js'
Vue.use(VueResource)

export default {
  name: 'hello',
  data () {
    return {
      content: '<span>loading...</span>'
    }
  },
  created() {
    this.getTopics()
  },
  methods: {
    getTopics() {
      this.$http.get(config.HOST+'/api/v1/topics',
            {
              params:{
                tab: 'good', //主题分类
                limit: 1, //每一页的主题数量
              }
            }
          ).then(response => {
            this.content = response.body.data[0].content
          })
          .catch(response => {
              console.log(response)
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ul,li{
  list-style: none;
}

.hello img{
    max-width: 100% !important;
}
</style>
