<template>
  <transition name="slide">
    <div class="partner-details" translate="slide">
      <scroll
        class="scroll"
        ref="scroll"
      >
        <div  style="padding-bottom: 4.9rem;padding-top: 4.4rem" >
          <img @load="loadImg" src="../../assets/product-details/UpgradeTuo.jpg"/>
        </div>
      </scroll>

      <div class="btmBtn">
        <p @click="cancle">
          取消升级
        </p>
        <p @click="confirm">
          立即升级
        </p>
      </div>
    </div>
  </transition>
</template>
<script>
  import Scroll from "../../base/scroll/scroll"
  export default {
    name: "UpgradeTuo",
    components:{
      Scroll
    },
    methods:{
      loadImg(){
        setTimeout(()=>{
          this.$refs.scroll.refresh()
        },20)
      },
      cancle(){
        this.$emit("cancle")
      },
      confirm(){
        this.$emit("confirm")
      },
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .partner-details
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #efefef
    color #333
    .scroll
      height 100%
      width 100%
      overflow hidden
      position: fixed;
      top: 0;
      bottom: 0;
      img
        width 100%!important
    .btmBtn
      position fixed
      bottom 0
      width 100%
      text-align center
      background #F62C78
      letter-spacing .1rem
      color #fff
      font-size 1.8rem
      flex-between()
      p:first-child
        background #ddd
        color #333
      p
        height 4.9rem
        line-height: 4.9rem
        width 50%
</style>