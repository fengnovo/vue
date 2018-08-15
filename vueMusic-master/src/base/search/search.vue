<template>
    <div class="search_box" ref="search_box">
        <div class="searchInput" ref="search_input">
            <img class="search_img" src="../../assets/sousuo@2x.png"/>
          <div class="Pinput">
            <input @click="jumpSearch" type="text" placeholder="请输入你想要的商品">
          </div>
        </div>
        <div class="searchTou" v-if="isHeadIcon">
          <router-link to="/login">
            <img src="../../assets/user.png" />
          </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
      props:{
        scrollY:{
          type:Number,
          default:0
        },
        isHeadIcon:{
          type:Boolean,
          default:true
        }
      },
      methods:{
        jumpSearch(){
          this.$router.push({path:"/search"})
        }
      },
      watch:{
        scrollY(newVal){
          console.log(newVal);
          newVal=newVal/100
          this.$refs.search_input.style.opacity=0.7+newVal
          this.$refs.search_box.style.background=`rgba(252,45,123,${newVal})`
        }
      }
    }
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">
  .search_box
     padding 1rem
     position relative
     display flex
     justify-content center
     .searchInput
       background :#fff
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
           color:#333
           height:3rem
           width: 100%;
           font-size 1.3rem
        .search_img
          width 1.8rem
          height 1.8rem
          float:left
          margin-top:.5rem
     .searchTou
       padding-left 1rem
       img
         height:2.9rem
         width:2.9rem
         vertical-align middle
</style>