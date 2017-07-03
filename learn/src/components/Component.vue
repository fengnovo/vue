<template>
  <div>
    <a href="https://cn.vuejs.org/v2/guide/components.html" target="_bank">详见vue官网Component</a>
    <h2>自定义组件</h2>
    <div>
      <my-component btn-val="测试"></my-component>
      <div v-html="vh"></div>
    </div>
    <div>
      <h2>使用&lt;slot&gt;分发内容</h2>
      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        vh: `<div>
          <div>{{btnVal1}}</div>
          &lt;input type="text" v-model="btnVal1"&gt;
          </div>
        `,
        statebtnVal: '父组件的'
      }
    },
    components: {
      'my-component' : {
        props: {
          btnVal : {
            type: String,
            default: '测试11'
          }
        },
        data() {
          return {
            statebtnVal: this.btnVal
          }
        },
        template: `
          <div>
            <span>hello my-component</span>
            <div>
              <div>{{btnVal}}</div>
              <input type="text" v-model="btnVal">
            </div>
            <p>不应该修改props，要修改state</p>
            <div>
              <div>{{statebtnVal}}</div>
              <input type="text" v-model="statebtnVal">
            </div>
          </div>
        `
      }
    }
  }
</script>
