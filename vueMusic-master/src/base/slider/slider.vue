<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div :class="{'dots':!dotsCenter,'dots-center':dotsCenter}">
      <span class="dot"  v-for="(item, index) in dots" :class="{active: currentPageIndex === index }"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from "../../common/js/dom";

  export default{
    props:{
      loop:{
        type:Boolean,
        default:true
      },
      autoPlay:{
        type:Boolean,
        default:true
      },
      interval:{
        type:Number,
        default:3000
      },
      dotsCenter:{
        type:Boolean,
        default:false
      }

    },
    data(){
      return{
        dots:[],
        currentPageIndex:0
      }
    },
    mounted(){
      setTimeout(()=>{
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if(this.autoPlay){
          this._play()
        }
      },20)
      window.addEventListener('resize',()=>{
        if(!this.slider){
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods:{
      _setSliderWidth(isResize){
        //得到轮播图的内容
        this.children=this.$refs.sliderGroup.children;

        let width=0
        let sliderWidth=this.$refs.slider.clientWidth

        for(let i=0;i<this.children.length;i++){
          let child=this.children[i]
          addClass(child,"slider-item")
          child.style.width=sliderWidth+"px"
          width+=sliderWidth
        }
        if(this.loop&&!isResize&&this.children.length>1){
          if(this.loop){
            width+=2*sliderWidth
          }
        }
        this.$refs.sliderGroup.style.width=width+"px"
      },
      _initSlider(){
        this.slider = new BScroll(this.$refs.slider, {
          click: true,
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: true,
            threshold: 0.3,
            speed: 400
          },
        })
        this.slider.on('scrollEnd',()=>{
          //滚动的时候触发的事件  this.slider.getCurrentPage().pageX得到当前的下标
          let pageIndex=this.slider.getCurrentPage().pageX
          this.currentPageIndex=pageIndex
          if(this.autoPlay){
            clearTimeout(this.timer)
            this._play();
          }
        })

      },
      _initDots(){
        this.dots=new Array(this.children.length)
      },
      _play(){
        this.timer = setTimeout(() => {
          this.slider.next(400)
        }, this.interval)
      },
      refreshSlider(){
        if(!this.slider){
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    },
    destotyed(){
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    .slider-group
      width 100%
      height 100%
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        height 100%
        img
          display: block
          width: 100%
          height 100%
    .dots
      position: absolute
      right: 10px
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: .8rem
        height: .8rem
        border-radius: 50%
        background:#fff
        &.active
          border-radius: .5rem
          background:  #fe1171
    .dots-center
      position: absolute
      right:0
      left: 0
      bottom .6rem
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: .8rem
        height: .8rem
        border-radius: 50%
        background:#e8e8ea
        &.active
          border-radius: .5rem
          background:  #fb2b7c
</style>