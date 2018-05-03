<template>
  <div>
    <ul class="star">
      <li
        v-for="(item) in [0,1,2,3,4]"
        :class="{'light':item<star}"
        :data-index="item"
      ></li>
    </ul>
  </div>
</template>

<script>
  import {getData} from "../../common/js/dom";

  export default {
    name: "star",
    props:{
      starNum:{
        type:Number,
        default:0
      }
    },
    created(){
      this.star=this.starNum
    },
    data(){
      return{
        star:0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .star
    flex-start()
    li
      background-image url("../../assets/product-details/xingxing@2x.png")
      height 1rem
      width 1rem
      background-size contain
      margin .3rem .3rem .3rem 0
      background-repeat no-repeat
      padding 0!important
    .light
      background url("../../assets/product-details/xingxing@2x.png")
      background-size contain
</style>