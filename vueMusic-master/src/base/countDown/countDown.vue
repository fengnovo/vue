<template>
  <transition name="fade">
    <div class="box-bg"
         transition="fade"
         @click="close"
    >
      <div class="confirm-box" @click.stop>
        <div class="message">
          {{confirmMessage}}
        </div>
        <div class="operation">
          <p  @click="close">
            取消
          </p>
          <p @click="confirm">
            确定
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "confirm-box",
    props: {
      confirmMessage: {
        type: String,
        default: "确定操作吗？"
      }
    },
    methods: {
      close() {
        this.$emit("close")
      },
      confirm() {
        this.$emit("confirm")
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .message
    font-size 1.6rem
    padding 1.2rem
    line-height 1.8rem
  .operation
    flex-between()
    color #0575f2
    font-size 1.5rem
    position absolute
    bottom 0
    width 100%
    border-top 1px solid #efefef
    p:first-child
      border-right 1px solid #efefef
    p
      width 50%
      padding .8rem 0
  .confirm-box
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 80%
    height 10rem
    background #fff
    border-radius 5px
    text-align center
  .box-bg
    boxBg()
    &.fade-enter-active
      animation: bounce-in .3s;
    &.fade-leave-active
      animation: bounce-out .3s;
</style>