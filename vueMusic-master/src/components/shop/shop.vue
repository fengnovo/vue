<template>
  <div id="discover">
    <fixed-title :text="titleText" :isEdit="isEdit"></fixed-title>
    <scroll
      ref="scroll"
      class="scroll"
      :pullup="pullup"
      @scrollToEnd="loadMore"
      @scroll="scroll"
      :listenScroll="listenScroll"
      :probeType="probeType"
    >
      <div class="scroll-content"
           @touchend="touchend"
           ref="scroll_content"
      >
        <div class="top-tip">
            {{topTip}}
        </div>
        <div class="emptyCart" v-show="isEmpty">
          <img src="../../assets/shop/kong@2x.png"/>
          <h2>您的购物车空空如也</h2>
          <router-link to="/home">
            <button>去逛逛</button>
          </router-link>
        </div>
        <div class="commoditys"
             v-show="goods_list.length"
             v-for="(item,index) in goods_list"
        >
          <div class="self-manage"
               @click="selStore(item)">
            <i class="icon-circle" :class="{'check':item.checked}"></i>
            {{item.supplier_name}}
          </div>
          <div class="commodity" v-for="(itemSon,indexSon) in item.goods_list">
            <div class="commodity-info"
                 ref="touchmove"
                 @touchmove.prevent="onTouchMove(indexSon)"
                 @touchstart.prevent="onTouchStart(indexSon)"
                 @touchend.prevent="onTouchEnd(indexSon)"
            >
              <div class="circle-parent"
                   @click="selectedProduct(itemSon,item)"
                   :class="{'checked':sel_goods_copy.indexOf(itemSon.rec_id)!==-1}"
              >
                <i class="icon-circle"
                   :class="{'checked':sel_goods_copy.indexOf(itemSon.rec_id)!==-1}"
                >
                </i>
              </div>
              <div class="commodity-img" @click="jumpDetail(itemSon)">
                <img :src="itemSon.goods_thumb"/>
              </div>
              <div class="commodity-detail">
                <h2 class="presentation">
                  {{itemSon.goods_name}}
                </h2>
                <div class="specification" v-show="itemSon.goods_attr" @click="choiceSizeFn(itemSon,item)">
                  <p>
                    {{itemSon.goods_attr}}
                  </p>
                  <p>
                    <img src="../../assets/shop/gengduo@2x.png"/>
                  </p>
                </div>
                <div class="commodity-num">
                  <h2 class="commodity-price">
                   ￥{{itemSon.subtotal}}
                  </h2>
                  <div class="counter">
                    <p @click="changeNum(itemSon,item,-1)">-</p>
                    <p @click="inputNum(itemSon,item)">
                      {{itemSon.goods_number}}
                    </p>
                    <p @click="changeNum(itemSon,item,1)">+</p>
                  </div>
                </div>
              </div>
              <div class="favorite stopEvent">
              <p class="stopEvent">移至</p>
              <p class="stopEvent">收藏夹</p>
            </div>
              <div @click="delConfirm(itemSon,item)" class="favorite delete stopEvent">
                <p  class="stopEvent">删除</p>
              </div>
            </div>
          </div>
        </div>
        <re-for-you
          v-if="reForYou.length"
          :isBg="false"
          :reForYou="reForYou"
          @loadOver="loadImg"
        ></re-for-you>
        <loading class="loadMore" v-show="hasMore&&reForYou.length" title=" "></loading>
      </div>
    </scroll>
    <transition name="slideY">
      <div
        class="close-account"
        transition="slideY"
        ref="closeAccount"
        v-show="sel_goods_copy.length>0"
      >
        <div class="select-all"  @click="checkAll()" >
          <div class="all-circle-parent">
            <i class="icon-circle"
               :class="{'check':sel_goods_copy.length===sel_goods.length}"
            ></i>
          </div>
          <p>
            全选
          </p>
        </div>
        <div class="totalMoney">
          <div class="total-detail">
            <h2>
              合计：
              <span>
                 ￥{{total.goods_price}}
                </span>
            </h2>
          </div>
          <router-link to="/shop/orderConfirm" style="color:#fff">
            <div class="to-settle-accounts">
              去结算({{total.real_goods_count}})
            </div>
          </router-link>
        </div>
      </div>
    </transition>
    <div v-show="choiceSize" class="size-choice">
    </div>
    <transition name="fade">
      <div v-show="choiceSize"  transition="fade" class="size-choice" style="background: transparent">
        <div class="choice-box">
          <div class="product-detail">
            <p>
              <img :src="AttrDetail.goods_attr_thumb"/>
            </p>
            <div class="spec-detail">
              <h2>￥{{AttrDetail.result}}</h2>
              <p>
                库存{{AttrDetail.goods_attr_number}}件
              </p>
              <p>
                已选:
                {{AttrDetail.qty}}
              </p>
            </div>
          </div>
          <div class="specification-detail">
            <div v-for="(item,index) in choiceAttr.spe">
              <h3 class="specification-title">{{item.name}}</h3>
              <ul class="specification-content">
                <li v-for="(val,i) in item.values"
                    :class="{'active':val.id===choiceAttr.goods_attr_arr[index]}"
                    @click="switchover(val.id,index)"
                >
                  {{val.label}}
                </li>
              </ul>
            </div>
            <div class="commodity-num">
              <h2 class="commodity-price">
                购买数量
              </h2>
              <div class="counter">
                <p @click="changeNum(curProduct,curStore,-1,choiceAttr)">-</p>
                <p>{{AttrDetail.qty}}</p>
                <p @click="changeNum(curProduct,curStore,1,choiceAttr)">+</p>
              </div>
            </div>
          </div>

          <div
            class="specification-confirm"
            @click="ChooseConfirmFn"
          >
            确定
          </div>
          <div class="close-choice-box" @click="ChooseConfirmFn">

            <img src="../../assets/Login/guanbi@2x.png"/>
          </div>
        </div>
      </div>
    </transition>
    <foot class="foot" :active='3'></foot>
    <router-view></router-view>
    <div v-show="confirmShow" class="size-choice">
    </div>
    <confirm-box
      v-show="confirmShow"
      @close="confirmShow=false"
      :confirmMessage=confirmMessage
      @confirm="confirm"
    ></confirm-box>
    <div v-show="inputShow" class="size-choice">
    </div>
    <input-box
      v-show="inputShow"
      inputMessage="请输入购买数量"
      @close="inputShow=false"
      :calc="calc"
      @confirm="inputConfirm"
      :numProp="numProp"
    ></input-box>
  </div>
</template>
<script type="text/ecmascript-6">
  import Foot from 'components/foot/foot'
  import ConfirmBox from '../../base/confirm-box/confirm-box'
  import InputBox from '../../base/input-box/input-box'
  import Scroll from '../../base/scroll/scroll'
  import {loadForYou} from "../../api/home"
  import {AMOUNT,ERROK} from "../../api/config"
  import {
    getShopCart,
    ShopAdd,
    ShopDrop,
    Selcart,
    ChooseAttr,
    theAttrDetail,
    setAttr,
    ChooseConfirm
  } from "../../api/shop";
  import {hasClass,getData} from "../../common/js/dom"
  import Loading from "../../base/loading/loading"
  import FixedTitle from '../../base/fixedTitle/fixedTitle'
  import ReForYou from "../../components/ReForYou/ReForYou"
  import {shopMixin} from "../../common/js/mixin";
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  export default {
    mixins:[shopMixin],
    created() {
      this.numProp="0"
      this.calc=new Date().getTime()
      this.titleText="购物车"
      this.listenScroll=true
      this.pullup=true
      this.probeType=3
      loadForYou(this.last,AMOUNT,"ajax").then((res)=>{
        if(res.error===ERROK){
          this.reForYou=res.content
        }
      })
      this._getShopCart()
    },
    mounted() {
      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },20)
    },
    data() {
      return {
        checkAllFlag:true,
        totalMoney: 0,
        isquantity:0,
        choiceSizeItem:{},
        choiceSize:false,
        isEdit:false,
        pitchOn:false,
        count:0,
        price:300,
        choiceShow:false,
        content:{},
        goods_list:[],
        total:{},
        confirmShow:false,
        curProduct:'',
        curStore:'',
        sel_goods:[],
        sel_goods_copy:[],
        choiceAttr:{},
        AttrDetail:{},
        goods_attr_arr:[],
        inputShow:false,
        confirmMessage:"确定删除吗?",
        topTip:"下拉刷新",
        scrollY:0,
        isEmpty:false
      }
    },
    methods: {
      changeNum(product, productAll,way,choiceAttr) {
        this.curProduct = product;
        this.curStore = productAll;
        Indicator.open();
        if(product.goods_number==1&&way<0){
          Indicator.close();
          return
        }
        product.goods_number=parseInt(product.goods_number)
        let number=null
        if(way>0){
          number=product.goods_number+1
        }else if(way<0){
          number=product.goods_number-1
        }
        let step="update_group_cart",
          is_package=0,
          suppid=product.supplier_id,
          rec_id=product.rec_id,
          goods_id=product.pid,
          sel_goods=this.sel_goods_copy.join(",")
        ShopAdd(step,sel_goods,rec_id,number,goods_id,suppid,is_package).then((res)=>{
          if(res.error==ERROK){
            product.subtotal=res.subtotal
            if(product.checked!==false){
              this.total.goods_price=res.cart_amount_desc
            }

            if (way > 0) {
              product.goods_number++;
            }
            else {
              product.goods_number--;
              if (product.goods_number < 1) {
                product.goods_number = 1;
              }
            }
            if(choiceAttr){
              choiceAttr.goods_number=product.goods_number
              this.AttrDetail.qty=choiceAttr.goods_number
              this.getAttrDetail()
            }
          }
          if(res.error==1){
            this.warning=true
            this.confirmMessage=res.content
            this.confirmShow=true
            this.inputConfirm(res.number)
          }
          if(res.error===888){
            MessageBox.alert(res.message)
          }
          Indicator.close();
        })
      },
      inputNum(product, productAll){
        this.calc=new Date().getTime()
        this.numProp=product.goods_number
        this.inputShow=true
        this.curProduct = product;
        this.curStore = productAll;
      },
      inputConfirm(num){
        Indicator.open();
        if(num<0){
          return
        }
        let sel_goods_arr=[]
        this.curStore.goods_list.forEach((good)=>{
          sel_goods_arr.push(good.rec_id)
        })
        let number=num
        let step="update_group_cart",
          is_package=0,
          suppid=this.curProduct.supplier_id,
          rec_id=this.curProduct.rec_id,
          goods_id=this.curProduct.pid,
          sel_goods=sel_goods_arr.join(",")
        ShopAdd(step,sel_goods,rec_id,number,goods_id,suppid,is_package).then((res)=>{
          if(res.error==ERROK){
            this.curProduct.subtotal=res.subtotal
            if(this.curProduct.checked!==false){
              this.total.goods_price=res.cart_amount_desc
            }
              this.curProduct.goods_number=num;
            this.AttrDetail.qty=num
          }
          if(res.error==1){
            this.warning=true
            this.confirmMessage=res.content
            this.confirmShow=true
            this.inputConfirm(res.number)
          }
          Indicator.close();
          this.inputShow=false
        })
      },
      delConfirm: function(itemSon,item) {
        this.warning=false
        this.confirmShow = true;
        this.curProduct = itemSon;
        this.curStore = item;
      },
      confirm(){
        this.confirmShow=false
        if(this.warning){
          return
        }
        Indicator.open();
        let step="drop_goods",
          good_id=this.curProduct.rec_id
        ShopDrop(step,good_id).then((res)=>{
          if(res!=="error"){
            this._getShopCart()
          }
          Indicator.close();
          this.resetMove()
        })

      },
      selectedProduct(item,itemParent) {
        Indicator.open();
          item.checked = !item.checked;
        let event = window.event || arguments.callee.caller.arguments[0],
            target = event.srcElement||event.target
        let index = this.sel_goods_copy.indexOf(item.rec_id)
        if(item.checked){
          this.sel_goods_copy.push(item.rec_id)
        }else{
          this.sel_goods_copy.splice(index, 1);
        }
        let storeSel=this.CheckStoreAll(itemParent.goods_list)

        itemParent.checked=storeSel
        this.isCheckedAll()
        this.SelCartChange()
      },
      selStore(item){
        Indicator.open();
        item.checked = !item.checked;
        item.goods_list.forEach((good,i)=>{
            let index=this.sel_goods_copy.indexOf(good.rec_id)
          if(item.checked===false){
            good.checked=false
            this.sel_goods_copy.splice(index,1)
          }
          if(item.checked===true){
            good.checked=true
            if(index===-1){
              this.sel_goods_copy.push(good.rec_id)
            }
          }
        })
        this.isCheckedAll()
        this.SelCartChange()
      },
      CheckStoreAll(store){
        let selectStore=true;
        if(!store.length){
          return
        }
        store.forEach((obj)=>{
          if(this.sel_goods_copy.indexOf(obj.rec_id)===-1){
            selectStore=false
            return
          }
        });
        return selectStore
      },
      isCheckedAll(){
        if(this.sel_goods_copy.length===this.sel_goods.length){
          this.checkAllFlag=true
        }else{
          this.checkAllFlag=false
        }

      },
      SelCartChange(){
        let act="selcart",
          sel_goods=this.sel_goods_copy.join(",");
        Selcart(act,sel_goods).then((res)=>{
          if(res!=="error"){
            this.total.goods_price=res.result
          }
          Indicator.close();
        })
        this.total.real_goods_count=this.sel_goods_copy.length
      },
      selGoodsCheck(isChecked){
        this.goods_list.forEach((store)=>{
          if(isChecked){
            store.checked=true
          }else{
            store.checked=false
          }
        })
      },
      checkAllFn(status){
        if(this.goods_list.length){
          this.goods_list.forEach((goods,i)=>{
            goods.checked=status
            if(goods.goods_list){
              goods.goods_list.forEach((good,n)=>{
                good.checked=status
              })
            }
          })
        }
      },
      checkAll() {
        this.checkAllFlag=!this.checkAllFlag
        if(this.checkAllFlag){
          this.checkAllFn(true)
          this.sel_goods_copy=this.sel_goods.concat()
          this.total.real_goods_count=this.sel_goods_copy.length
        }else{
          this.checkAllFn(false)
          this.sel_goods_copy=[];
          this.total.real_goods_count=0
        }
        this.SelCartChange()
      },
      choiceSizeFn(item,curStore){
        this.choiceAttr=[]
        this.curProduct=item;
        this.curStore=curStore
        Indicator.open();
        this.choiceSizeTimer=setTimeout(()=>{
          this.choiceSize=true
          this.choiceSizeItem=item
          let is_ajax=1,
               step="show_choose_attr",
               rec_id=item.rec_id;
          ChooseAttr(is_ajax,step,rec_id).then((res)=>{
            this.choiceAttr.spe=[]
            let spe=res.content.properties.spe
            for(let key in spe){
              this.choiceAttr.spe.push(spe[key])
            }
            this.choiceAttr.goods_attr_id=res.content.goods_cart.goods_attr_id
            this.choiceAttr.goods_id=res.content.goods_cart.goods_id
            this.choiceAttr.goods_attr_arr=res.content.goods_cart.goods_attr_arr
            this.choiceAttr.goods_thumb=item.goods_thumb
            this.choiceAttr.goods_number=item.goods_number
            this.getAttrDetail()
          })
        },20)
      },
      ChooseConfirmFn(){
        Indicator.open();
        this._getShopCart()
        this.choiceSize=false
      },
      getAttrDetail(){
        let act="price",
          did=this.choiceAttr.goods_id,
          attr=this.choiceAttr.goods_attr_arr.join(","),
          number=this.choiceAttr.goods_number
        theAttrDetail(act,did,attr,number).then((res)=>{
          this.AttrDetail=res
          Indicator.close();
        })
      },
      _getShopCart(scrollY){
        Indicator.open();
        if(scrollY>60){
          this.topTip="正在刷新"
        }
        getShopCart().then((res)=>{
          Indicator.close();
          if(res.error===ERROK){
            this.sel_goods=[]
            this.sel_goods_copy=[]
            this.content=res.content
            if(this.content.goods_list){
              this.goods_list=this.content.goods_list
              if(this.goods_list.length){
                this.goods_list.forEach((goods,i)=>{
                  this.$set(goods, "checked", true);
                  if(goods.goods_list){
                    goods.goods_list.forEach((good,n)=>{
                      this.$set(good, "checked", true);
                      this.sel_goods.push(good.rec_id)
                      this.sel_goods_copy.push(good.rec_id)
                    })
                  }
                })
              }
            }
            if(this.content.total.goods_price){
              this.total=this.content.total
            }
            if(this.total.real_goods_count<=0){
              this.isEmpty=true
            }
          }
          if(scrollY>60){
            this.topTip="下拉刷新"
          }
        })
      },
      switchover(did,index){
        Indicator.open();
        this.choiceAttr.goods_attr_arr[index]=did
        this.setAttr()
      },
      setAttr(){
        let attr=this.choiceAttr.goods_attr_arr.join(","),
          number=this.choiceAttr.goods_number
        setAttr(
          this.curProduct.rec_id,
          this.curProduct.goods_id,
          attr,
          number
        ).then(res=>{
          Indicator.close();
          if(res.err===ERROK){
            this.getAttrDetail()
          }
        })
      },
      jumpDetail(product){
        this.$router.push({
          path:"/detail",
          query:{
            goods_id:product.goods_id
          }
        })
      },
      scroll(pos){
        this.scrollY=pos.y
        if(pos.y>60){
          this.topTip="释放立即刷新"
        }
      },
      touchend(){
        if(this.scrollY>60){
          this._getShopCart(this.scrollY)
        }
      }
    },
    components: {
      FixedTitle,
      ReForYou,
      Scroll,
      Loading,
      ConfirmBox,
      Foot,
      InputBox
    },
    activated: function () {
      this.isEmpty=false
      this._getShopCart()
      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },20)
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .fixedLoading
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 1000
    flex-row(center)
  .icon-circle
    display inline-block
    width 1.5rem
    height 1.5rem
    border-radius 50%
    background #fff
    border 1px solid #333
  .check
    background-image url("../../assets/shop/duigou@2x.png")
    background-size cover
    border none
  #discover
    z-index 101
    height 100%
    padding-top 4.4rem
  .scroll
    height 100%
    overflow hidden
    .scroll-content
      position relative
      .top-tip
        position absolute
        top -50px
        width 100%
        text-align center
      .emptyCart
        background #fff
        text-align center
        font-size 1.6rem
        img
          height 12.75rem
        h2
          color #333
          margin 2.9rem
        button
          line-height 4rem
          height 4rem
          background #fe1171
          width 29rem
          outline none
          font-size 1.6rem
          border none
          margin-bottom 2.9rem
          letter-spacing .2rem
          color #fff
      .commoditys
        .self-manage
          padding 0 1.2rem
          background #fff
          font-size 1.3rem
          height 4rem
          border-bottom 1px solid #efefef
          line-height 4rem
          .icon-circle
            margin-bottom -.3rem
            margin-right 1rem
        .commodity
          height 11rem
          position relative
          overflow hidden
          .commodity-info
            position absolute
            top 0
            left 0
            width 100%
            padding-right 1.2rem
            background #fff
            display flex
            /*transition all .3s linear*/
            .circle-parent
              padding 0 1.2rem
              height 11rem
              column-center()
              width 8%
              .checked
                background-image url("../../assets/shop/duigou@2x.png")
                background-size cover
                border none
            .commodity-img
              width 30%
              padding  0 1rem
              height 11rem
              column-center()
              overflow hidden
              img
                width 100%
            .commodity-detail
              padding 1rem 0
              width 62%
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
                margin .8rem 0
                height 2rem
                border-radius .3rem
                background #f7f7f7
                color #666
                font-size 1.1rem
                line-height 2rem
                padding 0 1rem

                p:first-child
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
              .specification,.commodity-num,.counter
                 flex-between()
                 .commodity-price
                    font-size 1.3rem
                    font-weight bolder
                    color #fb2176
                    column-center()
                 .counter
                    border 1px solid #666
                    font-size 1.1rem
                    color #333
                    border-radius .3rem
                    p
                      padding .5rem 0
                      width 2rem
                      text-align center
                    p:nth-child(2)
                      border-left 1px solid #666
                      font-weight bolder
                      width 3rem
                      border-right 1px solid #666
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
  .close-account
    transition all .26s linear
    opacity 1
    flex-between()
    position fixed
    bottom 4.9rem
    z-index 0
    width 100%
    height 4.9rem
    background #fff
    border-bottom 1px solid #efefef
    -webkit-transform: translateZ(0);
    .select-all
      flex-start()
      margin-left 1.2rem
      .all-circle-parent
        margin-right .5rem
        column-center()
      p
        column-center()
    .totalMoney
      flex-between()
      .total-detail
        flex-row-between()
        margin-right .5rem
        h2
          color #F42E76
          font-size 1.3rem
          font-weight bolder
          line-height 4.9rem
        p
          text-align right
          color #9E9E9E
      .to-settle-accounts
        width 8rem
        color #fff
        line-height 4.9rem
        background #F62C78
        text-align center
        font-size 1.5rem
  &.slideY-enter-active
    animation: bounce-in .3s;
  &.slideY-leave-active
    animation: bounce-out .3s
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

          li.active
            color #fff
            background #FC2D7B
      .commodity-num
        padding 1.2rem
        border-bottom 1px solid #efefef
        flex-between()
        .commodity-price
          font-size 1.4rem
          color #646464
          column-center()
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