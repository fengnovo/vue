<template>
  <div id="app">
    <p>
      <ul>
        <li>
          <a href="/#/Test1">Test1：简单计数</a>
        </li>
        <li>
          <a href="/#/Test2">Test2：state访问状态对象</a>
        </li>
        <li>
          <a href="/#/Test3">Test3：mutations修改状态</a>
        </li>
        <li>
          <a href="/#/Test4">Test4：getters计算过滤操作</a>
        </li>
        <li>
          <a href="/#/Test5">Test5：actions异步修改状态</a>
        </li>
        <li>
          <a href="/#/Test6">Test6：module</a>
        </li>
      </ul>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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

#app ul{
  list-style: none;
}

#app li{
  list-style: none;
  display: inline-block;
  margin-left: 1rem; 
}


</style>
