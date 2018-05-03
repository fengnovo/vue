<template>
  <transition name="slide">
    <div class="enshrine">
      <head-self headText="我的收藏"></head-self>
      <div class="fixedLoading" v-show="fixedLoading">
        <loading></loading>
      </div>
      <ul class="order-tab">
        <li @click="changeEnshrineMode(0)">
          <span :class="{'active':enshrineIndex===0}">宝贝</span>
        </li>
        <li @click="changeEnshrineMode(1)">
          <span :class="{'active':enshrineIndex===1}">店铺</span>
        </li>
      </ul>
      <scroll ref="scroll"
              class="scroll"
              :pullup="pullup"
              @scrollToEnd="loadMore"
              :listen-scroll="listenScroll">
        <div class="scroll-content">
          <p ref="scrollTop"></p>
          <ul v-if="enshrineIndex===0" class="order-detail">
            <li>
              <div class="emptyCart" v-show="!has_product">
                <img src="../../assets/shop/baobeikong@2x.png"/>
                <h2>你还没有收藏任何商品哦</h2>
              </div>
              <div class="commoditys" v-show="productDetail.length">
                <div class="commodity"
                     v-for="(item,index) in productDetail"
                     @click="jumpDetail(item)"
                >
                  <div class="commodity-info"
                       ref="touchmove"
                       @touchmove.prevent="onTouchMove(index)"
                       @touchstart.prevent="onTouchStart(index)"
                       @touchend.prevent="onTouchEnd(index)"
                  >
                    <div class="commodity-img">
                      <img v-lazy="item.goods_thumb"/>
                    </div>
                    <div class="commodity-detail">
                      <h2 class="presentation" v-html="item.goods_name">
                      </h2>
                      <div class="specification" >
                      </div>
                      <div class="commodity-num">
                        <h2 class="commodity-price">
                          ￥<span v-html="item.shop_price"></span>
                          <s>
                            ￥<span v-html="item.market_price"></span>
                          </s>
                        </h2>
                      </div>
                    </div>
                    <div class="favorite stopEvent">
                      <p class="stopEvent">移至</p>
                      <p class="stopEvent">收藏夹</p>
                    </div>
                    <div class="favorite delete stopEvent">
                      <p  class="stopEvent">删除</p>
                    </div>
                  </div>
                </div>
                <loading class="loadMoreEnshrine" v-show="productHasMore" title=""></loading>
              </div>
            </li>
          </ul>
          <ul v-if="enshrineIndex===1" class="order-detail">
            <li>
              <div class="emptyCart">
                <img src="../../assets/shop/dianpukong@2x.png"/>
                <h2>你还没有收藏任何店铺哦</h2>
              </div>
            </li>
          </ul>
          <re-for-you
            v-if="reForYou.length&&!productHasMore"
            :isBg="false"
            :reForYou="reForYou"
            @loadOver="loadImg"
          ></re-for-you>
          <loading class="loadMore" v-show="hasMore&&reForYou.length&&!productHasMore" title=""></loading>
        </div>

      </scroll>
    </div>
  </transition>
</template>
<script>
  import Scroll from '../../base/scroll/scroll'
  import {loadForYou} from "../../api/home"
  import {accountDetail} from "../../api/mine";
  import {AMOUNT,ERROK} from "../../api/config"
  import Loading from "../../base/loading/loading"
  import ReForYou from "../../components/ReForYou/ReForYou"
  import {shopMixin} from "../../common/js/mixin";
  import HeadSelf from '../../base/fixedHead/fixedHead'
  export default{
    mixins:[shopMixin],
    created(){
      this.loadProduct()
      setTimeout(()=>{
        this.loadMore()
      })

      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },20)
      this.listenScroll=true
      this.pullup=true
      loadForYou(this.last,AMOUNT,"ajax").then((res)=>{
        if(res.error===ERROK){
          this.reForYou=res.content
        }
      })
    },
    components:{
      Scroll,
      ReForYou,
      Loading,
      HeadSelf
    },
    data(){
      return{
        enshrineIndex:0,
        productDetail:[],
        has_product:true,
        productPage:1,
        productHasMore:true,
        isLoading:false,
        fixedLoading:false
      }
    },
    methods:{
      changeEnshrineMode(index){
        this.enshrineIndex=index
        this.$refs.scroll.scrollToElement(this.$refs.scrollTop,300)
        if(index===1){
          this.productHasMore=false
        }
      },
      loadProduct(){
        this.isLoading=true
        this.fixedLoading=true
        accountDetail("collection_list",this.productPage).then((res)=>{
          this.isLoading=false
          this.fixedLoading=false
          if(res.error===ERROK){
            if(!res.content.goods_list){
              return
            }
            let goods_list=res.content.goods_list
            let productArr=[]
            for(let key in goods_list){
              productArr.push(goods_list[key])
            }
            if(productArr.length<10){
              this.productHasMore=false
            }
            this.productDetail=this.productDetail.concat(productArr)
            if(!this.productDetail.length){
              this.has_product=false
            }
            setTimeout(()=>{
              this.$refs.scroll.refresh()
            },20)
          }
        })
      },
      loadMore(){
        if(!this.productHasMore){
          if(!this.hasMore){
            return
          }
          this.last=this.reForYou.length
          loadForYou(this.last,AMOUNT,"ajax").then((res)=>{
            if(res.error===ERROK){
              this.reForYou=this.reForYou.concat(res.content)
              if(res.content.length<10){
                this.hasMore=false
              }
            }
          })
        }else{
          this.productPage++
          this.loadProduct()
        }
      },
      jumpDetail(product){
        this.choiceSizeTimer=setTimeout(()=>{
          this.$router.push({
            path:'/detail',
            query:{
              goods_id:product.goods_id
            }
          })
        },100)
      }
    },
    watch:{
      enshrineIndex(){
        setTimeout(()=>{
          this.$refs.scroll.refresh()
        },20)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .enshrine
    position:fixed
    z-index:100000
    top:0
    left:0
    right:0
    bottom:0
    background :#efefef
    padding-top 4.4rem
    color #333
    .order-tab
      flex-between()
      height 3.5rem
      background #fff
      margin 1px 0
      li
        width 50%
        text-align center
        font-size 1.4rem
        span
          display inline-block
          height 100%
          line-height 4rem
        span.active
          border-bottom 2px solid #FB3D87
          color #FC3683
    .scroll
      height 100%
      overflow hidden
      margin-bottom 3.5rem
      position relative
      .scroll-content
        padding-bottom 3.5rem
        .loadMoreEnshrine
          margin-top 2rem
        .emptyCart
          background #fff
          text-align center
          font-size 1.6rem
          img
            height 12.75rem
          h2
            color #666
            padding-bottom 2.9rem
      .commoditys
        .commodity
          height 11rem
          position relative
          overflow hidden
          border-bottom 1px solid #efefef
          .commodity-info
            position absolute
            top 0
            left 0
            width 100%
            padding-right 1.2rem
            background #fff
            display flex
            .commodity-img
              width 31%
              margin 0 1rem
              height 11rem
              column-center()
              img
                height 10rem
                width 10rem
            .commodity-detail
              padding 1rem 0
              width 64%
              flex-row(center)
              h2.presentation
                text-align left
                font-size 14px
                color #333
                font-weight bolder
                letter-spacing .05rem
                line-height 14px
                height 28px
                overflow hidden
                text-overflow: ellipsis
                display: box
                display: -webkit-box
                -webkit-line-clamp: 2
                line-clamp: 2
                -webkit-box-orient: vertical
                word-break: break-all
              .specification
                margin 1rem 0 1.6rem 0
                span
                  border: 1px solid #fc72a5;
                  color: #fc2d7b;
                  border-radius: 3px;
                  padding: 0.2rem 0.3rem;
                  font-size: 1rem;
                  display: block;
                  width: 2.8rem;
              .commodity-num
                text-align left
                .commodity-price
                  font-size 1.3rem
                  font-weight bolder
                  color #fb2176
            .favorite
              column-center()
              position absolute
              right -74px
              height 11rem
              font-size 1.5rem
              font-weight bolder
              color #fff
              background #FEB500
              text-align center
              width 74px
            .delete
              background #FC337F
              right -148px
</style>