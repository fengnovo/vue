<template>
  <div style="height:100%;width:100%">
    <transition name="fade">
      <div class="loading"  transition="fade" v-show="!brand_list.length">
        <loading></loading>
      </div>
    </transition>
    <search class="search" :scrollY="scrollY"></search>
    <div class="home" @scroll="scrollFn" ref="home">

      <div class="scroll-content" ref="scrollContent">
        <div class="sliderParent">
          <div class="defaultCarousel" v-if="!sliderArr">
          </div>
          <div class="slider-wrapper" v-if="sliderArr">
            <slider ref="slider">
              <div v-for="item in sliderArr">
                <img class="needsclick" @load="loadImg" :src="item.image" alt="">
              </div>
            </slider>
          </div>
        </div>
        <recomment :lists="listArr"></recomment>
        <div class="headline" @click="jumpInfo(new_article)">
          <div class="toutiao">
            鸵鸟
            <img src="../../assets/toutiao@2x.png"/>
            <div class="written-by">
              <ul ref="ostrichNews">
                <transition name="newsArticle">
                  <li v-if="newsShow" class="news">
                    {{new_article.title?new_article.title:""}}
                  </li>
                </transition>

              </ul>
            </div>
          </div>
          <div class="more">
                 <span>
                  更多
                </span>
          </div>
        </div>
        <!--前往秒杀专场 v-if="promotion_goods.length"-->
        <div class="miaosha" v-if="promotion_goods.length">
          <div class="seckill">
            <img src="../../assets/xianshimiaosha@2x.png"/>
            ���离结束
            <span>
                {{killTime.hour}}
              </span>
            :
            <span>
                {{killTime.mm}}
              </span>
            :
            <span>
                {{killTime.ss}}
              </span>
          </div>
          <div class="goSkill">
            <router-link style="color:#666" to="/home/seckill">
              前往秒杀专场
              <img src="../../assets/mine/jiankuohao@2x.png"/>
            </router-link>

          </div>
        </div>
        <!-- v-if="promotion_goods.length"-->
        <xscroll class="tab-xscroll" ref="tab" v-if="promotion_goods.length">
          <ul ref="seckill" class="crosswise-scroll">
            <li ref="seckills" v-for="item in promotion_goods" @click="jumpDetail(item,true)">
              <p>
                <img v-lazy="item.thumb"/>
              </p>
              <h1>
                {{item.name}}
              </h1>
              <h2>
                ￥{{item.promote_price}}
              </h2>
              <h3>
                <s>￥{{item.market_price}}</s>
              </h3>
            </li>
          </ul>
        </xscroll>
        <!--品牌预算-->
        <div class="brand">
          <h1 class="h1_title">
            <img src="../../assets/pinpaiguan_icon@2x.png"/>
            品牌馆
          </h1>
          <div class="surprise">
            <h2>
              品牌好货
              <img src="../../assets/zuanshi@2x.png"/>
              惊喜狂欢
            </h2>
            <div class="surpriseDetail">
              <xscroll ref="brand_scroll" style="background: transparent">
                <ul ref="brand_ul" v-show="brand_list">
                  <li
                    ref="brand_li"
                    v-for="item in brand_list"
                    @click="jumpDetail(item,false)"
                    v-if="item.brand_logo"
                  >
                    <p>
                      <img v-lazy="item.brand_logo"/>
                    </p>
                    <span>
                            {{item.brand_name}}
                         </span>
                  </li>
                  <li>
                    <p>
                      <router-link to="/home/brand">
                        <img
                          src="https://bpic.588ku.com/element_pic/16/11/27/58d6cb154276d4ba39610f9c8635c5af.jpg!/fw/254/quality/90/unsharp/true/compress/true"/>
                      </router-link>
                    </p>
                    <span>
                            查看更多
                         </span>
                  </li>
                </ul>
              </xscroll>
            </div>
          </div>
        </div>
        <!--9.9专区，全球购-->
        <div v-if="false" class="varietyShop">
          <div class="nine">
            <img v-lazy="wap_si_ad[72].image"/>
          </div>
          <div class="allRight">
            <p>
              <img v-lazy="wap_si_ad[71].image"/>
            </p>
            <div class="quanQiuBottom">
              <p>
                <img v-lazy="wap_si_ad[70].image"/>
              </p>
              <p>
                <img v-lazy="wap_si_ad[69].image"/>
              </p>
            </div>
          </div>
        </div>
        <!--weishang_ad-->
        <div class="commodity" v-for="item in ad_goods_list">
          <div class="commodityMiddle" v-for="itemAd in item.ad">
            <img v-lazy="itemAd.image"/>
          </div>
          <xscroll ref="goodScroll">
            <ul ref="goods">
              <li ref="good"
                  v-for="itemList in item.goods_list"
                  @click="jumpDetail(itemList,false)"
              >
                <p>
                  <img v-lazy="itemList.thumb"/>
                </p>
                <h2 v-html="itemList.name">
                </h2>
                <div>
                  <h3>
                    ￥{{itemList.final_price}}
                  </h3>
                  <h4>
                    <s>
                      <!--￥{{itemList.final_price}}-->
                    </s>
                  </h4>
                </div>
              </li>
            </ul>
          </xscroll>

        </div>
        <!--活动专场-->
        <div class="activity">
          <h1 class="h1_title">
            <img src="../../assets/huodongzhuanchang_icon@2x.png"/>&nbsp;活动专场
          </h1>
          <div
            class="Specialetails"
            v-for="item in topic_list"
            @click.prevent="jumpPrefecture(item)"
          >
            <p>
              <img v-lazy="item.title_pic"/>
            </p>
            <div>
              <h3>
                {{item.title}}
              </h3>
              <span>
                    距结束:
                    <count-down :endTime="item.end_time" endText="已经结束了"></count-down>
                  </span>
            </div>
          </div>
          <div class="moreSelect">
            更多品牌精选 >
          </div>
        </div>

        <!--为您推荐-->
        <re-for-you  :reForYou="reForYou"></re-for-you>
        <loading class="loadMore" v-show="hasMore" title=""></loading>
        <transition name="realTimeInfo">
          <div class="real-time-info" v-show="realTimeShow">
            {{realTimeInfo}}
          </div>
        </transition>
      </div>
    </div>
    <foot ref="foot" class="foot" :active="5"></foot>
    <div class="suspension"
         @click="upgradeTuo"
         v-if="is_distrib===0"
    >
      <img src="../../assets/xuanfu.gif"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Foot from 'components/foot/foot'
  import Scroll from '../../base/scroll/scroll'
  import Xscroll from '../../base/xSroll/xSroll'
  import CountDown from '../../base/countDown/countDown'
  import Slider from "../../base/slider/slider"
  import Search from "../../base/search/search"
  import Recomment from "../../components/recommendList/recommendList"
  import ReForYou from "../../components/ReForYou/ReForYou"
  import {getIndex, loadForYou} from "../../api/home";
  import {AMOUNT} from "../../api/config";
  import {ERROK} from "../../api/config";
  import Loading from "../../base/loading/loading"
  import storage from 'good-storage'
  import {upgradeTuoMixin} from "../../common/js/mixin";
  export default {
    mixins: [upgradeTuoMixin],
    created() {
      this.getData()
      this.getForYou()

    },
    data() {
      return {
        sliderArr: null,
        listArr: [],
        wap_si_ad: {},
        brand_list: [],
        ad_goods_list: [],
        promotion_goods: [],
        gmt_end_time: "",
        killTime: {hour: "", mm: "", ss: ""},
        topic_list: [],
        reForYou: [],
        hasMore: true,
        last: 0,
        pullup: true,
        scrollY: 0,
        animate: false,
        new_articles: [],
        new_article: {},
        newsShow: true,
        newsShowTime: 3000,
        realTimeShow: true,
        realTimeInfo: "",
        isLoading: false,
        realTimeInfoArr: ["曹龙港一分钟前下单，省了18.8", "一帆通过邀请好友赚取188元", "东方不败购买四件套"]
      }
    },
    methods: {
      scrollFn(e) {
        this.scrollY = this.$refs.home.scrollTop
        if (this.scrollY > this.$refs.scrollContent.clientHeight - 700) {
          this.loadMore()
        }

      },
      getData() {
        getIndex().then((res) => {
          if (res.error === ERROK) {
            storage.set("RESPONSE", res.content)
            this.sliderArr = res.content.wap_index_ad;
            this.listArr = res.content.menu_list;
            console.log(res.content.menu_list);
            this.wap_si_ad = res.content.wap_si_ad;
            this.brand_list = res.content.brand_list;
            this.brand_list = this.brand_list.filter((item) => {
              return item.brand_logo
            })
            this.ad_goods_list = res.content.ad_goods_list;
            this.new_articles = res.content.new_articles;
            this.promotion_goods = res.content.promotion_goods;
            if (res.content.promotion_goods[0]) {
              this.gmt_end_time = res.content.promotion_goods[0].gmt_end_time;
            }
            this.topic_list = res.content.topic_list;
          } else {
            let resContent = storage.get("RESPONSE", {})
            this.sliderArr = resContent.wap_index_ad;
            this.listArr = resContent.menu_list;
            this.wap_si_ad = resContent.wap_si_ad;
            this.brand_list = resContent.brand_list;
            this.ad_goods_list = resContent.ad_goods_list;
            this.new_articles = resContent.new_articles;
            this.promotion_goods = resContent.promotion_goods;
            if (resContent.promotion_goods[0]) {
              this.gmt_end_time = resContent.promotion_goods[0].gmt_end_time;
            }
          }
          this.newsCarousel()
          this.realTimeInfoFn()
        })
      },
      loadImg() {
        this.$refs.slider.refreshSlider()
      },
      InitTabScroll() {
        let seckillWidth = 0,
          seckillsWidth = this.$refs.seckills[0].clientWidth + 12;
        for (let i = 0; i < this.promotion_goods.length; i++) {
          seckillWidth += seckillsWidth
        }
        this.$refs.seckill.style.width = seckillWidth + "px"
        this.$refs.tab.scrollRefresh()
      },
      setGoodScroll() {
        let GoodsWidth = 0,
          GoodWidth = this.$refs.good[0].clientWidth + 12;

        for (let n = 0; n < this.ad_goods_list.length; n++) {
          let arr_goods_list = this.ad_goods_list[n].goods_list;
          GoodsWidth = 0
          for (let j = 0; j < arr_goods_list.length; j++) {
            GoodsWidth += GoodWidth
          }
          this.$refs.goods[n].style.width = GoodsWidth + "px"
          this.$refs.goodScroll[n].scrollRefresh()
        }

      },
      setBrandScroll() {
        let brandWidth = 0,
          brandLiWidth = this.$refs.brand_li[0].clientWidth + 21;
        for (let i = 0; i <= this.brand_list.length / 2; i++) {
          brandWidth += brandLiWidth
        }
        this.$refs.brand_ul.style.width = brandWidth + 10 + "px"
        this.$refs.brand_scroll.scrollRefresh()
      },
      calcKillTime() {
        let EndTime = new Date(this.gmt_end_time * 1000); //截止时间
        let NowTime = new Date();
        if (EndTime === NowTime) {
          clearInterval(this.timer)
        }
        let t = EndTime.getTime() - NowTime.getTime();
        let h = Math.floor(t / 1000 / 60 / 60 % 24);
        let m = Math.floor(t / 1000 / 60 % 60);
        let s = Math.floor(t / 1000 % 60);
        this.killTime.hour = h
        this.killTime.mm = m
        this.killTime.ss = s
      },
      getForYou() {
        this.isLoading = true
        loadForYou(this.last, AMOUNT, "ajax").then((res) => {
          this.isLoading = false
          if (res.error === ERROK) {
            this.reForYou = this.reForYou.concat(res.content)
            if (res.content.length < 10) {
              this.hasMore = false
            }
          }
        })
      },
      loadMore() {
        if (!this.hasMore || this.isLoading) {
          return
        }
        this.last = this.reForYou.length
        this.getForYou()
      },
      newsCarousel() {
        let index = 0;
        let counter = 3000

        this.new_article = this.new_articles[index]
        let myFunction = function () {
          clearInterval(interval)
          index++
          if (index === this.new_articles.length) {
            index = 0
          }
          this.newsShow = !this.newsShow
          if (this.newsShow) {
            this.new_article = this.new_articles[index]
            counter = 3000
          } else {
            counter = 200
          }
          interval = setInterval(myFunction, counter);
        }.bind(this)
        let interval = setInterval(myFunction, counter)
      },
      realTimeInfoFn() {
        let index = 0
        this.realTimeInfo = this.realTimeInfoArr[index]
        setInterval(() => {
          index++
          if (index > 2) {
            index = 0
          }
          this.realTimeShow = !this.realTimeShow
          if (this.realTimeShow) {
            this.realTimeInfo = this.realTimeInfoArr[index]
          }
        }, 3000)
      },
      jumpDetail(item, isSecKill) {
        let did = null
        item.id ? did = item.id : ""
        item.brand_id ? did = item.brand_id : ""
        item.id ? did = item.id : ""
        this.$router.push({
          path: "/detail",
          query: {
            isSecKill: isSecKill,
            goods_id: did
          }
        })
      },
      jumpPrefecture(item) {
        this.$router.push({
          path: "/home/prefecture",
          query: {
            topic_id: item.topic_id
          }
        })
      },
      jumpInfo(item) {
        this.$router.push("/newbie")
      },
    },
      filters: {
        money: function (value) {
          return "￥" + value
        }
      },
      components: {
        Slider,
        Search,
        Recomment,
        Xscroll,
        Loading,
        CountDown,
        ReForYou,
        Foot
      },
      watch: {
        gmt_end_time() {
          this.timer = setInterval(() => {
            this.calcKillTime()
          }, 1000)
        },
        promotion_goods() {
          if (!this.promotion_goods.length) {
            return
          }
          setTimeout(() => {
            this.InitTabScroll(0)
          }, 20)
        },
        ad_goods_list() {
          setTimeout(() => {
            this.setGoodScroll()
          }, 20)
        },
        brand_list() {
          setTimeout(() => {
            this.setBrandScroll()
          }, 20)
        }
      },
      activated() {
        this.$refs.home.scrollTop = this.scrollY
        setTimeout(() => {
          if (this.ad_goods_list.length) {
            this.setGoodScroll()
          }
          if (this.$refs.tab) {
            this.$refs.tab.scrollRefresh()
          }

          if (this.$refs.brand_scroll) {
            this.$refs.brand_scroll.scrollRefresh()
          }

          if (this.$refs.slider) {
            this.$refs.slider.refreshSlider()
          }
        }, 20)
      }
    }

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .defaultCarousel
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background-image url("../../common/image/load.gif")
    background-repeat no-repeat
    background-position center center
    background-size 100% auto

  .sliderParent
    width 100%
    padding-top 40%
    position relative
    overflow hidden
  .loading
    position absolute
    left 0
    right 0
    top 0
    bottom 4.9rem
    background rgba(255, 255, 255, 1)
    z-index 1000
    padding-top 55%
  .loading.fade-enter-active
    animation: bounce-in .5s;

  .loading.fade-leave-active
    animation: bounce-out .5s
  .search
    position: absolute!important
    top: 0
    width: 100%
    z-index 10
    -webkit-transform: translateZ(0);
  .home
    /*position absolute*/
    /*top 0*/
    /*bottom 0*/
    height 100%
    width 100%
    padding-bottom 4.9rem
    overflow-y scroll
    -webkit-overflow-scrolling: touch
    z-index:1
    .scroll-content
      position relative
      z-index 9
      min-height calc(100%+1px)
    .real-time-info
      position fixed
      top 10rem
      left 2rem
      background rgba(0, 0, 0, .5)
      color #fff
      height 2.3rem
      line-height 2.3rem
      border-radius 1.2rem
      padding 0 2rem
    .content_scroll
      height 100%
    /*overflow hidden*/
    .slider-wrapper
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      overflow: hidden
    .headline
      width: 90%
      height: 3rem
      padding 0 1.5rem
      margin 1rem auto
      background #fff
      border-radius 1.5rem
      color #333
      overflow hidden
      font-size 1.3rem
      display flex
      justify-content space-between
      .written-by
        height 3rem
        overflow hidden
        position: relative;
        flex:1
        ul
          height: auto
          li
            height 3rem
            line-height 3rem
      .toutiao
        height 3rem
        line-height 3rem
        flex-start()
        align-items center
        img
          height: 1.8rem
          width 3.5rem
          margin 0 .3rem
      .more
        text-align center
        width: 6.9rem
        display flex
        flex-direction column
        justify-content center
        span
          display inline-block
          width 100%
          border-left 1px solid #333
    .miaosha
      display flex
      justify-content space-between
      background #fff
      padding: 1.5rem 0
      .seckill
        background: url("../../assets/juxing-8@2x.png")
        background-size 100% 100%
        line-height 1.9rem
        padding-right 1.5rem
        padding-left 1rem
        font-size 1.1rem
        height: 1.9rem
        color $color-text
        img
          width: 6.2rem
          vertical-align middle
        span
          color: $color-text-gray
          background #fff
      .goSkill
        font-size 1.3rem
        line-height 30px
        img
          width .6rem
          height 1.2rem
          vertical-align middle
          margin-top -.3rem
    .tab-xscroll
      width: 100%
      background #fff
      overflow hidden
      margin-bottom 1rem
      ul
        display: flex;
        padding-bottom 2.2rem
        li
          text-align center
          margin-left .8rem
          width 7rem
          img
            width 7rem
          h1
            margin 1rem 0
            color: #333
            overflow: hidden
            text-overflow: ellipsis
            display: box
            display: -webkit-box
            -webkit-line-clamp: 2
            line-clamp: 2
            -webkit-box-orient: vertical
            word-break: break-all
            font-size 1.3rem
            line-height 1.5rem
            height 3rem
          h2
            color $color-text-gray
            margin .8rem 0
            font-size: 1.8rem
            font-weight bold
          h3
            color #999
            font-size 1.2rem

    .varietyShop
      padding 1rem
      margin-bottom .5rem
      background #fff
      display flex
      justify-content space-between
      overflow hidden
      font-size 0
      img
        width 100%
      .nine
        width 34.59%
        margin-right .35rem
      .allRight
        width 65.41%
        display flex
        justify-content space-between
        flex-direction column
        margin-left .35rem
        p:first-child
          overflow hidden
          height 50%
          margin-bottom .3rem
        .quanQiuBottom
          height 50%
          margin-top .3rem
          display flex
          justify-content space-between
          overflow hidden
          p:first-child
            width 50%
            height 100%
            overflow hidden
            margin-right .3rem
            margin-bottom 0
          p:last-child
            width 50%
            overflow hidden
            margin-left .3rem
    .commodity
      margin-bottom .5rem
      width 100%
      .commodityMiddle
        overflow hidden
        padding-bottom 60%
        position relative
        img
          position absolute
          top 0
          left 0
          bottom 0
          right 0
          width 100%
      ul
        padding 1rem 0 2.2rem 0
        background #fff
        color #000
        display flex
        li
          text-align center
          margin-left .8rem
          padding 5px
          width 9rem
          p
            overflow hidden
            padding-bottom 100%
            position relative
            margin-bottom 1rem
            width 7rem
            img
              position absolute
              top 0
              left 0
              width 100%
          h2
            margin 1rem 0
            color: #333
            overflow: hidden
            text-overflow: ellipsis
            display: box
            display: -webkit-box
            -webkit-line-clamp: 2
            line-clamp: 2
            -webkit-box-orient: vertical
            word-break: break-all
            font-size 13px
            line-height 15px
            height: 30px
          div
            display flex
            justify-content space-between
            flex-wrap wrap
            h3
              font-size 1.2rem
              color #fc2d7b
            h4
              font-size 1rem
              color #999
    .activity
      .Specialetails
        p
          overflow hidden
          padding-bottom 60%
          position relative
          img
            position absolute
            top 0
            left 0
            bottom 0
            right 0
            width 100%
        div
          display flex
          justify-content space-between
          color #333
          background #fff
          padding 1rem 10px
          h3
            font-weight bold
            font-size 1.6rem
            line-height 1.8rem
            width 50%
          span
            text-align right
            width 50%
            color #999
            font-size 1.2rem
            line-height 1.4rem
      .moreSelect
        background #fff
        text-align center
        line-height 4.5rem
        color #333
        font-size 1.6rem
        margin-bottom 5px
        position: relative
        &::before
          display: block
          position: absolute
          left: 0
          top: 0
          width: 100%
          border-top: 1px solid #ddd
          content: ' '
    .brand
      min-height 300px
      padding-bottom 10px
      margin-bottom .5rem
      .surprise
        background url("../../assets/beijingtu@2x.png")
        background-size contain
        padding-top 6rem
        padding-bottom 1rem
        position relative
        h2
          position absolute
          left 50%
          top 2.5rem
          color $color-text
          font-size 1.5rem
          transform translate(-50%)
          img
            width 2rem
            height 2rem
            vertical-align middle
        .surpriseDetail
          ul
            display flex
            flex-wrap wrap
            text-align center
            justify-content: start
            padding 0 5px
            li
              margin-right .9rem
              p
                img
                  width 7.5rem
                  height 7.5rem
              span
                display block
                font-size 1.3rem
                margin .7rem 0
                color $color-text
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
              margin-bottom 1rem
              img
                width 100%
            h2
              margin 5px 0
              color: #000000;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break: break-all;
              font-size 1.3rem
              line-height 1.3rem
              height 2.6rem
              padding 0 .5rem
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
            span
              border 1px solid #FC72A5
              color #fc2d7b
              border-radius 3px
              padding .2rem .3rem
              font-size 1rem
              display block
              width 2.8rem
              margin .5rem 0 1rem .5rem
    .loadMore
      background #efefef
      margin-top 1rem
      position static
  .suspension
    position fixed
    bottom 8rem
    right 1rem
    z-index 100
    img
      width 8rem
      height 8rem
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

  .real-time-info.realTimeInfo-enter-active
    animation: slide-in .5s;

  .real-time-info.realTimeInfo-leave-active
    animation: slide-out .5s

  .news.newsArticle-enter-active
    animation: slide-in .5s;

  .news.newsArticle-leave-active
    animation: slide-out .5s
    @keyframes slide-out {
         0% {
           transform: translateY(0)
           opacity 1
         }
         100% {
           transform: translateY(-100%)
           opacity 0
         }
    }
  @keyframes slide-in {
    0% {
      transform: translateY(100%)
      opacity 0
    }

    100% {
      transform: translateY(0)
      opacity 1
    }
  }
  @keyframes bounce-in {
    0% {
      transform: translateY(100%)
    }
    100% {
      transform: translateY(0)
    }
  }
  @keyframes bounce-out {
    0% {

      opacity 1
    }

    100% {
      opacity 0

    }
  }
</style>