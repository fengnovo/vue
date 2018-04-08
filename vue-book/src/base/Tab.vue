<template>
    <div class="footer">
        <router-link to="home"><i class="iconfont icon-zhuye"></i></router-link>
        <router-link to="list"><i class="iconfont icon-yewubaobiao"></i></router-link>
        <router-link to="collection"><i class="iconfont icon-collection-b"></i></router-link>
        <router-link to="add"><i class="iconfont icon-tianjia"></i></router-link>
    </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
      return {
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/icon.css';
.footer {
     position: fixed;
     bottom: 0;
     right: 0;
     left: 0;
     width: 100%;
     height: 50px;
     display: flex;
     border-top: 1px solid #ccc;
     a {
         flex: 1;
         flex-direction: row;
         justify-content: center;
         align-items: center;
         font-size: 30px;
         line-height: 50px;
     }

}

</style>
