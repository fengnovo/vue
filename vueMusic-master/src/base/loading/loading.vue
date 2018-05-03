<template>
  <div class="loading-component">
    <img  src="./loading.gif" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading-component
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: 1.3rem
      color: #999
</style>
