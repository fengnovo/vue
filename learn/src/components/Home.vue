<template>
  <div>
    <table>
      <caption>内置指令</caption>
      <tbody>
        <tr><td>v-bind</td><td>动态的绑定数据,简写为:</td><td>v-on</td><td>绑定事件监听器.简写为@</td></tr>
        <tr><td>v-text</td><td>更新数据，会覆盖已有结构</td><td>v-html</td><td>可以解析数据中的html结构</td></tr>
        <tr><td>v-show</td><td>根据值得真假，切换元素的display属性</td><td>v-if</td><td>根据值得真假，切换元素会被销毁，重建</td></tr>
        <tr class="color-y"><td>v-else-if</td><td>多条件判断，为真则渲染</td><td>v-else</td><td>条件都不符合渲染</td></tr>
        <tr><td>v-for</td><td>基于源数据多次渲染元素会模块</td><td>v-model</td><td>在表单控件元素上创建双向数据绑定</td></tr>
        <tr><td>v-pre</td><td>跳过元素和子元素的编译过程</td><td>v-once</td><td>只渲染一次，随后数据更新不重新渲染</td></tr>
        <tr><td>v-cloak</td><td colspan=3>隐藏未编译的Mustache语法，css中设置[v-cloak]{display:none;}</td></tr>
      </tbody>
    </table>
    <div>
      <h4>根实例</h4>
      <pre>
      new Vue({
        el: '#app', //String | HtmlElement
        data: dataObj // Object | Function
        methods: 定义方法 //Object
      })
      </pre>
      new Vue()出来的实例可以用$el,$data,$methods取对应的属性<br/>
      <p>
      <h4>生命周期钩子</h4>
      生命周期钩子包括created、beforeCompile、compiled、ready、beforeDestroy、destroyed<br/>
      钩子的 this 指向调用它的 Vue 实例
      </p>
      <p>
        <h4>组件的父链</h4>
        子组件可以用 this.$parent 访问它的父组件。<br/>
        根实例的后代可以用 this.$root 访问它。<br/>
        父组件有一个数组 this.$children，包含它所有的子元素。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style>

</style>
