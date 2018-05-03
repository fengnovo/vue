<template>
  <div id="mine">
    <router-view></router-view>
    <scroll
      class="scroll"
      ref="scroll"
      :swipeBounceTime="swipeBounceTime"
      :bounceTime="bounceTime"
    >
      <div>
        <div class="personal-info">
          <img @load="loadImg" class="bgImg" src="../../assets/mine/beijing@2x.png"/>
          <div class="personal-detail">
            <div class="personal-set">
              <router-link to="/mine/setting">
                <p><img src="../../assets/mine/shezhi@2x.png"/></p>
              </router-link>
            </div>
            <div class="personal-message">
              <div class="personal-icon">
                <img  v-if="user_info.headimgurl"  :src="user_info.headimgurl"/>
                <img v-if="!user_info.headimgurl" src="../../assets/discover/touxiang-@2x.png"/>
                <div class="name-member">
                  <h1 class="title-name">
                    {{user_info.user_name}}
                    <span v-if="!user_info.user_name">
                      <router-link to="/login" style="color:#fff">
                        登录
                      </router-link>
                    </span>
                  </h1>
                  <p class="member" v-if="user_info.rank_name">
                    {{user_info.rank_name}}
                  </p>
                </div>
              </div>
              <div class="join-tuo-guest" @click="upgradeTuo">
                <p v-if="is_distrib===0">
                    <span class="circle">
                     <img src="../../assets/mine/jiaru@2x.png"/>
                    </span>
                  加入鸵客
                </p>
              </div>
            </div>
            <div class="purse-performance">
              <div class="purse"  @click="jumpMyProperty">
                  <h2>
                    <span v-html="user_info.user_money||0"></span>
                    元
                  </h2>
                  <h3>我的钱包</h3>
              </div>
              <p>
                <span></span>
              </p>
              <div class="performance">
                <h2>
                  <span v-html="user_info.xiaofei_money||0"></span>
                  元</h2>
                <h3>我的消费余额</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="order-status">
          <div class="my-order" @click="jumpMyOrder(0)">
            <p>
              我的订单
            </p>
            <p class="see-all-order">
              查看全部订单
              <img src="../../assets/mine/jiankuohao@2x.png"/>
            </p>
          </div>
          <ul class="order-detail">
            <li @click="jumpMyOrder(1)">
              <div>
                <p>
                     <span class="tip" v-if="order_count.await_pay&&!(order_count.await_pay==='0')">
                      {{order_count.await_pay}}
                    </span>
                  <img src="../../assets/mine/daifukuan@2x.png"/>
                </p>

                <p>待付款</p>
              </div>
            </li>
            <li @click="jumpMyOrder(2)">
              <div>
                <p>
                     <span class="tip" v-if="order_count.await_ship&&!(order_count.await_ship==='0')">
                      {{order_count.await_ship}}
                    </span>
                  <img src="../../assets/mine/daifahuo@2x.png"/>
                </p>
                <p>待发货</p>
              </div>
            </li>
            <li @click="jumpMyOrder(3)">
              <div>
                <p>
                     <span class="tip"  v-if="order_count.await_receipt&&!(order_count.await_receipt==='0')">
                       {{order_count.await_receipt}}
                    </span>
                  <img src="../../assets/mine/daishouhuo@2x.png"/>
                </p>
                <p>待收货</p>
              </div>
            </li>
            <li @click="jumpMyOrder(4)">
              <div>
                <img src="../../assets/mine/daipingjia@2x.png"/>
                <p>待评价</p>
              </div>
            </li>
            <li @click="jumpTo('/mine/salesReturn')">
              <div>
                <img src="../../assets/mine/tuihuanhuo@2x.png"/>
                <p>退换货</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="my-property">
          <div class="title"  @click="jumpMyProperty">
            我的资产
              <div>
                <p>
                  充值/提现
                </p>
                <p>
                  <img src="../../assets/mine/jiankuohao@2x.png"/>
                </p>
              </div>
          </div>
          <ul class="property">
            <li @click="jumpMyProperty">
                <h1>￥<span v-html="accountInfo.user_money||0"></span></h1>
                <p>我的余额</p>
            </li>
            <li>
                <h1 v-html="accountInfo.user_points||0"></h1>
                <p>积分</p>
            </li>
            <li  @click="jumpTo('/mine/redPacket')">
                <h1 v-html="accountInfo.bonus_count||0"></h1>
                <p>红包</p>
            </li>
            <li>
                <h1>￥<span v-html="accountInfo.xiaofei_money||0"></span></h1>
                <p>消费余额</p>
            </li>
          </ul>
        </div>
        <div class="other-business">
          <ul>
            <li>
              <div class="business-detail"  @click="jumpTo('/mine/distribution')">
                  <img src="../../assets/mine/wodetuiguang@2x.png"/>
                  <p>
                    我的推广
                  </p>
              </div>
            </li>
            <li>
              <div class="business-detail"  @click="jumpTo('/mine/personalData')">
                  <img src="../../assets/mine/gerenziliao@2x.png"/>
                  <p>
                    个人资料
                  </p>
              </div>
            </li>
            <li>

                <div class="business-detail"  @click="jumpTo('/mine/enshrine')">
                  <img src="../../assets/mine/wodeshoucang@2x.png"/>
                  <p>
                    我的收藏
                  </p>
                </div>
            </li>
            <li>
              <div class="business-detail">
                <img src="../../assets/mine/lianxikefu@2x.png"/>
                <p>
                  联系客服
                </p>
              </div>
            </li>
            <li>

              <div class="business-detail" @click="jumpTo('/mine/addressAdministration')">
                <img src="../../assets/mine/shouhuodizhi@2x.png"/>
                <p>
                  收货地址
                </p>
              </div>
              <div></div>
            </li>
            <li>
              <div class="business-detail"  @click="jumpTo('/mine/evaluateBask')">
                  <img src="../../assets/mine/pingjiashaidan@2x.png"/>
                  <p>
                    评价晒单
                  </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <foot class="foot" :active="4"></foot>
  </div>
</template>
<script>
  import Foot from 'components/foot/foot'
  import Scroll from '../../base/scroll/scroll'
  import {orderMixin,upgradeTuoMixin} from "../../common/js/mixin";
  import {getUserInfo,vipAccountInfo} from "../../api/mine";
  import {ERROK,URLROUTER} from "../../api/config";
  import { Toast } from 'mint-ui';
  export default {
    mixins: [orderMixin,upgradeTuoMixin],
    components: {
      Foot,
      Scroll
    },
    created() {
      this.swipeBounceTime=300
      this.bounceTime=300
      getUserInfo().then((res) => {
        if (res.error === ERROK) {
          this.order_count = res.content.order_count
          this.user_info = res.content.user_info
        }
        if(res.error===301){
          this.$router.push({
            path:"/login"
          })
        }
      })
    },
    data() {
      return {
        content: '',
        order_count: '',
        user_info: {},
        accountInfo:{},
        user_money:""
      }
    },
    methods: {
      getUserInfo() {
        getUserInfo().then((res) => {
          if (res.error === ERROK) {
            this.order_count = res.content.order_count
            this.user_info = res.content.user_info
            this.setIsDistrib(this.user_info.id_distrib)
          }
          if(res.error===301){
            this.order_count = ''
            this.user_info ={}
          }
          if(res.error===501){
            window.location.href=res.content
          }
        })
      },
      getVipAccountInfo(){
        vipAccountInfo().then(res=>{
          if(res.error===ERROK){
            if(!res.content.user_info){
              return
            }
            this.accountInfo=res.content.user_info
            this.user_money=res.content.user_info.user_money
          }else{
            this.accountInfo=[]
            this.user_money=""
          }
        })
      },
      loadImg() {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      },
      jumpMyOrder(index) {
        this.setOrderIndex(index)
        this.$router.push({
          path: `/mine/order`
        })
      },
      jumpTo(path){
        if(path==="/mine/distribution"&&this.is_distrib===0){
          Toast('亲！升级为鸵客才能进行推广哦！');
          return
        }
        this.$router.push({
          path:path
        })
      },
      jumpMyProperty(){
        this.$router.push({
          path:"/mine/myProperty",
          query:{
            user_money:this.user_money
          }
        })
      },
      changePath(newPath){
        let path=newPath.fullPath
        if(path&&path==='/mine'){
          this.getUserInfo()
          this.getVipAccountInfo()
        }
      }
    },
    activated: function () {
      this.getUserInfo()
      this.getVipAccountInfo()
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    watch:{
      '$route':'changePath'
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #mine
    height 100%
    text-align center
    .scroll
      height 100%
      overflow hidden
      color #333
    .personal-info
      position relative
      .bgImg
        width 100%
      .personal-detail
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        padding-bottom 1.2rem
        flex-row(space-between)
        .personal-set
          padding 1.2rem 1.2rem 0
          text-align right
          img
            width 2.6rem
            height 2.6rem
        .personal-message
          padding-left 1.2rem
          flex-between()
          .personal-icon
            flex-between()
            img
              border-radius 50%
            .name-member
              margin-left 1.2rem
              flex-row(center)
              h1
                font-size 2.2rem
                color #fff
                text-align left
                margin-bottom .5rem
              .member
                background #fff
                color #ff6699
                font-size 1.5rem
                width 7.9rem
                height 2.2rem
                line-height 2.2rem
                margin-top .5rem
                border-radius 1.1rem
            img
              width 7.2rem
              height 7.2rem
          .join-tuo-guest
            flex-row(center)
            p
              background #fff
              height 2.2rem
              color #ff6699
              width 7.9rem
              line-height 2.2rem
              border-top-left-radius 1.1rem
              border-bottom-left-radius 1.1rem
              .circle
                img
                  width 1.7rem
                  vertical-align middle
        .purse-performance
          flex-between()
          p
            height 3rem
            width .1rem
            background #fff
          div
            width 49%
            color #fff
            h2
              font-size 1.5rem
              font-weight bolder
              margin-bottom .7rem
            h3
              font-size 1.3rem
    .order-status
      margin-top .5rem
      margin-bottom .6rem
      box-shadow 0 .1rem .2rem #D8D8D8
      .my-order
        padding 0 1.2rem
        background #fff
        height 4rem
        line-height 4rem
        font-size 1.5rem
        margin-bottom .1rem
        flex-between()
        .see-all-order
          font-size 1.2rem
          color #999
        img
          vertical-align middle
          height 1.3rem
          margin-top -.2rem
      .order-detail
        height 9rem
        padding 0 1.2rem
        background #fff
        flex-between()
        li
          flex-row(center)
          width 20%
          div
            p:first-child
              position relative
              display inline-block
              margin-top 0
              .tip
                position absolute
                top -.6rem
                right -1rem
                background: #FC3683
                color #fff
                width 1.5rem
                height 1.5rem
                line-height 1.5rem
                border-radius 50%
            img
              width 2.8rem
              height 2.8rem

            p
              font-size 1.2rem
              margin-top 1.3rem
              color #333
    .other-business
      background #fff
      box-shadow 0 .1rem .2rem #D8D8D8
      ul
        flex-start()
        background #fff
        height 17rem
        flex-wrap wrap
        align-items:center
        padding 1.5rem 0
        li
          width 25%
          font-size 1.3rem
          flex-row(center)
          div:first-child
            margin-bottom 1rem
          div
            img
              width 3rem
              height 3rem
            p
              margin-top 1rem
              color #333
    .my-property
      text-align left
      margin-bottom 1rem
      box-shadow 0 .1rem .2rem #D8D8D8
      div.title
        padding 0 1.2rem
        background #fff
        height 4rem
        line-height 4rem
        font-size 1.5rem
        border-bottom 1px solid #efefef
        position relative
        div
          position absolute
          top 0
          bottom 0
          right 1.2rem
          flex-start()
          align-items center
          p
            flex-row(center)
            font-size 1.2rem
            color #999
          img
            vertical-align middle
            height 1.3rem
            margin-left .3rem
      .property
        flex-between()
        background #fff
        text-align center
        li
          padding 1.5rem 0
          width 25%
          p
            color #333
            font-size 1.3rem
          h1
            font-size 1.5rem
            font-weight bolder
            margin-bottom 1.2rem
            color #333
            span
              font-size 1.5rem
              font-weight bolder
</style>