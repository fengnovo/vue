<template>
  <!--为您推荐-->
  <div class="ReForYou">
    <h1  class="h1_title" :class="{'lucency':!isBg}">
      <img @load="loadImg" src="../../assets/weinintuijian_icon@2x.png" />&nbsp;为您推荐
    </h1>
    <ul>
      <li v-for="item in reForYou" @click="jumpDetail(item)">
        <div style="background: #fff">
          <p><img @load="loadImg" v-lazy="item.thumb" />
          </p>
          <h2 v-html="item.name">
          </h2>

          <div>
            <h3>
              ￥{{item.final_price}}
            </h3>
            <h4>
              <s>
                ￥{{item.market_price}}
              </s>
            </h4>
          </div>
        </div>

      </li>
    </ul>

  </div>
</template>

<script>
    export default {
        name: "re-for-you",
      props:{
        reForYou:{
          type:Array,
          default:[]
        },
        isBg:{
          type:Boolean,
          default:true
        }
      },
      methods:{
        loadImg(){
          this.$emit("loadOver")
        },
        jumpDetail(item){
          this.$emit("jumpClick")
          this.$router.push({
            path:"/detail",
            query:{
              goods_id:item.id
            }
          })
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .lucency
    background transparent!important
  .ReForYou
    ul
      display flex
      justify-content space-between
      flex-wrap wrap
      padding 0 .5rem 0 1.2rem
      text-align center
      li
        width 50%
        padding-top .7rem
        padding-right .7rem
        overflow hidden
        div
          p
            overflow hidden
            padding-bottom 100%
            position relative
            margin-bottom 1rem
            background-size contain
            img
              position absolute
              top 0
              left 0
              width 100%
          h2
            margin 5px 0
            color: #000000;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
            font-size 13px
            line-height 15px
            height 30px
            padding 0 .5rem
            margin-bottom .5rem
            text-align left
          div
            display flex
            justify-content space-between
            flex-wrap wrap
            padding 0 .5rem .5rem
            h3
              font-size 1.5rem
              font-weight bold
              color #fc2d7b
            h4
              font-size 1.2rem
              color #999
  h1.h1_title
    background #fff
    color #fc2d7b
    font-weight bold
    text-align center
    font-size 1.8rem
    line-height 4rem
    img
      width 2rem
      height 2rem
      vertical-align middle
</style>