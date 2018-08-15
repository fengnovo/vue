<template>
  <transition name="slide">
      <div class="product-details" translate="slide">
        <div class="back" @click="back">
          <img src="../../assets/class/fanhui@2x.png"/>
        </div>
        <h1 class="title" ref="product_title">
          商品详情
          <div class="title-right">
            <p class="shopping-cart" @click="jumpShop">
              <span class="tip" v-if="goodsCount>0" v-html="goodsCount"></span>
              <img  src="../../assets/product-details/gouwuche@2x.png"/>
            </p>
            <p class="share" @click="shareShow">
              <img src="../../assets/product-details/fenxiang@2x.png"/>
            </p>
          </div>
        </h1>
        <ul class="fixed-seller-promised" v-show="fixedShow">
          <li
            :class="{'active':aboutCommodities===0}"
            @click="commodities(0)"
          >图文详情
          </li>
          <li
            :class="{'active':aboutCommodities===1}"
            @click="commodities(1)"
          >产品参数
          </li>
          <li
            :class="{'active':aboutCommodities===2}"
            @click="commodities(2)"
          >商品评价
            <span>
                   (<span v-html="commentNum"></span>)
              </span>
          </li>
        </ul>
        <div class="sliderParent"
             ref="sliderParent"
             @touchstart="sliderStart"
             @touchmove="sliderMove"
             @touchend="sliderEnd"
        >
          <transition name="fadeSlider">
            <div transition="fadeSlider" class="defaultCarousel" v-if="!pictures.length">

            </div>
          </transition>

          <div class="slider-wrapper" v-if="pictures.length">
            <slider ref="slider" :dotsCenter="true">
              <div v-for="item in pictures" v-if="item.img_url">
                <img class="needsclick"  :src="item.img_url" alt="">
              </div>
            </slider>
          </div>
        </div>
        <scroll
          class="scroll"
          ref="scroll"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll"
          :pullup="pullup"
          @scrollToEnd="loadMoreComment"
        >
          <div ref="getScrollY" style="padding-bottom: 4.9rem" >
              <div class="seckill" v-if="isSecKill">
                <div>
                  <img src="../../assets/product-details/zi@2x.png"/>
                  &nbsp;
                  <span class="price-symbol">
                ￥
              </span>
                  <span class="seckill-price">
                {{"78.00"}}
              </span>
                  <s>
                    {{168.00 | money}}
                  </s>
                </div>
                <div>
                  <h3>距离结束还剩</h3>
                  <p>
                    <span>21</span>
                    :
                    <span>16</span>
                    :
                    <span>18</span>
                  </p>
                </div>
              </div>
              <div class="product-introduction">
                <h2>
                  {{goods.goods_name}}
                </h2>
                <div>
                  <p>
                    <img src="../../assets/product-details/shoucang@2x.png"/>
                  </p>
                  <p>
                    收藏
                  </p>

                </div>
              </div>
              <div class="product-price" v-if="!isSecKill">
                <h1>￥{{goods.shop_price}}</h1>
                <h3>
                  <s>
                    ￥{{goods.market_price}}
                  </s>
                </h3>
              </div>
              <div
                :class="{'rank-bg':user_rank.rank_id==='2'}"
                class="tuo-guest-price shareholder-price other-price">
               <span>
                鸵客
              </span>
                <span class="price">
               &nbsp;￥<span v-html="rank_prices[2]?rank_prices[2].price:''"></span>
            </span>
              <p class="upgrade-shareholders" @click="UpgradeTuoShow=true">
                 <span v-if="!isSecKill&&Number(user_rank.rank_id)<2">
                    升级鸵客
                </span>
              </p>
              </div>
              <div
                :class="{'rank-bg':user_rank.rank_id==='3'}"
                class="shareholder-price other-price"
                style="border-top:0"
              >
              <span>
                股东
              </span>
                <span class="price">
               &nbsp;￥<span v-html="rank_prices[3]?rank_prices[3].price:''"></span>
            </span>
                <p class="upgrade-shareholders" @click="UpgradePShow=true">
                 <span v-if="!isSecKill&&Number(user_rank.rank_id)<3">
                    升级股东
                </span>
                </p>
              </div>
              <div class="product-size" v-if="speArr.length" @click="choiceSizeFn">
                <p>
              <span class="product-size-detail" v-html="attrDetail.goods_attr?'已选':'未选'">
              </span>
                  <span v-html="attrDetail.goods_attr?attrDetail.goods_attr:'  请选择规格数量'">
              </span>
                </p>
                <div>
                  <img src="../../assets/product-details/gengduo@2x.png"/>
                </div>

              </div>
              <ul class="seller-promised" style="border-bottom: 1rem solid #efefef">
                <li>
                  <img src="../../assets/product-details/zhengpinbaozhang@2x.png"/>
                  正品保证
                </li>
                <li>
                  <img src="../../assets/product-details/jisufahuo@2x.png"/>
                  急速发货
                </li>
                <li>
                  <img src="../../assets/product-details/jiayipeishi@2x.png"/>
                  假一赔十
                </li>
                <li>
                  <img src="../../assets/product-details/huangjiafuwu@2x.png"/>
                  皇家服务
                </li>
              </ul>
              <ul ref="sellerPromised" class="about-commodities seller-promised">
                <li
                  :class="{'active':aboutCommodities===0}"
                  @click="commodities(0)"
                >图文详情
                </li>
                <li
                  :class="{'active':aboutCommodities===1}"
                  @click="commodities(1)"
                >产品参数
                </li>
                <li
                  :class="{'active':aboutCommodities===2}"
                  @click="commodities(2)"
                >商品评价
                  <span>
                (<span v-html="commentNum"></span>)
              </span>
                </li>
              </ul>
              <div class="product-info">
                <div
                  class="graphic-details-one"
                  v-show="aboutCommodities===0"
                  ref="goods_desc"
                  v-html="goods.goods_desc"
                ></div>
                <ul
                  class="description"
                  v-show="aboutCommodities===1"
                  ref="description"
                >
                  <li v-for="(item,index) in pro" :key="index">
                    <h3 v-html="item.name">
                    </h3>
                    <p v-html="item.value">
                    </p>
                  </li>
                  <li class="detail-empty" v-if="!pro.length">
                    <img src="../../assets/product-details/canshuwu.png"/>
                    <p>该产品暂无参数</p>
                  </li>
                </ul>
                <ul
                  class="product-comment"
                  ref="product_comment"
                  v-show="aboutCommodities===2">
                  <li  class="detail-empty"  v-if="!commentList.length">
                    <img src="../../assets/product-details/pingjiawu.png"/>
                    <p>还没有人评论过哦！</p>
                  </li>
                 <li class="li-product-comment" v-for="(item,index) in commentList" :key="index">
                    <p class="head-portraits">
                      <img v-if="item.headimg" v-lazy="item.headimg"/>
                      <img v-if="!item.headimg" src="../../assets/discover/touxiang-@2x.png"/>
                      <span class="comment-time" v-html="item.add_time_str">
                  </span>
                    </p>
                    <ul class="comment-detail">
                      <li>
                        <p v-html="item.user_name"></p>
                        <comment-star :starNum="parseInt(item.comment_rank)"></comment-star>
                      </li>
                      <li class="comment-content" v-html="item.content">
                      </li>
                    </ul>
                  </li>
                  <li class="loadMore" >
                    <loading v-show="commentHasMore" title=""></loading>
                  </li>
                </ul>
              </div>
          </div>
        </scroll>
        <div class="product-foot" ref="product_foot">
          <div class="small-button">
            <div>
              <router-link to="/home" style="color:#fb3180">
                <p>
                  <img src="../../assets/home_gaoliang@2x.png"/>
                </p>
                首页
              </router-link>
            </div>
            <div>
              <p>
                <img src="../../assets/mine/lianxikefu@2x.png"/>
              </p>
              客服
            </div>
            <div @click="createPoster">
              <p>
                <img src="../../assets/product-details/shengchenghaibao.png"/>
              </p>
              生成海报
            </div>
          </div>
          <div class="big-button">
            <p @click="joinShopCart">
              加入购物车
            </p>
            <p @click="jumpBuy">
              立即购买
            </p>
          </div>
        </div>
        <div v-show="choiceSize" class="size-choice">
        </div>
        <transition name="fade">
          <div v-show="choiceSize"  transition="fade" class="size-choice" style="background: transparent">
            <div class="choice-box">
              <div class="product-detail">
                <p>
                  <img :src="attrDetail.goods_attr_thumb"/>
                </p>
                <div class="spec-detail">
                  <h2>￥<span v-html="attrDetail.result"></span></h2>
                  <p>
                    库存<span v-html="attrDetail.goods_attr_number"></span>件
                  </p>
                  <p>
                    已选:
                    <span v-html="qty"></span>
                  </p>
                </div>
              </div>
              <div class="specification-detail">
                <div v-for="(item,index) in speArr">
                  <h3 class="specification-title">{{item.name}}</h3>
                  <ul class="specification-content">
                    <li v-for="(val,i) in item.values"
                        @click="switchover(val,item.values)"
                        :class="{'attractive':val.selected_key==='1'}"
                    >

                      <span v-if="val.disabled!=='1'" v-html="val.label"></span>
                     <s v-if="val.disabled==='1'" v-html="val.label"></s>
                    </li>
                  </ul>
                </div>
                <div class="commodity-num">
                  <h2 class="commodity-price">
                    购买数量
                    <p v-if="goods.is_buy==='1'">
                    (限购<span v-html="goods.buymax"></span>件)
                    </p>
                    <p v-if="goods.is_buy==='1'">
                      结束时间 <span v-html="V_dateFilter"></span>
                    </p>
                  </h2>
                  <div class="counter">
                    <p @click="changeQty(-1)">-</p>
                    <p>{{qty}}</p>
                    <p @click="changeQty(1)">+</p>
                  </div>
                </div>
              </div>

              <div
                class="specification-confirm"
                @click="joinConfirm"
              >
                确定
              </div>
              <div class="close-choice-box" @click="choiceSize=false">

                <img src="../../assets/Login/guanbi@2x.png"/>
              </div>
            </div>
          </div>
        </transition>
        <div v-show="bg" class="size-choice">
        </div>
        <!--分享-->
        <transition name="fade">
          <div v-show="share" transition="fade" class="size-choice" style="background: transparent">
            <div class="share-box choice-box">
              <ul>
                <li>
                  <p>
                    <img src="../../assets/order-confirm/weixin@2x.png"/>
                  </p>
                  <p>
                    微信好友
                  </p>
                </li>
                <li>
                  <p>
                    <img src="../../assets/product-details/pengyouquan@2x.png"/>
                  </p>
                  <p>
                    朋友圈
                  </p>
                </li>
                <li>
                  <p>
                    <img src="../../assets/product-details/qq@2x.png"/>
                  </p>
                  <p>
                    QQ好友
                  </p>
                </li>
                <li>
                  <p>
                    <img src="../../assets/product-details/kongjian@2x.png"/>
                  </p>
                  <p>
                    QQ空间
                  </p>
                </li>
                <li>
                  <p>
                    <img src="../../assets/product-details/weibo@2x.png"/>
                  </p>
                  <p>
                    新浪微博
                  </p>
                </li>
                <li>
                  <p>
                    <img src="../../assets/product-details/lianjie@2x.png"/>
                  </p>
                  <p>
                    复制链接
                  </p>
                </li>
                <li>
                  <p>
                    <img src="../../assets/product-details/erweima@2x.png"/>
                  </p>
                  <p>
                    短信
                  </p>
                </li>
                <li>
                  <p>
                    <img src="../../assets/product-details/youxiang@2x.png"/>
                  </p>
                  <p>
                    邮箱
                  </p>
                </li>
              </ul>
              <div class="cancel">
                <p @click="cancel">
                  取消
                </p>
              </div>
            </div>
          </div>
        </transition>
        <!--生成海报-->
        <transition name="fadeSlider">
          <div v-show="poster" transition="fadeSlider" class="size-choice" style="background: transparent">
            <div class="poster">
              <div
                class="poster-content"
              >
                <img v-lazy="'http://www.tuoniaoshangcheng.com/mobile/shareimg.php?id='+goodsId" alt="">
              </div>
              <div class="cancel-poster">
                <p>
                  长按图片->发送给朋友
                </p>
                <p @click="cancelPoster">
                  <img src="../../assets/product-details/guanbi.png"/>
                </p>
              </div>
            </div>
          </div>
        </transition>
        <div class="fixedLoading" v-show="fixedLoading">
          <loading></loading>
        </div>
        <transition name="fade">
          <div class="loading"  transition="fade" v-show="Object.keys(content).length===0">
            <loading></loading>
          </div>
        </transition>
        <router-view></router-view>
        <qr-code
          v-show="!isAttention"
          @close="closeQRcode"
        ></qr-code>
        <upgrade-tuo
          v-if="UpgradeTuoShow"
          @cancle="UpgradeTuoShow=false"
          @confirm="jumpBuy"
        ></upgrade-tuo>
        <upgrade-partner
          v-if="UpgradePShow"
          @cancle="UpgradePShow=false"
          @confirm="jumpBuy"
        ></upgrade-partner>
      </div>
  </transition>
</template>
<script>
  import Slider from "../../base/slider/slider"
  import Scroll from "../../base/scroll/scroll"
  import CommentStar from "../../base/star/comment-star"
  import UpgradeTuo from "components/UpgradeTuo/UpgradeTuo"
  import UpgradePartner from "components/UpgradePartner/UpgradePartner"
  import {prefixStyle} from 'common/js/dom'
  import {getDetailInfo,joinShopCart,getComment} from "../../api/detail";
  import {theAttrDetail,getShopCart} from "../../api/shop";
  import {ERROK} from "../../api/config";
  import { MessageBox } from 'mint-ui';
  import Loading from "../../base/loading/loading"
  import QrCode from "../../base/attationQRcode/attationQRcode"
  import { Toast } from 'mint-ui';
  import {dateFilter} from "../../common/js/util";
  const transform = prefixStyle('transform')
  export default {
    name: "product-details",
    created() {
      this.listenScroll = true
      this.probeType = 3
      this.pullup = true
      this.bounce = false
      this.$setgoindex()
      this.goodsId=this.$route.query.goods_id;
      if(this.goodsId==="2283"){
        this.UpgradePShow=true
      }
      if(this.goodsId==="2282"){
        this.UpgradeTuoShow=true
      }
      this.getDetail()
      this.getShopCart()
      this.getComment()
      this.$setgoindex()
      setTimeout(() => {
        if (this.$refs.slider) {
          this.$refs.slider.refreshSlider()
        }
      }, 20)
      let isSecKill = this.$route.query.isSecKill
      if (isSecKill != null) {
        if(typeof isSecKill==="string"){
          this.isSecKill = isSecKill==="false"?false:true
        }
        if(typeof isSecKill==="boolean"){
          this.isSecKill = isSecKill
        }
      } else{
        this.isSecKill = false
      }
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    mounted() {
      this.setDefaultHeight()
  },
    data() {
      return {
        goodsId:"",
        bg:false,
        share:false,
        aboutCommodities: 0,
        choiceSize: false,
        scrollY: -1,
        sliderY:0,
        fixedShow: false,
        isSecKill: false,
        goods:{},
        pictures:[],
        rank_prices:{},
        content:{},
        user_rank:{},
        speArr:[],
        attrIdArr:[],
        qty:0,
        attrDetail:{},
        fixedLoading:false,
        goodsCount:0,
        poster:false,
        pro:[],
        commentList:[],
        commentNum:'',
        page:1,
        commentHasMore:true,
        isAttention:true,
        //是否显示升级鸵客
        UpgradeTuoShow:false,
        //是否显示升级股东
        UpgradePShow:false
      }
    },
    methods: {
      getShopCart(){
        getShopCart().then(res=>{
          if(res.error===ERROK){
            this.goodsCount=res.content.total.real_goods_count
          }
        })
      },
      getDetail() {
        this.pictures=[]
        if(!this.goodsId){
          MessageBox.alert( "该商品不存在或者已经删除","温馨提示").then(()=>{
            this.back()
          });
        }
        getDetailInfo(this.goodsId).then(res => {
          if(res.error===ERROK){
            this.content=res.content
            this.goods=this.content.goods
            console.log(this.goods);
            //给图片加事件
            setTimeout(()=>{
              this.change_good_desc()
            },20)

            this.pictures=this.content.pictures
            this.rank_prices=this.content.rank_prices
            this.user_rank=this.content.user_rank
            //商品属性
            if(this.content.properties.spe){
                let speObj=this.content.properties.spe
              this.speArr=[]
              for(let key in speObj){
                  this.speArr.push(speObj[key])
                if(!speObj[key].values){
                    continue
                }
                for(let i=0;i<speObj[key].values.length;i++){
                    let obj=speObj[key].values[i]
                  if(obj["selected_key"]==="1"){
                      this.attrIdArr.push(obj.id)
                  }
                }
              }
            }
          //  商品参数
            if(this.content.properties.pro){
              let proObj=this.content.properties.pro

              for(let key in proObj){
                let keyObj=proObj[key]
                for(let n in keyObj){
                  this.pro.push(keyObj[n])
                }

              }
            }
          }
          if(res.error==="该商品不存在或者已经删除"){
            MessageBox.alert( res.error,"温馨提示").then(()=>{
              this.back()
            });

          }
          if(this.$refs.scroll){
            setTimeout(()=>{
              this.$refs.scroll.refresh()
            },20)
          }

        })
      },
      getAttrDetail(){
        this.fixedLoading=true
        theAttrDetail('price',this.goodsId,this.attrIdArr.join(","),this.qty).then(res=>{
          this.fixedLoading=false
          this.attrDetail=res
          this.qty=res.qty
        })
      },
      getComment(){
        getComment(this.goodsId,this.page).then(res=>{
          if(res.content.item_list==null){
            this.commentHasMore=false
          }
         if(res.content.item_list) {
           if(res.content.item_list.length<10){
             this.commentHasMore=false
           }
           this.commentList=this.commentList.concat(res.content.item_list)
           setTimeout(()=>{
             if(this.$refs.scroll){
               this.$refs.scroll.refresh()
             }

           },50)
         }
          this.commentNum=res.content.count
        })
      },
      loadImg() {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          if(this.$refs.scroll){
            this.$refs.scroll.refresh()
          }
        }, 160)
      },
      back() {
        this.pictures=[]
        if (this.$route.query.goindex === 'true') {
          this.$router.push('/')
        } else {
          this.$router.back(-1)
        }
      },
      commodities(index) {
        this.aboutCommodities = index
        setTimeout(()=>{
          this.$refs.scroll.refresh()
        },20)
      },
      scroll(pos) {
        this.sliderY=0
        this.scrollY = pos.y
      },
      jumpBuy(){
        this.$router.push({
          path:"/orderConfirm"
        })
      },
      jumpShop(){
        this.$router.push({
          path:"/shop"
        })
      },
      shareShow(){
        this.bg=true
        this.share=true
      },
      cancel(){
        this.bg=false
        this.share=false
      },
      changeQty(way){
        if(way<0){
          if(this.qty<=1){
            this.qty=1
            return
          }
          this.qty--
        }
        if(way>0){
          if(this.goods.is_buy==='1'){
            if(this.qty>=parseInt(this.goods.buymax)){
              Toast("亲！您已达到最大购买量，不能再添加啦")
              this.qty=parseInt(this.goods.buymax)
              return
            }
          }
          this.qty++
        }

        this.getAttrDetail()
      },
      choiceSizeFn(){
        this.choiceSize=true
        this.getAttrDetail()
      },
      switchover(val,valArr){
        if(val.disabled==="1"){
          return
        }
        valArr.forEach((item)=>{
            item.selected_key="2"
        })
        val.selected_key="1"
        this.attrIdArr=[]
        this.speArr.forEach((item,index)=>{
          item.values.forEach((attr,n)=>{
            if(attr.selected_key==="1"){
              this.attrIdArr.push(attr.id)
            }
          })
        })
        this.getAttrDetail()
      },
      joinShopCart(){
        this.choiceSize=true
        this.getAttrDetail()
      },
      joinConfirm(){
        this.fixedLoading=true
        let goods={}
        goods.parent=0
        goods.quick=0
        goods.spec=this.attrIdArr
        goods.goods_id=this.goodsId
        goods.number=this.qty
        joinShopCart(JSON.stringify(goods)).then(res=>{
          this.fixedLoading=false
          if(res.error===0){
            Toast('添加成功！在购物车等候亲！');
          }
          if(res.error===999){
            MessageBox.alert(res.message).then(()=>{
              this.$router.push({
                path:"/login"
              })
            })
          }
          if(res.error===888){
            MessageBox.alert(res.message)
          }
          if(res.error===666){
            this.bg=true
            this.isAttention=false
          }
          this.choiceSize=false
          this.getShopCart()
        })
      },
      createPoster(){
        this.bg=true
        this.poster=true
      },
      cancelPoster(){
        this.bg=false
        this.poster=false
      },
      change_good_desc(){
        let divs=this.$refs.goods_desc;
        let _this=this
        if(divs){
          let imgs=divs.getElementsByTagName("img");
          for(let i=0,len=imgs.length;i<len;i++){
              imgs[i].onload=function(){
                _this.loadImg()
              }
          }
        }
      },
      sliderMove(e){
        this.moveY=e.touches[0].screenY
        let moveDist=this.moveY-this.startY
        if(Math.abs(moveDist)<20){
          return
        }
        this.scrollY=moveDist+this.sliderY
        this.$refs.scroll.scrollTo(0,this.scrollY)
      },
      sliderStart(e){
        this.startY=e.touches[0].screenY
      },
      sliderEnd(e){
        this.sliderY=this.scrollY
        if(Math.abs(this.sliderY)<20){
          return
        }
        if(this.scrollY>0){
          this.scrollY=-1
            this.sliderY=0
          this.$refs.scroll.scrollTo(0,this.scrollY,800)
        }

      },
      setDefaultHeight(){
        this.sliderHeight = this.$refs.sliderParent.clientHeight
        this.titleHeight = this.$refs.product_title.clientHeight
        this.$refs.scroll.$el.style.marginTop = `${this.sliderHeight}px`
        this.$refs.getScrollY.style.paddingBottom = `${this.sliderHeight+this.titleHeight }px`
       let scrollHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let minusHeight=this.titleHeight+this.$refs.sellerPromised.clientHeight+this.$refs.product_foot.clientHeight
        let elHeight=scrollHeight-minusHeight;
        this.$refs.goods_desc.style.minHeight=elHeight+'px'
        this.$refs.description.style.minHeight=elHeight+'px'
        this.$refs.product_comment.style.minHeight=elHeight+'px'
      },
      loadMoreComment(){
          this.page++
        this.getComment()
      },
      closeQRcode(){
        this.bg=false
        this.isAttention=true
      }
    },
    computed:{
      V_dateFilter(){
        let _date=dateFilter(this.goods.buymax_end_date);
        return _date
      }
    },
    components: {
      Slider,
      Scroll,
      Loading,
      CommentStar,
      QrCode,
      UpgradeTuo,
      UpgradePartner
    },
    filters: {
      money: function (value) {
        if (value) {
          return "￥" + value.toFixed(2)
        }

      }
    },
    watch: {
      aboutCommodities() {
        setTimeout(() => {
          this.$refs.scroll.refresh()
          var scrollY = this.$refs.getScrollY.style.transform.split(",")[1].split(")")[0]
          this.scrollY = Number(scrollY.slice(0, scrollY.length - 2)) + 1
        }, 20)
      },
      scrollY(newY) {
        let scale = 1 // 放大
        let percentCalc=this.sliderHeight
        const percent = Math.abs(newY / percentCalc)
        if (newY > 0) {
          scale = 1 + percent
        }
        this.$refs.sliderParent.style.marginTop = newY/2+"px"
        this.$refs.sliderParent.style[transform] = `scale(${scale})`
        let top = newY + this.$refs.sellerPromised.offsetTop+this.sliderHeight
        if (top <= 0) {
          this.fixedShow = true
        } else {
          this.fixedShow = false
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
    .rank-bg
      background #fff4fa!important
    .loading
      position absolute
      right 0
      left 0
      top 4.4rem
      bottom 0
      background rgba(255, 255, 255, 1)
      z-index 1001
      flex-center()
      align-items center
    .loading.fade-leave-active
      animation: fade-out .5s
    .defaultCarousel
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      background-image url("../../common/image/load.gif")
      background-repeat no-repeat
      background-position center center
      background-size 100% 100%
    .defaultCarousel.fadeSlider-enter-active
      animation: fade-in 0s;

    .defaultCarousel.fadeSlider-leave-active
      animation: fade-out .3s
    .sliderParent
      width 100%
      padding-top 100%
      position relative
    .product-details
      position: fixed
      z-index: 100
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: #efefef
      padding-top 4.4rem
      color #333
      .back
        position absolute
        top: 0
        left: 0
        z-index: 102
        height 4.4rem
        padding-left 1rem
        flex-row(center)
        img
          width 1rem
          height 2rem
          vertical-align middle
      .title
        position: absolute
        top: 0
        z-index: 101
        width: 100%
        background #fff
        margin-bottom 1px
        border-bottom 1px solid #efefef
        text-align: center
        line-height: 4.4rem
        height 4.4rem
        font-size: 1.7rem
        color: #333
        font-weight bolder
        .title-right
          position absolute
          top 0
          right 1.2rem
          height 100%
          flex-between()
          .tip
            position absolute
            top 0
            right -.6rem
            font-size 1rem
            background: #FC3683
            color #fff
            width 1.5rem
            height 1.5rem
            line-height 1.5rem
            border-radius 50%
          p:last-child
            margin-left 1.6rem
          p
            position relative
            flex-row(center)
            img
              width 2.4rem
      .fixed-seller-promised
        position fixed
        top 4.4rem
        color #000
        width 100%
        z-index: 40
        flex-between()
        background #fff
        text-align center
        padding 0 2rem
        li
          width 33.33%
          font-size 1.4rem
          height 5rem
          line-height 5rem
          overflow hidden
        .active
          color #fb2b7c
      .scroll
        height 100%
        position fixed
        top 4.4rem
        bottom 4.9rem
        width 100%
        .transparent-bg
          background transparent
        .slider-wrapper
          position absolute
          top 0
          bottom 0
          left 0
          right 0
          overflow: hidden
        .seckill
          padding .8rem 1.2rem
          background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#FC337F), to(#E63F9E));
          color #fff
          font-size 1.2rem
          flex-between()
          div:first-child
            img
              width 4rem
              vertical-align bottom
            span.seckill-price
              font-size 3rem
              font-weight bolder
            span.price-symbol
              font-weight bolder
              font-size 1.5rem
          div:last-child
            flex-row(center)
            font-size 1rem
            p
              margin-top .5rem
              span
                color #fc327f
                background #fff
                border-radius 2px
                display inline-block
                width 1.7rem
                height 1.7rem
                text-align center
                line-height 1.7rem
        .product-introduction
          margin-top 1px
          background #fff
          padding 1rem 1.2rem 1.8rem
          flex-between()
          h2, div
            flex-row(center)
          div
            text-align center
            font-size 1.2rem
            p
              width 3rem
            img
              width 2rem
              height 2rem
              margin-bottom .3rem
          h2
            line-height 2rem
            font-size 1.6rem
            padding-right 1.5rem
            overflow: hidden
            text-overflow: ellipsis
            display: box
            display: -webkit-box
            -webkit-line-clamp: 2
            line-clamp: 2
            -webkit-box-orient: vertical
            word-break: break-all
            height 4rem
        .product-price
          flex-start()
          padding 0 1.2rem 1.9rem
          background #fff
          h1
            font-size 2.1rem
            margin-right 1.5rem
          h3
            font-size 1.2rem
            color #666
            flex-row(center)
        .other-price
          height 4.5rem
          line-height 4.5rem
          font-size 1.5rem
          padding 0 1.2rem
          .price
            font-weight bolder
        .tuo-guest-price
          span
            color #fb2b7c
        .shareholder-price
          position relative
          background #fff
          border-top 1px solid #efefef
          border-bottom 1px solid #efefef
          color #fb2b7c
          .upgrade-shareholders
            position absolute
            top 0
            right 1rem
            height 4.5rem
            line-height 4.5rem
            span
              border 1px solid #F9347C
              border-radius 3px
              padding .3rem .8rem
        .product-size
          padding 0 1.2rem
          line-height 5rem
          height 5rem
          flex-between()
          background #fff
          margin-bottom 1px
          font-size 1.3rem
          color #666
          p
            overflow hidden
          .product-size-detail
            margin-right 1.8rem
          div
            flex-row(center)
            img
              height 1.3rem
        .seller-promised
          flex-between()
          background #fff
          text-align center
          li
            width 25%
            height 5rem
            font-size 1.2rem
            line-height 5rem
            img
              vertical-align middle
              width 1.7rem
              height 1.7rem
              margin-top -.2rem
              margin-right .2rem
        .about-commodities
          padding 0 2rem
          margin-bottom 0
          li
            width 33.33%
            font-size 1.4rem
            overflow hidden
          .active
            color #fb2b7c
        .product-info
          padding-bottom 4.9rem
          .loadMore
            background #efefef
            img
              width auto
          .detail-empty
            display block
            padding-top 4rem
            text-align center
            color #666
            font-size 1.6rem
            p
              width 100%
              padding 0
            img
              width 73%
          .graphic-details-one
            background #fff
            p:first-child
              border-top 1px solid #efefef
            p:not(:last-child)
              padding 0 1.2rem
            p
              padding-top 1.2rem!important
              font-size 1.6rem
          img
            width 100%
        .graphic-details
          padding-top .5rem
        .description
          background #fff
          font-size 1.4rem
          li
            border-top 1px solid #ddd
            flex-start()
            padding 1.2rem
            p
              width 80%
              padding-left 1rem
            h3
              color #999
              width 20%
            h3, p
              flex-row(center)
        .product-comment
          background #fff
          .li-product-comment
            position: relative
            border-top 1px solid #efefef
            flex-start()
            padding 1.2rem
            .head-portraits
              margin-right .8rem
              img
                width 2.7rem
                height 2.7rem
                border-radius 50%
              .comment-time
                position absolute
                top 2rem
                right 1.2rem
                color #999
                font-size 1.2rem
            .comment-detail
              justify-content center
              li:first-child
                font-size 1.3rem
                .stars
                  margin-top .3rem
                  img
                    width 1rem
                    height 1rem
              li:nth-child(2)
                font-size 1.5rem
                padding 1rem 0 1.5rem
              li:last-child
                font-size 1.2rem
                color #999
      .product-foot
        text-align center
        position: fixed
        z-index: 50
        width 100%
        height 4.9rem
        bottom: 0
        background #fff
        flex-between()
        .small-button, .big-button
          width 50%
          flex-between()
        .small-button
          color #fb3180
          img
            width 2rem
            height 2rem
            margin-bottom .3rem
          div
            width 33.333%
            flex-row(center)
          div:nth-child(2)
            border-left 1px solid #FBFBFB
            border-right 1px solid #FBFBFB
        .big-button
          p
            width 50%
            line-height 4.9rem
            height 4.9rem
            font-size 1.6rem
          p:first-child
            color #FA5896
            background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#fec6dd), to(#fec6dd));
          p:last-child
            color #fff
            background #fb3180

    .size-choice
      position fixed
      z-index 100
      top 0
      right 0
      bottom 0
      left 0
      overflow auto
      color #fff
      background rgba(0,0,0, 0.5)
      &.fade-enter-active
        animation: bounce-in .3s;
      &.fade-leave-active
        animation: bounce-out .3s;
      .choice-box
        background #fff
        position absolute
        bottom 0
        width 100%
        height 70%
        .close-choice-box
          color #333
          font-size 2.3rem
          position absolute
          top .5rem
          right 1.2rem
          width 5rem
          height 3rem
          text-align right
          img
            width 1.5rem
            height 1.5rem
        .product-detail
          padding-left 1.2rem
          height 9rem
          flex-start()
          color #999
          border-bottom 1px solid #efefef
          padding-bottom 1.5rem
          font-size 1.3rem
          position absolute
          top 0
          width 100%
          background #fff
          img
            width 8rem
            margin-top -1rem
          .spec-detail
            margin-left 1rem
            flex-row-between()
            padding 1rem 0
            h2
              font-weight bolder
              font-size 1.4rem
              color #FC2E7A
        .specification-detail
          max-height 100%
          background #fff
          padding 1.2rem
          font-size 1.3rem
          overflow-y scroll
          padding-top 9rem
          padding-bottom 3.6rem
          .specification-title
            color #333
            margin-bottom 1rem
          .specification-content
            font-size 1.2rem
            color #757575
            border-bottom 1px solid #efefef
            margin-bottom .5rem
            li
              display inline-block
              background #EFEFEF
              border-radius .4rem
              height 2.3rem
              padding 0 1.2rem
              line-height 2.3rem
              margin 0  1rem .5rem 0
            li.attractive
              color #fff!important
              background #FC2D7B!important
        .commodity-num
          padding 1.2rem
          border-bottom 1px solid #efefef
          flex-between()
          .commodity-price
            font-size 1.4rem
            color #646464
            column-center()
            p
              margin-top .2rem
          .counter
            flex-between()
            border 1px solid #666
            font-size 1.1rem
            color #333
            border-radius .3rem
            p
              padding .5rem 0
              width 2rem
              text-align center
              flex-row(center)
            p:nth-child(2)
              border-left 1px solid #666
              font-weight bolder
              width 3rem
              border-right 1px solid #666
        .specification-confirm
          position absolute
          bottom 0
          width 100%
          text-align center
          background #F62C78
          letter-spacing .2rem
          height 3.6rem
          line-height: 3.6rem
          font-size 1.8rem
      .share-box
        height 23.8rem
        ul
          flex-between()
          flex-wrap wrap
          padding 2rem 0 1rem 0
          font-size 1.3rem
          li
            width 25%
            text-align center
            margin-bottom 1rem
            p:first-child
              margin-bottom 1rem
            p
              color #333
              img
                width 4.1rem
                height 4.1rem
        .cancel
          position absolute
          bottom 1rem
          padding 0 1.2rem
          width 100%
          text-align center
          p
            color #333
            font-size 1.5rem
            border-radius 4px
            border 1px solid #CBCBCB
            height 4.2rem
            line-height 4.2rem
      .poster
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
        width 80%
        text-align center
        .poster-content
          position relative
          padding-bottom 142%
          color #333
          margin-bottom 1rem
          text-align left
          background-color #fff
          background-size contain
          background-repeat no-repeat
          background-position center center
          img
            position absolute
            width 100%
          .poster-info
            flex-between()
            margin-top 1rem
          .poster-right,.poster-left
            flex-row(space-between)
          .poster-right
            width 30%
            h3
              font-size 1.4rem
              margin-top 1rem
            p
              text-align center
            img
              width 80%
          .poster-left
            width 70%
            padding-right 1rem
            div
              h1
                font-size 1.6rem
                font-weight bolder
                color #fb3180
                margin-bottom .8rem
              p
                color #999
                font-size 1.2rem
            h2
              font-size 1.5rem
              font-weight bolder
              line-height 1.8rem
        .cancel-poster
          color #fff
          text-align center
          p
            font-size 1.6rem
            margin-bottom .5rem
            img
              width 3rem
              height 3rem
      &.fadeSlider-enter-active
        animation: fade-in .5s;
      &.fadeSlider-leave-active
        animation: fade-out .5s;
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
        transform: translateY(0)
      }

      100% {
        transform: translateY(100%)
      }
    }
</style>