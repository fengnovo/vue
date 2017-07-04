<template>
  <div id="app">
    <header>vue练习</header>
    <nav>
      <ul>
        <li v-for="(item,index) in navState" :class="{active: item.active}" @click="handleClick(index)">
          <a :href="item.href">{{item.text}}</a>
        </li>
      </ul>  
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      navState: [{
        text: '内置指令',active: true, href: '/#/home'
      },{
        text: '模板',active: false, href: '/#/moban'
      },{
        text: 'watch',active: false, href: '/#/computedWatch'
      },{
        text: '申明式与命令式',active: false, href: '/#/shenming'
      },{
        text: '列表',active: false, href: '/#/listFunction'
      },{
        text: '组件',active: false, href: '/#/component'
      },{
        text: '生命周期',active: false, href: '/#/shengmingzhouqi'
      },{
        text: '异步',active: false, href: '/#/aync'
      },]
    }
  },
  methods: {
    handleClick(index){
      this.navState.forEach((element,i) => {
        element.active = false
        i == index ? element.active = true : null
      })
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app header {

  height: 4rem;
  width: 100%;
  background-color: #eee; 
  line-height: 4rem;
  font-size: 1.2rem;
  text-align: center;
  
}

#app nav {
  background-color: rgba(183, 172, 172, 0.29);
  width: 14rem;
  float: left;
  height: 600px;
}

#app nav ul {
  height: 100%;
}
#app nav ul li {
  height: 2rem;
  line-height: 2rem;
  font-size: 1.1rem;
}

#app nav ul li a{
  display: inline-block;
  width: 100%;
  /*padding-left: 1rem;*/
  text-decoration: none;
}
#app nav ul li a:hover{
  background-color: #000;
  color: #fff;
}

#app .container{
  float: left;
  margin-left: 14rem;
}

#app td{
  border: 1px solid #eee;
}

#app nav ul li.active a {
  background-color: #000;
  color: #fff;
}

.color-y {
  color: red;
}
</style>
