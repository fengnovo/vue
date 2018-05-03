import {mapGetters,mapMutations} from 'vuex'
import {hasClass} from "../../common/js/dom"
import {loadForYou} from "../../api/home"
import {AMOUNT,ERROK} from "../../api/config"
export const orderMixin = {
  computed: {
    ...mapGetters([
      'orderIndex'
    ])
  },
  methods:{
    changeOrderMode(index){
      this.setOrderIndex(index)
    },
    ...mapMutations({
      setOrderIndex: 'ORDER_INDEX'
    }),
  },
}
export const shopMixin={
  data(){
    return{
      reForYou:[],
      last:0,
      hasMore:true,
      startX:0,
      endX:0,
      hasMove:false,
      touchIndex:0,
      productList: [
        {
          productId:"600100002115",
          productName:"全球购韩国免税店后whoo津率享红花凝香套盒水乳面霜全球购韩国免税店后whoo津率享红花凝香套盒水乳面霜",
          productPrice:19,
          productQuantity:1,
          productImage:"static/img/goods-1.jpg",
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
          productQuantity:3,
          productImage:"static/img/goods-1.jpg",
          specification:[
            "250ml",
            "500ml",
            "750ml"
          ],
          nowSpecification:"250ml"
        }
      ],
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
    onTouchStart(index){
      let e = window.event || arguments.callee.caller.arguments[0]
      let target=e.target||e.srcElement
      if(hasClass(target, "stopEvent")){
        return
      }
      let left=this.$refs.touchmove[index].style.left
      if(left){
        left=Number(left.slice(0,left.length-2))
      }
      if(left<0){
        this.hasMore=true
      }
      this.$refs.touchmove[index].style.transition="none"
      this.startX=e.touches[0].clientX
    },
    onTouchMove(index){
      if(this.choiceSizeTimer){
        clearTimeout(this.choiceSizeTimer)
      }
      let e = window.event || arguments.callee.caller.arguments[0]
      let target=e.target||e.srcElement
      if(hasClass(target, "stopEvent")){
        return
      }
      if(this.hasMove&&this.touchIndex!==index){
        this.resetMove();
        return
      }
      let moveX=e.touches[0].clientX
      if(moveX<this.startX){
        if(!this.hasMove){
          let moveDistance= moveX-this.startX
          if(moveDistance<-148){
            moveDistance=-148
          }
          this.$refs.touchmove[index].style.left=moveDistance+"px"
        }
      }else{
        let moveRight=0
        if(!this.hasMove){
          moveRight= moveX-this.startX
        }else{
          moveRight= moveX-this.startX-148
        }
        if(moveRight>0){
          moveRight=0
        }
        this.$refs.touchmove[index].style.left=moveRight+"px"
      }
    },
    onTouchEnd(index){
      let e = window.event || arguments.callee.caller.arguments[0]
      let target=e.target||e.srcElement
      if(hasClass(target, "stopEvent")){
        return
      }
      if(this.hasMove&&this.touchIndex!==index){
        return
      }
      this.endX=e.changedTouches[0].clientX;
      this.$refs.touchmove[index].style.transition="all .3s linear"
      let moveX=this.startX-this.endX
      if(moveX>=74||(moveX>-74&&this.hasMove&&this.touchIndex===index)){
        this.$refs.touchmove[index].style.left=-148+"px"
        this.hasMove=true
        this.touchIndex=index
      }else{
        this.resetMove()
      }
    },
    resetMove(){
      let touchmoves=this.$refs.touchmove
      for (let i=0;i<touchmoves.length;i++){
        this.$refs.touchmove[i].style.transition="all .3s linear"
        this.$refs.touchmove[i].style.left=0
      }

      this.endX=0
      this.startX=0
      this.hasMove=false
    },
  },
}
export const recommendMixin={
  data(){
    return{
      reForYou:[],
      last:0,
      hasMore:true,
    }
  },
  methods:{
    loadImg(){
      clearTimeout(this.scrollTimer)
      this.scrollTimer=setTimeout(()=>{
        this.$refs.scroll.refresh()
      },160)
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
  }
}

export const leaveMessage={
  methods:{
    scrollToText(){
      this.$refs.scroll.scrollToElement(this.$refs.leaveMessage)
    }
  }
}

export const upgradeTuoMixin={
  computed: {
    ...mapGetters([
      'is_distrib'
    ])
  },
  methods:{
    upgradeTuo(){
      this.$router.push({
        path:"/detail",
        query:{
          goods_id: "2282"
        }
      })
    },
    ...mapMutations({
      setIsDistrib: 'IS_DISTRIB'
    }),
  }
 }