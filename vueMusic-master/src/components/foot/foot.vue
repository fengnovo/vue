<template>
  <div class="tab" ref="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <div>
        <p>
          <img v-show="active===5" src="../../assets/home_gaoliang@2x.png"/>
          <img v-show="active!==5"src="../../assets/home_changtai@2x.png"/>
        </p>
        <span class="tab-link">首页</span>
      </div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/classify">
      <div>
        <p>
          <img v-show="active===1" src="../../assets/fenlei_gaoliang@2x.png"/>
          <img v-show="active!==1" src="../../assets/fenlei_changtai@2x.png"/>
        </p>
        <span class="tab-link">分类</span>
      </div>
    </router-link>
    <router-link  tag="div" class="tab-item" to="/discover">
      <div>
        <p>
          <img v-show="active===2" src="../../assets/faxian_gaoliang@2x.png"/>
          <img v-show="active!==2" src="../../assets/faxian_changtai@2x.png"/>
        </p>
        <span class="tab-link">
        发现
      </span>
      </div>

    </router-link>
    <router-link  tag="div" class="tab-item" to="/shop">
      <div>
        <p>
          <img v-show="active!==3" src="../../assets/gouwuche_changtai@2x.png"/>
          <img v-show="active===3" src="../../assets/gouwuche_gaoliang@2x.png"/>
        </p>
        <span class="tab-link">购物车</span>
      </div>

    </router-link>
    <router-link tag="div" class="tab-item" to="/mine">
      <div>
        <p>
          <img v-show="active!==4" src="../../assets/wode_changtai@2x.png" />
          <img v-show="active===4" src="../../assets/wode_gaoliang@2x.png" />
        </p>
        <span class="tab-link">我的</span>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      active:{
        type:Number,
        default:5
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    height: 4.9rem
    font-size: 1rem
    background #fff!important
    text-align center
    z-index 10
    .tab-item
      width 20%
      text-align: center
      padding-top .6rem
      p
        margin-bottom .4rem
        img
          width:2.4rem
          height:2.4rem
      .tab-link
        padding-bottom: 5px
        color #333!important
        font-size 1rem
      &.router-link-active
        .tab-link
          color #fc2d7b!important
</style>