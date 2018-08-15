<template>
  <transition name="gradual">
    <div class="search-module">
      <div class="search_box" ref="search_box">
        <div class="searchInput">
          <img class="search_img" src="../../assets/sousuo@2x.png"/>
          <div class="Pinput">
            <input
              ref="searchInput"
              type="text"
              placeholder="请输入你想要的商品"
              v-model="searchText"
            >
          </div>

        </div>
        <div class="searchTou">
          <span v-show="!searchText" @click="back">取消</span>
          <span v-show="searchText">搜索</span>
        </div>
      </div>
      <div class="hot-search">
        <h3 class="hot-search-title">热门搜索</h3>
        <xscroll>
          <ul class="hot-search-content" style="width:760px">
            <li>面膜</li>
            <li>面膜</li>
            <li>面膜</li>
            <li>面膜</li>
            <li>面膜</li>
            <li>日常洗护</li>
            <li>洗发水</li>
            <li>面膜</li>
            <li>面膜</li>
            <li>面膜</li>
            <li>面膜</li>
          </ul>
        </xscroll>

      </div>
      <div class="search-history">
        <div class="search-title">
          <p>历史搜索</p>
          <p>清空历史</p>
        </div>
        <scroll>
          <ul>
            <li>身体乳</li>
            <li>防晒喷雾</li>
            <li>化妆棉</li>
            <li>丹姿</li>
          </ul>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
  import Search from "../../base/search/search"
  import Xscroll from "../../base/xSroll/xSroll"
  import Scroll from "../../base/scroll/scroll"
    export default {
        name: "search-module",
      created(){

      },
      data(){
        return{
          searchText:""
        }
      },
     mounted(){
          setTimeout(()=>{
            this.$refs.searchInput.focus()
          },20)

      },
      methods:{
        back(){
          this.$router.back(-1)
        }
      },
      components:{
        Search,
        Xscroll,
        Scroll
      },
      activated(){
        //  虽然设置了keep-alive 但我还是会执行
        setTimeout(()=>{
          this.$refs.searchInput.focus()
        },20)
      }
    }
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">
  .search-module
    position:fixed
    z-index:1000
    top:0
    left:0
    right:0
    bottom:0
    background #efefef
    padding-top 4.4rem
    .search_box
      position:fixed
      top:0
      width:100%
      z-index 100
      padding 1rem
      display flex
      justify-content center
      background #fff
      border-bottom 1px solid #efefef
      .searchInput
        background :#f4f4f4
        opacity .8
        border-radius 0.8rem
        width:30.5rem
        height:3rem
        line-height 3rem
        padding-left .2rem
        overflow hidden
        .Pinput
          padding-left 2rem
          font-size .8rem
          input
            border-radius 0.8rem
            outline none
            color:#333
            height:3rem
            width: 100%;
            font-size 1.3rem
            background #f4f4f4
        .search_img
          width 1.8rem
          height 1.8rem
          float:left
          margin-top:.5rem
      .searchTou
        padding-left 1rem
        display flex
        flex-direction column
        justify-content center
        span
          display inline-block
          font-size 1.5rem
          width:3.2rem
          color:#333
    .hot-search
      height 8rem
      background #fff
      padding 1.2rem
      margin-bottom 1rem
      font-size 1.3rem
      .hot-search-title
        color #333
        margin-bottom 1rem
      .hot-search-content
        font-size 1.2rem
        color #ffffff
        white-space:nowrap
        li
          display inline-block
          background #fe569f
          border-radius .4rem
          height 2.3rem
          padding 0 .8rem
          line-height 2.3rem
          margin-right 1rem
    .search-history
      background #fff
      font-size 1.3rem
      .search-title
        display flex
        justify-content space-between
        padding 0 1.2rem
        height 5rem
        p
          line-height 5rem
        p:first-child
          color #333
        p:last-child
          color #999
      ul
        li
          color #666
          line-height 5rem
          border-top 1px solid #efefef
          padding 0 1.2rem
  .gradual-enter-active, .gradual-leave-active
    transition: all 0.5s

  .gradual-enter, .gradual-leave-to
    opacity 0
</style>