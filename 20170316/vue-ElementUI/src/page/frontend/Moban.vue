<template>
  <div>
    <h1>{{ site.name }}</h1>
    <div v-html="site.html"></div>
    <p v-if="site.seen">Now you see me</p>
    <p><span v-once>v-once 指令，{{ site.msg }}，当数据改变时，插值处的内容不会更新。 </span></p>
    <a v-bind:href="site.url" target="_bank">链接</a> <br/>
    <button v-bind:disabled="someDynamicCondition">按钮</button> <br />

    <div :cotomId="id">看标签id</div>
    <div class="f-s-10" :class="{red:isRed}">看标签class</div>
    <div v-bind:id="'list-' + id">'list-' + id</div>
    <a v-on:click="doSomething">v-on:click点击触发alert方法</a><br/>
    <a @click="handleClick">在methods触发click</a><br/>
    <h4>form表单</h4>
    <form v-on:submit.prevent="onSubmit">
        <input type="text" v-model="actionVal" placeholder="请输入值" />
        <button type="submit">提交</button>
    </form>
    <h4>components使用</h4>
    <hello-world></hello-world>
    <h4>computed函数</h4>
    详见<a href="http://localhost:8080/#/computedWatch" target="_bank">ComputedWatch</a><br/>
    <div v-html="copyright"></div>
  </div>
</template>

<script>
import HelloWorld from '@/page/index/app'

export default {
  name: 'Moban',
  data() {
    return {
        site: {
            name: 'vue模板target="_bank',
            seen: true,
            msg: '你也能执行一次性地插值',
            html: '<a href="https://cn.vuejs.org/v2/guide/syntax.html" target="_bank">vue模板</a>',
            url: 'https://www.baidu.com'
        },
        id: '123',
        isRed: true ,
        someDynamicCondition : false,
        doSomething () {        //**************************函数不要写在data内
            alert('doSomething');
        },
        actionVal: '',
        year: (new Date()).getFullYear(),
        site: 'www.baidu.com',
    }
  },
  methods: {
    handleClick () {
        alert('handleClick');
    },
    onSubmit (ev) {
        alert(this.actionVal);
    }
  },
  components: {
      'hello-world': HelloWorld
  },
  computed: {
    copyright () {
        console.log('Copyright &copy;'+this.year+' '+this.site);
      return 'Copyright &copy;'+this.year+' '+this.site
    }
  }
}
</script>
<style>
.f-s-10{
  font-size: 2rem;
}
.red{
  color: red;
}
</style>
