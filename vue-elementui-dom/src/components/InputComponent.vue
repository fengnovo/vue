<template>
  <div>
    <p>{{a}}</p>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name: 'input-component',
  props: ['a','change'],
  data() {
    return {
      input: ''
    }
  },
  watch: {
    input: function() {
      this.$emit('change', this.input);
    }
  }
}
</script>