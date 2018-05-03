<template>
  <div id="discover">
    <fixed-title :text="titleText"></fixed-title>


    <scroll ref="scroll" class="scroll">
      <div>
        <div class="discover-content">
          <div class="discover-content-title">
            <img src="../../assets/discover/touxiang-@2x.png"/>
            <div>
              <h2>鸵鸟官方</h2>
              <p>2天前</p>
            </div>
          </div>
          <div class="recommend">
        <span>
          净颜卸妆爱用大推荐
        </span>

          </div>
          <div class="description">
            卸妆胜过保养，残留等于毁容！卸妆容易，卸净不易，卸妆产品五花八门，爆痘、敏感只因有卸妆残留。什么才是好卸妆？不油、不闷痘、无残留、不厚重、温和去除脸部彩妆及污垢的卸妆才是好卸妆！
          </div>
                <div class="thumbnails my-gallery">
                  <figure class="thumbnail">
                    <a href="https://sinacloud.net/vue-wechat/images/headers/yehua.jpg" itemprop="contentUrl" data-size="400x400">
                      <img v-lazy="'https://sinacloud.net/vue-wechat/images/headers/yehua.jpg'"  />
                    </a>
                    <figcaption style="display: none" itemprop="caption description">  卸妆胜过保养，残留等于毁容！卸妆容易，卸净不易，卸妆产品五花八门，爆痘、敏感只因有卸妆残留。什么才是好卸妆？不油、不闷痘、无残留、不厚重、温和去除脸部彩妆及污垢的卸妆才是好卸妆！
                    </figcaption>
                  </figure>
                  <figure class="thumbnail">
                    <a href="https://sinacloud.net/vue-wechat/images/headers/yehua.jpg" itemprop="contentUrl" data-size="400x400">
                      <img v-lazy="'https://sinacloud.net/vue-wechat/images/headers/yehua.jpg'"  />
                    </a>
                    <figcaption style="display: none" itemprop="caption description">
                      卸妆胜过保养，残留等于毁容！卸妆容易，卸净不易，卸妆产品五花八门，爆痘、敏感只因有卸妆残留。什么才是好卸妆？不油、不闷痘、无残留、不厚重、温和去除脸部彩妆及污垢的卸妆才是好卸妆！
                    </figcaption>
                  </figure>
                  <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="thumbnail">
                    <a href="https://sinacloud.net/vue-wechat/images/headers/zhugeliang.jpg" itemprop="contentUrl" data-size="400x400">
                      <img v-lazy="'https://sinacloud.net/vue-wechat/images/headers/zhugeliang.jpg'" itemprop="thumbnail" alt="Image description" />
                    </a>
                    <figcaption style="display: none" itemprop="caption description">
                      卸妆胜过保养，残留等于毁容！卸妆容易，卸净不易，卸妆产品五花八门，爆痘、敏感只因有卸妆残留。什么才是好卸妆？不油、不闷痘、无残留、不厚重、温和去除脸部彩妆及污垢的卸妆才是好卸妆！
                    </figcaption>
                  </figure>
                </div>

          <div class="glance-over">
            <p>
          <span>
            10010
          </span>
              次浏览
            </p>
            <p>
              <img src="../../assets/discover/zan@2x.png"/>
              有
              <span>
            256
          </span>
              人觉得很赞
            </p>
          </div>
        </div>
        <div class="discover-content">
          <div class="discover-content-title">
            <img src="../../assets/discover/touxiang-@2x.png"/>
            <div>
              <h2>鸵鸟官方</h2>
              <p>3天前</p>
            </div>
          </div>
          <div class="recommend">
        <span>
          口碑隔离大合集
        </span>

          </div>
          <div class="description">
            一般化妆品是无法阻止非常细小的微尘、雾霾等进入皮肤。虽然每天洁面，
            但是只是补救。隔离可以温和隔绝外部环境对肌肤刺激，还能调节肤色、隐形毛孔，形成肌肤与外界屏障，
            做你肌肤的“隐形保护衣”!脱妆从此“不约”！
          </div>
          <xscroll>
            <ul>
              <li>
                <img class="wc-preview-img" :src="url" v-for="(url, key) in list" :key="key">
              </li>
              <li><img @load="loadImg"  src="../../assets/discover/img05@2x.png"/></li>
              <li><img @load="loadImg"  src="../../assets/discover/img06@2x.png"/></li>
            </ul>
          </xscroll>

          <div class="glance-over">
            <p>
          <span>
           18253
          </span>
              次浏览
            </p>
            <p>
              <img src="../../assets/discover/zan@2x.png"/>
              有
              <span>
            366
          </span>
              人觉得很赞
            </p>
          </div>
        </div>
        <bottom-line bottomText="鸵鸟商城"></bottom-line>
      </div>

    </scroll>

    <foot class="foot" :active="2"></foot>
    <!-- PhotoSwipe插件需要的元素， 一定要有类名 pswp -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <!-- 预览区域顶部的默认UI，可以修改 -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  与图片相关的操作 -->
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Foot from 'components/foot/foot'
  import Xscroll from '../../base/xSroll/xSroll'
  import Scroll from '../../base/scroll/scroll'
  import FixedTitle from '../../base/fixedTitle/fixedTitle'
  import BottomLine from "../../base/bottomLine/bottomLine"
  export default {
    created() {
        this.titleText="发现"
    },
    mounted() {
      this.$initPhotoSwipeFromDOM('.my-gallery')
      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },20)
    },
    data() {
      return {
        list: [

          "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg"

        ],
        imgList: [{
          u: 'http://blogfile.ifeng.com/uploadfiles/blog_attachment/1308/75/10103075_13773099904967.jpg',
          w: 500,
          h: 365,
          c:'img1'
        }, {
          u: 'http://img.mp.itc.cn/upload/20170526/c6ae4bb96b3043be9d45fa5402a7f96c_th.jpg',
          w: 600,
          h: 336,
          c:'img2'
        }]
      }
    },
    methods: {
      loadImg() {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 100)
      }
    },
    filters: {
      money: function (value) {
        return "￥" + value
      }
    },
    components: {
      BottomLine,
      Xscroll,
      Scroll,
      FixedTitle,
      Foot
    },
    watch: {},
    activated: function () {
      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },20)
    }
  }

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #discover
    height 100%
    padding-top 4.4rem
  .scroll
    height 100%
    overflow hidden
    .discover-content
      margin-bottom 1px
      padding 1rem 1.2rem 1.4rem
      background #fff
      .thumbnails
        flex-between()
        .thumbnail
          width 32%
          a
            display block
            overflow hidden
            padding-bottom 100%
            position relative
            background-size contain
            img
              position absolute
              top 0
              left 0
              width 100%!important
      .discover-content-title
        display flex
        justify-content start
        margin-bottom 1rem
        img
          width 4rem
          height 4rem
          border-radius 50%
        div
          margin-left 1rem
          line-height 2rem
          h2
            font-size 1.5rem
            color #333
          p
            font-size 1.2rem
            color #999
      .recommend
        span
          border 1px solid #fc3683
          border-radius .5rem
          font-size 1.1rem
          color #fc3683
          padding .3rem .5rem
      .description
        font-size 1.3rem
        color #333
        line-height 1.5rem
        margin 1rem 0
      ul
       display flex
       justify-content space-between
       width 36rem
       li:last-child
        margin-right 0
       li
        margin-right .7rem
        img
          width 11.3rem
          height 11.3rem
      .glance-over
        display flex
        justify-content space-between
        font-size 1.2rem
        color #999
        margin-top 1.4rem
        img
          width 1.6rem
          vertical-align middle
          margin-top -.4rem
</style>