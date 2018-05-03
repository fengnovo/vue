<template>
  <div class="bottomLine">
    <i></i>
    <span>{{bottomText}}</span>
    <i></i>
  </div>
</template>

<script>
    export default {
        name: "bottom-line",
      props:{
          bottomText:{
            type:String,
            detail:"鸵鸟商城"
          }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.bottomLine
  line-height 5rem
  text-align center
  color #666
  vertical-align middle
  font-size 1.3rem
  i
   display inline-block
   width 3.5rem
   height 1px
   background #818181
   margin-bottom  .4rem
   span
    padding 0 10px
</style>