<template>
    <div class="head">
      <div class="back" @touchend="back">
        <img src="../../assets/class/fanhui@2x.png"/>
      </div>
      <h1 class="title">
        {{headText}}
      </h1>
    </div>
</template>

<script>
    export default {
      props:{
          headText:{
            type:String,
            default:""
          },
        path:{
            type:String,
            default:""
        }
      },
      methods:{
        back(){
          if(this.path){
            this.$router.push({
              path:this.path
            })
            return
          }
          this.$router.back(-1)
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
.head
  position fixed
  background #fff
  height 4.4rem
  width 100%
  top 0
  border-bottom 1px solid #efefef
.back
  position absolute
  top: 0
  left: 0
  height 100%
  z-index: 50
  flex-row(center)
  padding-left 1rem
  width 5rem
  img
    width 1rem
    height 2rem
    vertical-align middle
.title
  position: absolute
  top: 0
  width: 100%
  background #fff
  margin-bottom 1px
  text-align: center
  line-height: 4.4rem
  height 4.4rem
  font-size: 1.7rem
  color: #333
  font-weight bolder
</style>