<template>
  <div id="app">
    <div class="container">
      <div class="nav" v-show="!nav">
        <div class="nav-back" @click="hideDetail"> < 返回 </div>
        <div class="nav-title" @click="hideDetail"> 标题 </div>
      </div>
      <div class="nav" v-show="nav">
        <div class="nav-back" @click="toggleNav">≡≡</div>
        <div class="nav-title" @click="hideNav"> 标题 </div>
      </div>
      <div class="list">
        <ul>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li @click="toggleDetail">
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
          <li>
            现有京东pin数量达到37w，远超服务器5w的上限
          </li>
        </ul>
      </div>
      <transition-group enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <div id="test1" :key="1" v-show="flag" class="animated">{{msg}}</div>
      </transition-group>
      <transition-group enter-active-class="slideInLeft" leave-active-class="slideOutLeft">
        <div id="test2" :key="2" v-show="navFlag" class="animated">{{msg}}</div>
      </transition-group>
      <transition-group enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <div id="test3" :key="3" v-show="detailFlag" class="animated">
          animate.css经过很多css高手的贡献, 现在已经有很多的动画了. 如果能够在angular中使用这些动画, 将会非常美妙.<br/>
          通过对angular-animate的学习, 可以尝试将animate.css上的动画移植到angular中, 使之能够按照angular的方式来使用.<br/>
          通过观察, 可以知道, animate.css基本有两大类动画, 一类为入场和离场动画, 另一类则是可以重复执行的普通动画.<br/>
          入场和离场动画,可以经过处理之后,变成angular-route或者angular-ui-router的过场动画.<br/>
          而重复执行的动画, 则就可以作为angular中的普通动画, 重复执行.<br/>
          <br/>
          animate.css经过很多css高手的贡献, 现在已经有很多的动画了. 如果能够在angular中使用这些动画, 将会非常美妙.<br/>
          通过对angular-animate的学习, 可以尝试将animate.css上的动画移植到angular中, 使之能够按照angular的方式来使用.<br/>
          通过观察, 可以知道, animate.css基本有两大类动画, 一类为入场和离场动画, 另一类则是可以重复执行的普通动画.<br/>
          入场和离场动画,可以经过处理之后,变成angular-route或者angular-ui-router的过场动画.<br/>
          而重复执行的动画, 则就可以作为angular中的普通动画, 重复执行.<br/>
          animate.css经过很多css高手的贡献, 现在已经有很多的动画了. 如果能够在angular中使用这些动画, 将会非常美妙.<br/>
          通过对angular-animate的学习, 可以尝试将animate.css上的动画移植到angular中, 使之能够按照angular的方式来使用.<br/>
          通过观察, 可以知道, animate.css基本有两大类动画, 一类为入场和离场动画, 另一类则是可以重复执行的普通动画.<br/>
          入场和离场动画,可以经过处理之后,变成angular-route或者angular-ui-router的过场动画.<br/>
          而重复执行的动画, 则就可以作为angular中的普通动画, 重复执行.<br/>
          <br/>
          animate.css经过很多css高手的贡献, 现在已经有很多的动画了. 如果能够在angular中使用这些动画, 将会非常美妙.<br/>
          通过对angular-animate的学习, 可以尝试将animate.css上的动画移植到angular中, 使之能够按照angular的方式来使用.<br/>
          通过观察, 可以知道, animate.css基本有两大类动画, 一类为入场和离场动画, 另一类则是可以重复执行的普通动画.<br/>
          入场和离场动画,可以经过处理之后,变成angular-route或者angular-ui-router的过场动画.<br/>
          而重复执行的动画, 则就可以作为angular中的普通动画, 重复执行.<br/>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Hello',
      flag: false,
      nav: true,
      navFlag: false,
      detailFlag: false
    }
  },
  methods: {
    left() {
      this.flag = false;
    },
    right() {
      this.flag = true;
    },
    toggleNav() {
      this.navFlag = !this.navFlag;
    },
    hideNav() {
      this.navFlag = false;
    },
    toggleDetail() {
      this.nav = !this.nav;
      this.detailFlag = !this.detailFlag;
    },
    hideDetail() {
      this.nav = true;
      this.detailFlag = false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 100%;
  height: 100%;
}
.nav {
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: #3e72c3;
  line-height: 3rem;
}
.nav .nav-back {
  position: absolute;
  top: 0;
  left: 1rem;
  font-size: 1.2rem;
  color: #fff;
}
.nav .nav-title {
  font-size: 1.4rem;
  color: #fff;
}
.list ul, li{
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list ul li{
  background-color: #F6F6F6;
  margin-top: .5rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

#test1 {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  background-color: #ccc;
}
#test2 {
  margin: 0 auto;
  width: 16rem;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #ccc;
}

#test3 {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 3rem;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: #ccc;
}
</style>
