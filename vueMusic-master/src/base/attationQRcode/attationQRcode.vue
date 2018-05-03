<template>
  <transition name="fade">
    <div class="box-bg"
         transition="fade"
         @click="close"
    >
      <div class="confirm-box" @click.stop>
        <img src="../../assets/product-details/attentionQRcode.jpg"/>
        <img
          src="../../assets/product-details/longPress.gif"
          class="longPress"
        />
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
  .confirm-box
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 90%
    background #fff
    border-radius 5px
    text-align center
    z-index 10000
    img
      width 100%
    .longPress
      position absolute
      right 17%
      bottom 17%
      width 26.5%
  .box-bg
    boxBg()
    &.fade-enter-active
      animation: bounce-in .3s;
    &.fade-leave-active
      animation: bounce-out .3s;
</style>