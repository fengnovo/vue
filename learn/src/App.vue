<template>
  <div id="app">
    <header>vue练习</header>
    <nav>
      <ul>
        <li :class="{active: isClick[0]}" @click="handleClick(0)">
          <a href="/#/home">内置指令</a>
        </li>
        <li :class="{active: isClick[1]}" @click="handleClick(1)">
          <a href="/#/moban">模板</a>
        </li>
        <li :class="{active: isClick[2]}" @click="handleClick(2)">
          <a href="/#/computedWatch">watch</a>
        </li>
        <li :class="{active: isClick[3]}" @click="handleClick(3)">
          <a href="/#/shenming">申明式与命令式</a>
        </li>
        <li :class="{active: isClick[4]}" @click="handleClick(4)">
          <a href="/#/listFunction">列表</a>
        </li>
        <li :class="{active: isClick[5]}" @click="handleClick(5)">
          <a href="/#/component">组件</a>
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
      isClick: [true,false,false,false,false,false]
    }
  },
  methods: {
    handleClick(num){
      this.isClick = [false,false,false,false,false,false]
      this.isClick[num] = true
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
