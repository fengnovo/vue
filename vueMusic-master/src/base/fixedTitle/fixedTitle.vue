<template>
    <div class="fixedTitle">
      {{text}}
      <span v-if="isEdit" class="redact">编辑</span>
    </div>
</template>

<script>
    export default {
        name: "fixed-title",
      props:{
          text:{
            type:String,
            default:""
          },
        isEdit:{
            type:Boolean,
            default:false
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .fixedTitle
    position fixed
    top 0
    left 0
    width 100%
    color #fff
    background #FC3683
    text-align center
    line-height 4.4rem
    height 4.4rem
    font-weight bold
    letter-spacing .2rem
    font-size 1.7rem
    .redact
      position absolute
      right 1rem
      line-height 4.4rem
      height 4.4rem
      color #fff
      font-size 1.5rem
</style>