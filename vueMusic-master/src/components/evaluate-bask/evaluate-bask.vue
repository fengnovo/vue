<template>
  <transition name="slide">
    <div class="my-order">
      <head-self headText="评价晒单"></head-self>
      <ul class="order-tab">
        <li @click="changeEvaluateMode(0)">
          <span :class="{'active':evaluateIndex===0}">全部</span>
        </li>
        <li @click="changeEvaluateMode(1)">
          <span :class="{'active':evaluateIndex===1}">待评价</span>
        </li>
        <li @click="changeEvaluateMode(2)">
          <span :class="{'active':evaluateIndex===2}">已评价</span>
        </li>
      </ul>
      <scroll  ref="scroll"
               class="scroll"
               :pullup="pullup"
               @scrollToEnd="loadMore"
               :listen-scroll="listenScroll">
        <div class="scroll-content">
          <ul v-if="evaluateIndex===0" class="order-detail">
            <li>
              <div class="commoditys" v-show="productList.length">
                <div class="commodity" v-for="(item,index) in productList">
                  <div class="commodity-info">
                    <div class="commodity-img">
                      <img src="../../assets/quanqiugou_02@2x.png"/>
                    </div>
                    <div class="commodity-detail">
                      <h2 class="presentation">
                        {{item.productName}}
                      </h2>
                      <div class="specification" >
                        <span>
                          精选
                        </span>
                      </div>
                      <div class="commodity-num">
                        <h2 class="commodity-price">
                          {{item.productPrice*item.productQuantity | money}}
                          <s>
                            {{888 | money}}
                          </s>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div>
                  <div class="operation">
                    <button @click="evaluateFn(item)">
                      {{item.isevaluate?"已评价":"发表评价"}}
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul v-if="evaluateIndex===1" class="order-detail">
            <li>
              <div class="commoditys" v-show="productList.length">
                <div class="commodity"
                     v-for="(item,index) in productList"
                     v-show="!item.isevaluate"
                >
                  <div class="commodity-info">
                    <div class="commodity-img">
                      <img src="../../assets/quanqiugou_02@2x.png"/>
                    </div>
                    <div class="commodity-detail">
                      <h2 class="presentation">
                        {{item.productName}}
                      </h2>
                      <div class="specification" >
                        <span>
                          精选
                        </span>
                      </div>
                      <div class="commodity-num">
                        <h2 class="commodity-price">
                          {{item.productPrice*item.productQuantity | money}}
                          <s>
                            {{888 | money}}
                          </s>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="operation">
                      <button @click="evaluateFn(item)">
                        发表评价
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul v-if="evaluateIndex===2" class="order-detail">
            <li>
              <div class="commoditys" v-show="productList.length">
                <div class="commodity"
                     v-for="(item,index) in productList"
                     v-show="item.isevaluate"
                >
                  <div class="commodity-info">
                    <div class="commodity-img">
                      <img src="../../assets/quanqiugou_02@2x.png"/>
                    </div>
                    <div class="commodity-detail">
                      <h2 class="presentation">
                        {{item.productName}}
                      </h2>
                      <div class="specification" >
                        <span>
                          精选
                        </span>
                      </div>
                      <div class="commodity-num">
                        <h2 class="commodity-price">
                          {{item.productPrice*item.productQuantity | money}}
                          <s>
                            {{888 | money}}
                          </s>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="operation">
                      <button>
                        已评价
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <re-for-you
            v-if="reForYou.length"
            :isBg="false"
            :reForYou="reForYou"
            @loadOver="loadImg"
          ></re-for-you>
          <bottom-line bottomText="鸵鸟商城"></bottom-line>
          <loading class="loadMore" v-show="hasMore&&reForYou.length" title=""></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
  import Scroll from '../../base/scroll/scroll'
  import {orderMixin} from "../../common/js/mixin"
  import HeadSelf from '../../base/fixedHead/fixedHead'
  import {loadForYou} from "../../api/home"
  import {AMOUNT,ERROK} from "../../api/config"
  import Loading from "../../base/loading/loading"
  import ReForYou from "../../components/ReForYou/ReForYou"
  import BottomLine from "../../base/bottomLine/bottomLine"
  export default{
    mixins:[orderMixin],
    created(){
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
      HeadSelf,
      Loading,
      ReForYou,
      BottomLine
    },
    data(){
      return{
        reForYou:[],
        hasMore:true,
        last:0,
        productList: [
          {
            productId:"600100002115",
            productName:"全球购韩国免税店后whoo津率享红花凝香套盒水乳面霜全球购韩国免税店后whoo津率享红花凝香套盒水乳面霜",
            productPrice:19,
            productQuantity:1,
            productImage:"static/img/goods-1.jpg",
            isevaluate:false,
            specification:[
              "250ml",
              "500ml",
              "750ml"
            ],
            nowSpecification:"250ml"
          },
          {
            productId:"600100002115",
            productName:"全球购韩国免税店后whoo津率享红花凝香套盒水乳面霜全球购韩国免税店后whoo津率享红花凝香套盒水乳面霜",
            productPrice:19,
            productQuantity:2,
            productImage:"static/img/goods-1.jpg",
            isevaluate:true,
            specification:[
              "250ml",
              "500ml",
              "750ml"
            ],
            nowSpecification:"250ml"
          }
        ],
        evaluateIndex:0
      }
    },
    filters: {
      money: function (value) {
        if(value){
          return "￥" + value.toFixed(2)
        }

      }
    },
    methods:{
      loadImg(){
        clearTimeout(this.scrollTimer)
        this.scrollTimer=setTimeout(()=>{
          this.$refs.scroll.refresh()
        },160)
      },
      back(){
        this.$router.back()
      },
      evaluateFn(item){
        if(item.isevaluate){
          return
        }
        this.$router.push({
          path:"/mine/evaluateBask/commodityEvaluation",
          query:{}
        })
      },
      loadMore(){
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
      },
      changeEvaluateMode(index){
        this.evaluateIndex=index
      }
    },
    watch:{
      evaluateIndex(){
        setTimeout(()=>{
          this.$refs.scroll.refresh()
        },20)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .my-order
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
        width 33.333%
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
    .scroll-content
      padding-bottom 3.5rem
    .order-detail
      li
        .commoditys
          .commodity
            height 15.5rem
            position relative
            overflow hidden
            padding-top 11rem
            margin-bottom .5rem
            .commodity-info
              position absolute
              top 0
              left 0
              width 100%
              padding-right 1.2rem
              background #fff
              display flex
              .commodity-img
                width 36%
                margin 0 1rem
                height 11rem
                column-center()
                img
                  width 100%
              .commodity-detail
                padding 1rem
                width 64%
                flex-row(center)
                h2.presentation
                  font-size 13px
                  color #333
                  font-weight bolder
                  letter-spacing .05rem
                  line-height 15px
                  height 30px
                  overflow hidden
                  text-overflow: ellipsis
                  display: box
                  display: -webkit-box
                  -webkit-line-clamp: 2
                  line-clamp: 2
                  -webkit-box-orient: vertical
                  word-break: break-all
                .specification
                  margin 1rem 0
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
            .operation
              height 4.5rem
              background #fff
              padding 0 1.2rem
              text-align right
              line-height 4.5rem
              border-top 1px solid #efefef
              margin-bottom .5rem
              span
                color #fc3683
              button
                color #fc3683
                border-radius .2rem
                height 2.6rem
                line-height 2.6rem
                width 7.8rem
                margin-left .5rem
                text-align center
                font-size 1.3rem
                outline none
                background #fff
                border 1px solid #FB689E
</style>