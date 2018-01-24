<template>
  <div>
    <p>{{a}}</p>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name: 'input-component',
  props: ['a','onChange','close'],
  data() {
    return {
      input: ''
    }
  },
  watch: {
    input: function() {
      // this.$emit('onChange', this.input);
    },
    close: function(newVal,oldVal) {
      console.log(newVal);
      if (val) {
        this.$emit('onChange', this.input);
      }
    },
  },
  created() {
    console.log(this.close);
  },
  method: {
    getData() {
      return this.input;
    }
  }
}
</script>