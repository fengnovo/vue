<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item,index) in items" :key="index">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      msg: '主页',
      items: [{
        name: '元素1'
      },
      {
        name: '元素2'
      },
      {
        name: '元素3'
      },
      {
        name: '元素4'
      },
      {
        name: '元素5'
      },
      {
        name: '元素6'
      }]
    }
  }
}
</script>
<style>
</style>
