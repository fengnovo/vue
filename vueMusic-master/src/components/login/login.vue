<template>
  <transition name="slide">
    <div class="login">
      <head-self headText="登录"></head-self>
      <div class="user-info">
        <div class="user-input">
          <div>
            <img src="../../assets/Login/yonghuming@2x.png"/>
          </div>
          <div>
            <input v-model="userName" type="text" placeholder="手机号/用户名/邮箱">
          </div>
        </div>
        <div class="user-input password">
          <div>
            <img src="../../assets/Login/mima@2x.png"/>
          </div>
          <div>
            <input v-model="password" type="password" placeholder="请输入密码">
          </div>
          <div
            @click="password=''"
          >
            <img v-show="password" src="../../assets/Login/cha@2x.png"/>
          </div>

        </div>
        <div class="user-input verify-image">
          <div>
            <img src="../../assets/Login/yanzhengma.png"/>
          </div>
          <div>
            <input v-model="captcha" type="password" placeholder="请输入验证码">
          </div>
          <div
            @click="changeRandomNum"
          >
            <img  v-lazy="VerifyImage"/>
          </div>

        </div>
      </div>
      <div class="login-mode">
        <div class="login-self" @click="loginSelf=!loginSelf">
          <i class="circle" :class="{'loginSelf':loginSelf}"></i>
          自动登录
        </div>
        <div class="forget-password">
          <router-link to="/login/resetPassword">
            忘记密码？
          </router-link>
        </div>
      </div>
      <div class="login-confirm">
        <p @click="login">
          登录
        </p>
      </div>
      <div class="other-login-mode">
        <i></i>
        <span>选择其他登录方式</span>
        <i></i>
      </div>
      <div class="weChart">
          <a :href="url">
            <img src="../../assets/Login/weixin@2x.png"/>
          </a>
      </div>
      <router-view></router-view>
      <div class="fixedLoading" v-show="fixedLoading">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
import {URLROUTER} from '../../api/config'
import {Login} from "../../api/login";
import HeadSelf from '../../base/fixedHead/fixedHead'
import Loading from "../../base/loading/loading"
  export default {
    name: "Login",
    created(){
      this.url=URLROUTER+"/weixin_login.php"
    },
    data(){
      return {
        loginSelf:true,
        password:"",
        url:"",
        userName:"",
        remember:1,
        fixedLoading:false,
        randomNum:Math.random(),
        captcha:''
      }
    },
    computed:{
      VerifyImage(){
        return URLROUTER+"/captcha.php?is_login=1&"+this.randomNum
      },
    },
    methods:{
      login(){
        this.fixedLoading=true
        let remember=this.loginSelf?1:''
        Login(this.userName,this.password,this.captcha,remember).then(res=>{
          debugger
          this.fixedLoading=false
          this.$router.back(-1)
        })
      },
      changeRandomNum(){
        this.randomNum=Math.random()
      },
      back(){
        this.$router.back(-1)
      }
    },
    components:{
      HeadSelf,
      Loading
    },
    activated(){
      this.changeRandomNum()
      this.captcha=''
    }
  }
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .login
    position:fixed
    top:0
    left:0
    right:0
    bottom:0
    z-index 100000
    padding-top 6.4rem
    background #efefef
    .back
      position absolute
      top: 0
      left: 1rem
      z-index: 50
      height 4.4rem
      flex-row(center)
      img
        width 2rem
        height 2rem
        vertical-align middle
    .title
      position: absolute
      top: 0
      z-index: 40
      width: 100%
      background #fff
      margin-bottom 1px
      text-align: center
      line-height: 4.4rem
      height 4.4rem
      font-size: 1.3rem
      color: #fff
      box-shadow 0 .1rem .2rem #ddd
      span
        border-radius .4rem
        line-height 2.7rem
        display inline-block
        width 6.9rem
        height 2.7rem
        color #333
    .user-info
      background #fff
      padding-left 1.2rem
      .user-input:last-child
        border 0
      .user-input
        height 4rem
        flex-between()
        border-bottom 1px solid #efefef
        div:first-child
          width 8%
        div:last-child
          width 92%
          padding-left 1.5rem
        div
          flex-row(center)
          img
            width 100%
          input
            height 100%
            font-size 1.3rem
            color #999
            outline none
            width 100%
      .password
        div:nth-child(2)
          width 84%
          padding-left 1.5rem
        div:last-child
          width 8%
          text-align center
          padding-right 1.2rem
          padding-left 0
          img
            width 1.2rem
            height 1.2rem
      .verify-image
        div:nth-child(2)
          width 67%
          padding-left 1.5rem
        div:last-child
          width 25%
          text-align center
          padding-right 1.2rem
          padding-left 0
          overflow hidden
          img
            width 100%
            margin-bottom -.8rem
    .login-mode
      flex-between()
      padding 1.2rem
      font-size 1.2rem
      color #333
      .circle
        vertical-align middle
        circle()
      .loginSelf
        background url("../../assets/Login/duigou@2x.png")
        background-size contain
        border 0
    .login-confirm
      padding 0 1.2rem
      p
        background #26A2FF
        height 4rem
        line-height 4rem
        border-radius .3rem
        text-align center
        font-size 1.8rem
        color #fff
    .other-login-mode
      line-height 5rem
      text-align center
      color #666
      vertical-align middle
      font-size 1.3rem
      i
        display inline-block
        width 3.5rem
        height 1px
        background #818181
        margin-bottom  .4rem
        span
          padding 0 10px
    .weChart
      text-align center
      img
        width 4.5rem
</style>