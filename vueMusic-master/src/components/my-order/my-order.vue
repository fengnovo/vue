<template>
  <transition name="slide">
    <div class="my-order">
      <head-self headText="我的订单"></head-self>
      <ul class="order-tab">
        <li @click="changeOrderMode(0)">
          <span :class="{'active':orderIndex===0}">全部</span>
        </li>
        <li @click="changeOrderMode(1)">
          <span :class="{'active':orderIndex===1}">待付款</span>
        </li>
        <li @click="changeOrderMode(2)">
          <span :class="{'active':orderIndex===2}">待发货</span>
        </li>
        <li @click="changeOrderMode(3)">
          <span :class="{'active':orderIndex===3}">待收货</span>
        </li>
        <li @click="changeOrderMode(4)">
          <span :class="{'active':orderIndex===4}">待评价</span>
        </li>
      </ul>
      <scroll class="scroll"
              ref="scroll"
              :pullup="pullup"
              @scrollToEnd="loadMore"
              :probeType="probeType"
      >
        <div>
          <ul v-if="orderIndex===0" class="order-detail">
            <li>
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span>
                 201803161413369850577576
               </span>
                </p>
                <div>
                  已取消
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img src="../../assets/quanqiugou_02@2x.png"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation">
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                    </h2>
                    <div class="specification">
                      <p>
                        规格:
                        150ML+水110ML
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">
                        {{890 | money}}
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x 1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共1件商品
                {{896.4 | money}}
                (含运费: {{6.40 | money}})
              </div>
              <div class="operation">
                <button>
                  再次购买
                </button>
              </div>
            </li>
            <li>
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span>
                 201803161413369850577576
               </span>
                </p>
                <div>
                  已取消
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img src="../../assets/quanqiugou_02@2x.png"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation">
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                    </h2>
                    <div class="specification">
                      <p>
                        规格:
                        150ML+水110ML
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">
                        {{890 | money}}
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x 1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共1件商品
                {{896.4 | money}}
                (含运费: {{6.40 | money}})
              </div>
              <div class="operation">
                <button>
                  再次购买
                </button>
              </div>
            </li>
            <li>
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span>
                 201803161413369850577576
               </span>
                </p>
                <div>
                  已取消
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img src="../../assets/quanqiugou_02@2x.png"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation">
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                    </h2>
                    <div class="specification">
                      <p>
                        规格:
                        150ML+水110ML
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">
                        {{890 | money}}
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x 1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共1件商品
                {{896.4 | money}}
                (含运费: {{6.40 | money}})
              </div>
              <div class="operation">
                <button>
                  再次购买
                </button>
              </div>
            </li>
            <li>
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span>
                 201803161413369850577576
               </span>
                </p>
                <div>
                  已取消
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img src="../../assets/quanqiugou_02@2x.png"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation">
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                    </h2>
                    <div class="specification">
                      <p>
                        规格:
                        150ML+水110ML
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">
                        {{890 | money}}
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x 1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共1件商品
                {{896.4 | money}}
                (含运费: {{6.40 | money}})
              </div>
              <div class="operation">
                <button>
                  再次购买
                </button>
              </div>
            </li>
            <li>
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span>
                 201803161413369850577576
               </span>
                </p>
                <div>
                  已取消
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img src="../../assets/quanqiugou_02@2x.png"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation">
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                    </h2>
                    <div class="specification">
                      <p>
                        规格:
                        150ML+水110ML
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">
                        {{890 | money}}
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x 1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共1件商品
                {{896.4 | money}}
                (含运费: {{6.40 | money}})
              </div>
              <div class="operation">
                <button>
                  再次购买
                </button>
              </div>
            </li>
            <li>
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span>
                 201803161413369850577576
               </span>
                </p>
                <div>
                  已取消
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img src="../../assets/quanqiugou_02@2x.png"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation">
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                      全球购韩国免税后whoo津率享红花凝香套盒水乳面霜
                    </h2>
                    <div class="specification">
                      <p>
                        规格:
                        150ML+水110ML
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">
                        {{890 | money}}
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x 1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共1件商品
                {{896.4 | money}}
                (含运费: {{6.40 | money}})
              </div>
              <div class="operation">
                <button>
                  再次购买
                </button>
              </div>
            </li>
          </ul>
          <ul v-if="orderIndex===1" class="order-detail">
            <li class="emptyCart" v-show="!has_await_pay">
              <img src="../../assets/mine/chahua@2x.png"/>
              <h2>您还没有相关订单哦</h2>
            </li>
            <li v-for="(item,index) in await_pay_arr" :key="index">
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span v-html="item.order_sn">
               </span>
                </p>
                <div>
                  待付款
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img v-lazy="item.goods_list[0].goods_thumb"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation" v-html="item.goods_list[0].goods_name">
                    </h2>
                    <div class="specification">
                      <p v-html="item.goods_list[0].goods_attr">
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">

                        ￥<span v-html="item.goods_list[0].goods_price"></span>
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x <span v-html="item.goods_list[0].goods_number"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共<span v-html="item.goods_list[0].goods_number"></span>件商品
                ￥<span v-html="item.total_fee"></span>
                (含运费: {{8 | money}})
              </div>
              <div class="operation">
                付款剩余时间：
                <span class="time-payment">
               58:11
             </span>
                <button @click="jumpPay(item)">
                  去付款
                </button>
              </div>
            </li>
            <li style="background: #efefef">
              <loading class="loadMore" v-show="await_pay_hasMore" title=""></loading>
            </li>
          </ul>
          <ul v-if="orderIndex===2" class="order-detail">
            <li class="emptyCart" v-show="!has_await_ship">
              <img src="../../assets/mine/chahua@2x.png"/>
              <h2>您还没有相关订单哦</h2>
            </li>
            <li v-for="(item,index) in await_ship_arr" :key="index">
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span v-html="item.order_sn">
               </span>
                </p>
                <div>
                  待付款
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img v-lazy="item.goods_list[0].goods_thumb"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation" v-html="item.goods_list[0].goods_name">
                    </h2>
                    <div class="specification">
                      <p v-html="item.goods_list[0].goods_attr">
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">

                        ￥<span v-html="item.goods_list[0].goods_price"></span>
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x <span v-html="item.goods_list[0].goods_number"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共<span v-html="item.goods_list[0].goods_number"></span>件商品
                ￥<span v-html="item.total_fee"></span>
                (含运费: {{8 | money}})
              </div>
              <div class="operation">
                <button @click="jumpLogisticsDetails()">
                  查看物流
                </button>
                <router-link to="/mine/order/returnReq">
                  <button>
                    退货/换货
                  </button>
                </router-link>
              </div>
            </li>
            <li style="background: #efefef">
              <loading class="loadMore" v-show="await_ship_hasMore" title=""></loading>
            </li>
          </ul>
          <ul v-if="orderIndex===3" class="order-detail">
            <li class="emptyCart" v-show="!has_await_receipt">
            <img src="../../assets/mine/chahua@2x.png"/>
            <h2>您还没有相关订单哦</h2>
          </li>
            <li v-for="(item,index) in await_receipt_arr" :key="index">
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span v-html="item.order_sn">
               </span>
                </p>
                <div>
                  待付款
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img v-lazy="item.goods_list[0].goods_thumb"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation" v-html="item.goods_list[0].goods_name">
                    </h2>
                    <div class="specification">
                      <p v-html="item.goods_list[0].goods_attr">
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">

                        ￥<span v-html="item.goods_list[0].goods_price"></span>
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x <span v-html="item.goods_list[0].goods_number"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共<span v-html="item.goods_list[0].goods_number"></span>件商品
                ￥<span v-html="item.total_fee"></span>
                (含运费: {{8 | money}})
              </div>
              <div class="operation">
                <button>
                  确认收货
                </button>
                <button @click="jumpLogisticsDetails()">
                  查看物流
                </button>
                <router-link to="/mine/order/returnReq">
                  <button>
                    退货/换货
                  </button>
                </router-link>
              </div>
            </li>
            <li style="background: #efefef">
              <loading class="loadMore" v-show="await_receipt_hasMore" title=""></loading>
            </li>
          </ul>
          <ul v-if="orderIndex===4" class="order-detail">
            <li class="emptyCart" v-show="!has_await_comment">
              <img src="../../assets/mine/chahua@2x.png"/>
              <h2>您还没有相关订单哦</h2>
            </li>
            <li v-for="(item,index) in await_comment_arr" :key="index">
              <div class="order-title">
                <p>
                  订单号
                  &nbsp;
                  <span v-html="item.order_sn">
               </span>
                </p>
                <div>
                  待付款
                </div>
              </div>
              <div class="commodity-info">
                <div class="commodity-img">
                  <img v-lazy="item.goods_list[0].goods_thumb"/>
                </div>
                <div class="commodity-detail">
                  <div class="flex-row">
                    <h2 class="presentation" v-html="item.goods_list[0].goods_name">
                    </h2>
                    <div class="specification">
                      <p v-html="item.goods_list[0].goods_attr">
                      </p>
                    </div>
                    <div class="commodity-num">
                      <h2 class="commodity-price">

                        ￥<span v-html="item.goods_list[0].goods_price"></span>
                        &nbsp;
                      </h2>
                      <div class="counter">
                        x <span v-html="item.goods_list[0].goods_number"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-collect">
                共<span v-html="item.goods_list[0].goods_number"></span>件商品
                ￥<span v-html="item.total_fee"></span>
                (含运费: {{8 | money}})
              </div>
              <div class="operation">
                <router-link to="/mine/order/commodityEvaluation">
                  <button>
                    晒单评价
                  </button>
                </router-link>

                <button @click="jumpLogisticsDetails()">
                  查看物流
                </button>
              </div>
            </li>
            <li style="background: #efefef">
              <loading class="loadMore" v-show="await_comment_hasMore" title=""></loading>
            </li>
          </ul>
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
  import {vipAccountInfo,vipOrderInfo} from "../../api/mine";
  import {ERROK,AMOUNT} from "../../api/config";
  import Loading from "../../base/loading/loading"
  export default{
    mixins:[orderMixin],
    created(){
      this.getOrderCountInfo()
      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },20)
    },
    components:{
      Scroll,
      HeadSelf,
      Loading
    },
    data(){
      return{
        orderCount:{},
        status:{},
        pullup: true,
        probeType: 3,
        //待收货
        await_receipt_last:0,
        await_receipt_arr:[],
        has_await_receipt:true,
        await_receipt_hasMore:true,
        //待付款
        await_pay_last:0,
        await_pay_arr:[],
        has_await_pay:true,
        await_pay_hasMore:true,
        //待发货
        await_ship_last:0,
        await_ship_arr:[],
        has_await_ship:true,
        await_ship_hasMore:true,
        //待评价
        await_comment_last:0,
        await_comment_arr:[],
        has_await_comment:true,
        await_comment_hasMore:true,
        isLoading:false
      }
    },
    filters: {
      money: function (value) {
        if(value){
          return "￥" + value
        }
      }
    },
    methods:{
      getOrderCountInfo(){
        vipAccountInfo("order_list").then(res=>{
          if(res.error===ERROK){
            if(res.content.order_count){
              this.order_count=res.content.order_count
            }
            if(res.content.status){
              this.status=res.content.status
              this.awaitReceiptFn()
              this.awaitPayFn()
              this.awaitShipFn()
              this.awaitCommentFn()
            }
          }
        })
      },
      awaitReceiptFn(){
        vipOrderInfo(AMOUNT,this.await_receipt_last,this.status.await_receipt).then(res=>{
          this.isLoading=false
          if(res.error===ERROK){
            let arr=[]
            for(let key in res.content){
              arr.push(res.content[key])
            }
            if(arr.length<10){
              this.await_receipt_hasMore=false
            }
            this.await_receipt_arr=this.await_receipt_arr.concat(arr)
            if(!this.await_receipt_arr.length){
              this.has_await_receipt=false
            }
            setTimeout(()=>{
              this.$refs.scroll.refresh()
            },50)
          }
        })
      },
      awaitPayFn(){
        this.isLoading=true
        vipOrderInfo(AMOUNT,this.await_pay_last,this.status.await_pay).then(res=>{
          this.isLoading=false
          if(res.error===ERROK){
            let arr=[]
            for(let key in res.content){
              arr.push(res.content[key])
            }
            if(arr.length<10){
              this.await_pay_hasMore=false
            }
            this.await_pay_arr=this.await_pay_arr.concat(arr)
            if(!this.await_pay_arr.length){
              this.has_await_pay=false
            }
            setTimeout(()=>{
              this.$refs.scroll.refresh()
            },50)
          }
        })
      },
      awaitShipFn(){
        this.isLoading=true
        vipOrderInfo(AMOUNT,this.await_ship_last,this.status.await_ship).then(res=>{
          console.log(res);
          this.isLoading=false
          if(res.error===ERROK){
            let arr=[]
            for(let key in res.content){
              arr.push(res.content[key])
            }
            if(arr.length<10){
              this.await_ship_hasMore=false
            }
            this.await_ship_arr=this.await_ship_arr.concat(arr)
            if(!this.await_ship_arr.length){
              this.has_await_ship=false
            }
            setTimeout(()=>{
              this.$refs.scroll.refresh()
            },50)
          }
        })
      },
      awaitCommentFn(){
        this.isLoading=true
        vipOrderInfo(AMOUNT,this.await_comment_last,this.status.await_comment).then(res=>{
          console.log(res);
          this.isLoading=false
          if(res.error===ERROK){
            let arr=[]
            for(let key in res.content){
              arr.push(res.content[key])
            }
            if(arr.length<10){
              this.await_comment_hasMore=false
            }
            this.await_comment_arr=this.await_comment_arr.concat(arr)
            if(!this.await_comment_arr.length){
              this.has_await_comment=false
            }
            setTimeout(()=>{
              this.$refs.scroll.refresh()
            },50)
          }
        })
      },
      loadMore(){
        if(this.isLoading){
          return
        }
        if(this.orderIndex===1){
          if(!this.await_pay_hasMore){
            return
          }
          this.await_pay_last=this.await_pay_arr.length
          this.awaitPayFn()
        }
        if(this.orderIndex===2){
          if(!this.await_receipt_hasMore){
            return
          }
          this.await_receipt_last=this.await_receipt_arr.length
          this.awaitReceiptFn()
        }
        if(this.orderIndex===3){
          if(!this.await_ship_hasMore){
            return
          }
          this.await_ship_last=this.await_ship_arr.length
          this.awaitShipFn()
        }
        if(this.orderIndex===4){
          if(!this.await_comment_hasMore){
            return
          }
          this.await_comment_last=this.await_comment_arr.length
          this.awaitCommentFn()
        }
      },
      jumpLogisticsDetails(){
        this.$router.push({
          path:"/mine/order/LogisticsDetails",
          query:{}
        })
      },
      jumpPay(item){
        this.$router.push({
          path:"/mine/order/orderConfirm",
          query:{}
        })
      }
    },
    watch:{
      orderIndex(newVal){
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
        width 20%
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
    .order-detail
      padding-bottom 3.5rem
      .emptyCart
        background #fff
        text-align center
        font-size 1.6rem
        img
          height 12.75rem
        h2
          color #666
          padding-bottom 2.9rem
      li
        padding-bottom 1rem
        .order-title
          padding 0 1.2rem
          background #fff
          line-height 3.5rem
          font-size 1.2rem
          height 3.5rem
          flex-between()
          color #666
          margin-bottom 1px
          div
            color #fe3693
          span
            color #333
    .commodity-info
      height 10rem
      width 100%
      background #fff
      display flex
      text-align left
      .commodity-img
        width 31%
        margin 0 1rem
        height 10rem
        column-center()
        img
          height 8.5rem
          width 8.5rem
      .commodity-detail
        padding 1.6rem 2.5rem 1.6rem 0
        width 64%
        flex-row(center)
        .flex-row
          flex-row-between()
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
            color #666
            font-size 1.1rem
            margin 1rem 0
            p
              overflow hidden
              text-overflow: ellipsis
              display: box
              display: -webkit-box
              -webkit-line-clamp: 2
              line-clamp: 2
              -webkit-box-orient: vertical
              word-break: break-all
            img
              width 1.8rem
              height .8rem
              vertical-align middle
          .commodity-num
            flex-start()
            .commodity-price
              font-size 1.3rem
              font-weight bolder
              color #fb2176
            .counter
              font-size 1.1rem
              color #333
              border-radius .3rem
              p
                padding .5rem 0
                width 2rem
                text-align center
              p:nth-child(2)
                font-weight bolder
                width 3rem
                border-right 1px solid #666
    .order-collect
      height 3.5rem
      line-height 3.5rem
      padding 0 1.2rem
      font-size 1.3rem
      text-align right
      background #fff
      margin 1px 0
    .operation
      height 4.5rem
      background #fff
      padding 0 1.2rem
      text-align right
      line-height 4.5rem
      span
        color #fc3683
      button
        color #fc3683
        border-radius .2rem
        height 2.6rem
        line-height 2.6rem
        padding 0 1.2rem
        margin-left .5rem
        text-align center
        font-size 1.3rem
        outline none
        background #fff
        border 1px solid #FB689E
</style>