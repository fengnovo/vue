<template>
  <div id="classify">
    <div class="fixedLoading" v-show="fixedLoading">
      <loading></loading>
    </div>
    <div class="search_box" ref="search_box">
      <div class="searchTou">
        <span @touchend="back"><img src="../../assets/class/fanhui@2x.png"/></span>
      </div>
      <div class="searchInput">
        <img class="search_img" src="../../assets/sousuo@2x.png"/>
        <div class="Pinput">
          <input @touchend.prevent="jumpSearch" type="text" placeholder="请输入你想要的商品">
        </div>
      </div>
    </div>
    <div class="classify-content">
      <scroll
        class="scroll-title scroll"
        ref="scrollTitle"
      >
        <ul class="classify-title"
            @click="onShortcutTouchStart"
            ref="titleDetail"
        >
          <li
            v-for="(item,index) in categories"
            :class="{'active':currentIndex===index}"
            :data-index="index"
            ref="titleText"
          >
          <p :data-index="index">
            {{item.name}}
          </p>
          </li>
        </ul>
      </scroll>
      <scroll
        class="scroll-detail scroll"
        ref="scrollDetail"
        :listenScroll="listenScroll"
        :probeType="probeType"
        @scroll="scroll"
      >
        <ul class="classify-detail">
          <li
            class="classify-detail-all"
            ref="listGroup"
            v-for="(item,index) in categories"
          >
            <div style="height:1.2rem"></div>
            <p class="classify-detail-title">
              <img src="../../assets/class/fenlei_quanqiugou_banner@2x.png"/>
            </p>
            <ul class="classify-small">
              <li class="classify-small-title">
                <div>
                  <i></i>
                  <span>推荐分类</span>
                  <i></i>
                </div>
                <ul class="classify-definite">
                  <li
                    v-for="catId in item.cat_id"
                    @click="jumpMerchandise(catId,item)"
                  >
                    <p>
                      <img v-lazy="catId.cat_img"/>
                    </p>
                    <h3 v-html="catId.name"></h3>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
    <router-view></router-view>
    <foot class="foot" :active="1"></foot>
  </div>
</template>
<script>
  import Foot from 'components/foot/foot'
  import Scroll from '../../base/scroll/scroll'
  import Xscroll from '../../base/xSroll/xSroll'
  import {getData} from '../../common/js/dom'
  import {getCataLog} from '../../api/classify'
  import {ERROK} from "../../api/config"
  import storage from 'good-storage'
  import Loading from "../../base/loading/loading"
  import { Indicator } from 'mint-ui';
  export default {
    data(){
      return{
        categories:[],
        currentIndex:0,
        listenScroll:true,
        probeType:3,
        scrollY:-1,
        diff:-1,
        listHeight:[],
        touch:{},
        fixedLoading:false,
        titleHeight:0
      }
    },
    mounted(){
      this.getData()
      this.titleHeight=this.$refs.scrollTitle.$el.clientHeight
    },
    methods:{
      getData(){
        Indicator.open();
        let categories=storage.get("CATEGORIES",{})
        this.categories=this.normalData(categories)
        getCataLog().then((res)=>{
          if(res.error===ERROK){
            if(res.content.categories!=null){
              storage.set("CATEGORIES",res.content.categories)
              this.categories=this.normalData(res.content.categories)
            }
          }else{
            let categories=storage.get("CATEGORIES",{})
            this.categories=this.normalData(categories)
          }
          Indicator.close();
        })
      },
      back(){
        this.$router.back(-1)
      },
      onShortcutTouchStart(e){
        let anchorIndex=getData(e.target,'index');
        this.touch.anchorIndex=anchorIndex
        this._scrollTo(anchorIndex)
      },
      _calculateHeight(){
        this.listHeight=[]
        const list=this.$refs.listGroup
        let height=0
        this.listHeight.push(height)
        if(!list){
          return
        }
        for(let i=0;i<list.length;i++){
          let item=list[i]
          height+=item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index){
        if(!index&&index!==0){
          return
        }
        if(index<0){
          index=0
        }else if(index>this.listHeight.length-2){
          index=this.listHeight.length-2
        }
        this.scrollY=-this.listHeight[index]
        this.$refs.scrollDetail.scrollToElement(this.$refs.listGroup[index],0)
      },
      jumpSearch(){
        this.$router.push({path:"/search"})
      },
      normalData(obj){
        let arr=[]
        for(let key in obj){
          arr.push(obj[key])
        }
        return arr
      },
      scroll(pos){
        this.scrollY=pos.y
        console.log(this.scrollY);
      },
      jumpMerchandise(catId,item){
        this.$router.push({
          path:"/classify/merchandise",
          query:{
            name:catId.name,
            brand_id:catId.id,
            class_id:item.id,
          }
        })
      },
      activatedFn(){
        setTimeout(()=>{
          this.$refs.scrollDetail.refresh()
        },20)
      }
    },
    components:{
      Scroll,
      Xscroll,
      Foot,
      Loading
    },
    watch:{
      categories(){
        setTimeout(()=>{
          this._calculateHeight()
        },20)
      },
      scrollY(newY){
        const listHeight=this.listHeight
        if(newY>0){
          this.currentIndex=0
          return
        }
        for(let i=0;i<listHeight.length-1;i++){
          let height1=listHeight[i]
          let height2=listHeight[i+1]
          if(!height2||(-newY>=height1 && -newY<height2)){
            this.currentIndex=i
            this.diff=height2+newY
            return
          }
        }
        this.currentIndex=listHeight.length-2
      },
      currentIndex(newIndex){
       let theTitle= this.$refs.titleText[newIndex].offsetTop
       let theTitleHeight= this.$refs.titleText[newIndex].clientHeight
        let detailHeight=this.$refs.titleDetail.clientHeight
        if(this.titleHeight-theTitleHeight<theTitle){
          this.$refs.scrollTitle.scrollTo(0,this.titleHeight-theTitle-theTitleHeight)
        }else{
          this.$refs.scrollTitle.scrollTo(0,0)

        }
      }
    },
    activated: function () {
      this.activatedFn()
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
    flex-row(center)
    z-index 100000
  .scroll
    height 100%
    overflow hidden
  #classify
    height 100%
    padding-top 5rem
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
            color:#999
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
        width 3rem
        text-align center
        display flex
        flex-direction column
        justify-content center
        span
          margin-left -1rem
          img
            width 1rem
            height 2rem
    .classify-content
      display flex
      justify-content space-between
      background #fff
      height 100%
      .scroll-title
        width 28%
        border-right 1px solid #efefef
        .classify-title
          padding-top 1rem
          width 100%
          li.active
            p
              background #fc2d7b
              color #fff
          li
            color #000
            text-align center
            font-size 1.4rem
            height 4rem
            padding 0 .5rem
            p
              width 100%
              height 2.6rem
              line-height 2.6rem
              border-radius 1.3rem
      .scroll-detail
        width 72%
        .classify-detail
          width 100%
          padding 0 1.2rem
          .classify-detail-all
            .classify-detail-title
              overflow hidden
              padding-bottom 38%
              position relative
              background-size contain
              img
                position absolute
                top 0
                left 0
                width 100%
            .classify-small
              margin-top 2.2rem
              color #333
              text-align center
              div
                margin-bottom 1.3rem
                font-size 1.2rem
                vertical-align middle
                i
                  display inline-block
                  width 1.7rem
                  height 1px
                  background #333
                  margin-bottom  .4rem
                  span
                    padding 0 10px
              .classify-definite
                display flex
                flex-wrap wrap
                justify-content start
                li
                  width 32%
                  margin-left 1%
                  p
                    overflow hidden
                    padding-bottom 100%
                    position relative
                    background-size contain
                    img
                      position absolute
                      top 0
                      left 0
                      width 100%
                  h3
                    margin 1rem
                    font-size 1.3rem
</style>