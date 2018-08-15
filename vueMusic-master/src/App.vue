<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
  import Foot from 'components/foot/foot'
  import 'photoswipe/dist/photoswipe.css'
  import 'photoswipe/dist/default-skin/default-skin.css'
  export default {
    components:{
      Foot
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/variable.styl"
  .slide-enter-active, .slide-leave-active
    transition all .3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  #app
    background : #EFEFEF
    width: 100%
    height:100%
    padding-bottom 4.9rem
    .foot
      position: absolute
      bottom:0
      left :0
      width 100%
      -webkit-transform: translateZ(0)
      z-index 10
</style>
