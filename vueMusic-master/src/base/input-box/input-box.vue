<template>
  <transition name="fade">
    <div class="box-bg"
         transition="fade"
         @click="close"
    >
      <div class="confirm-box" @click.stop>
        <div class="message">
          <input v-model="num" ref="searchInput" type="number" :placeholder="inputMessage">
        </div>
        <div class="operation">
          <p @click="close">
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
      inputMessage: {
        type: String,
        default: "请输入数量"
      },
      calc:{
        default:0
      },
      numProp:{
        default:"0"
      }
    },
    data(){
      return{
        num:"0"
      }
    },
    methods: {
      close() {
        this.$emit("close")
      },
      confirm() {
        this.$emit("confirm",this.num)
      }
    },
    watch:{
      numProp(newVal){
        this.num=newVal
      },
      calc(){
        setTimeout(()=>{
          this.$refs.searchInput.focus()
        },20)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .message
    font-size 1.3rem
    padding 1.2rem
    input
      border 1px solid #efefef
      border-radius 3px
      width 100%
      height 2.5rem
      line-height 2.5rem
  .operation
    flex-between()
    color #0575f2
    font-size 1.5rem
    position absolute
    width 100%
    bottom 0
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