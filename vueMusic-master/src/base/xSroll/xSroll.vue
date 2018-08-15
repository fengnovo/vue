<template>
  <div class="tab" ref="tab">
      <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "x-slider",
      mounted(){
         this.InitTabScroll()
      },
      methods: {
        InitTabScroll() {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.tab, {
                startX: 0,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: 'vertical'
              });
            } else {
              this.scroll.refresh()
            }
          });
        },
        scrollRefresh(){
          if(this.scroll){
            this.scroll.refresh()
          }
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    width: 100%
    background #fff
    overflow hidden
</style>