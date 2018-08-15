<template>
    <div class="recommendList">
        <ul>
          <li v-for="item in lists"
              @click="jumpMerchandise(item)"
          >
              <p>
                <img v-lazy="item.menu_img"/>
              </p>
              <p v-html="item.menu_name">
              </p>
          </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "recommend-list",
      props:{
          lists:{
            type:Array,
            default:[]
          }
      },
      methods:{
        jumpMerchandise(item){
          this.$router.push({
            path:"/home/merchandise",
            query:{
              name:item.menu_name,
              class_id:item.id,
            }
          })
        },
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommendList
    /*height 16.7rem*/
    background #fff
    ul
      display flex
      flex-wrap wrap
      padding-top 1.5rem
      /*height:16.7rem*/
      li
        width:20%
        margin-bottom 2rem
        text-align center
        p
         color #000
         font-size 1.3rem
         img
           width 3.5rem
           height 3.5rem
           margin-bottom .5rem

</style>