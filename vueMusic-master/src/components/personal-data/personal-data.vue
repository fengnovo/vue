<template>
  <transition name="slide">
    <div class="personal-data">
      <head-self headText="个人资料"></head-self>
      <scroll
        class="scroll"
        ref="scroll"
      >
        <div class="scroll-content">
            <div class="head-img">
              <input type="file"
                     ref="chooseImg"
                     class="fileInput"
                     @change="chooseImg()"
                     accept="image/*"
              >
              <div class="personal-info">
                  <p>
                    头像
                  </p>
                  <div>
                    <p class="head_img">
                      <img :src="headImg"/>
                    </p>
                    <p>
                      <img src="../../assets/mine/jiankuohao@2x.png" />
                    </p>
                  </div>
              </div>
            </div>
          <ul>
            <li class="personal-info" @click="jumpInfo('userName')">
              <p>
                用户名
              </p>
              <div>
                <p>
                  {{info.userName}}
                </p>
                <p>
                  <img src="../../assets/mine/jiankuohao@2x.png" />
                </p>
              </div>
            </li>
            <li class="personal-info" @click="jumpInfo('phoneNum')">
              <p>
                手机号
              </p>
              <div>
                <p>
                  {{info.phoneNum}}
                </p>
                <p>
                  <img src="../../assets/mine/jiankuohao@2x.png" />
                </p>
              </div>
            </li>
            <li id="birthday" class="personal-info" @click="DateSelector()">
              <p>
                出生日期
              </p>
              <div>
                <p>
                  {{info.birthday | date}}
                </p>
                <p>
                  <img src="../../assets/mine/jiankuohao@2x.png" />
                </p>
              </div>
            </li>
          </ul>
          <ul>
            <li class="personal-info" @click="jumpInfo('weChart')">
              <p>
                微信
              </p>
              <div>
                <p>
                  {{info.weChart}}
                </p>
                <p>
                  <img src="../../assets/mine/jiankuohao@2x.png" />
                </p>
              </div>
            </li>
            <li class="personal-info" @click="jumpInfo('QQ')">
              <p>
                QQ
              </p>
              <div>
                <p>
                  {{info.QQ}}
                </p>
                <p>
                  <img src="../../assets/mine/jiankuohao@2x.png" />
                </p>
              </div>
            </li>
            <li class="personal-info"  @click="jumpInfo('gender')">
              <p>
                性别
              </p>
              <div>
                <p>
                  {{info.gender}}
                </p>
                <p>
                  <img src="../../assets/mine/jiankuohao@2x.png" />
                </p>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
      <router-view></router-view>
      <mt-datetime-picker
        v-model="info.birthday"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        type="date"
        ref="picker"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleConfirm"
      >
      </mt-datetime-picker>
      </div>
  </transition>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import HeadSelf from '../../base/fixedHead/fixedHead'
  export default {
        name: "personal-data",
      created(){
        setTimeout(()=>{
          this.$refs.scroll.refresh()
        },20)
      },
      data(){
        return{
          info:{
            userName:"巴扎黑",
            phoneNum:13148261617,
            birthday:"2018-01-01",
            weChart:"21587485",
            QQ:634606257,
            gender:"男"
          },
          endDate:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          startDate:new Date(new Date().getFullYear() - 70, 0, 1),
          headImg:""
        }
      },
      methods:{
        jumpInfo(path){
          let info=""
          if(path==="gender"){
            info=this.info.gender
          }
          if(path==="userName"){
            info=this.info.userName
          }
          if(path==="phoneNum"){
            info=this.info.phoneNum
          }
          if(path==="weChart"){
            info=this.info.weChart
          }
          if(path==="QQ"){
            info=this.info.QQ
          }
          this.$router.push({
            path:`/mine/personalData/${path}`,
            query:{info:info}
          })
        },
        DateSelector(){
          this.$refs.picker.open();
        },
        handleConfirm(obj){
          console.log(obj)
        },
        chooseImg(){
          let $img=this.$refs.chooseImg
          if($img.files&&$img.files[0]){
            let reader=new FileReader()
            reader.onload=function(e){
              this.headImg=e.target.result
            }.bind(this)
            reader.readAsDataURL($img.files[0]);
          }

        },
      },
    filters:{

      date(value){

        if(typeof value==="object"){
          let y=value.getFullYear()
          let m=(value.getMonth()+1)<10?"0"+(value.getMonth()+1):(value.getMonth()+1)
          let d=value.getDate()
          return y+"-"+m+"-"+d
        }
        if(typeof value==="string"){
          return value
        }
      }
    },
      components:{
        Scroll,
        HeadSelf
      },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  #targetContainer
    position:fixed
    z-index:100000
    top:0
    left:0
    right:0
    bottom:0
    background rgba(0,0,0,.5)
  .personal-data
    position:fixed
    z-index:100000
    top:0
    left:0
    right:0
    bottom:0
    background :#efefef
    padding-top 4.4rem
    color #333
    .scroll
      height 100%
      overflow hidden
      margin-bottom 3.5rem
      ul
        margin-top .5rem
        padding-left 1.2rem
        background #fff
        li
          border-bottom 1px solid #efefef
          height 4rem
      .head-img
        margin-top .6rem
        background #fff
        padding-left 1.2rem
        font-size 1.5rem
        position relative
        .fileInput
          position absolute
          top 0
          bottom 0
          left 0
          right 0
          width 100%
          opacity 0
        .head_img
          img
            width 4.2rem
            height 4.2rem
            border-radius 50%
        .personal-info
          height 6rem
      .personal-info
        height 5rem
        flex-between()
        padding 0 1.2rem
        font-size 1.5rem
        color #666
        div
          flex-start()
        p:last-child
          margin-left .8rem
          img
            width .7rem
            height 1.2rem
        p
          flex-row(center)
</style>