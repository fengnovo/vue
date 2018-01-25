<template>
  <div>
    <p>{{a}}</p>
    <p>{{b}}</p>
    <el-input v-model="obj.input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
const EMUT = {
  NUM:'input'
}
export default {
  name: 'input-component',
  props: ['a','change'],
  data() {
    return {
      obj: {
        input: ''
      }
    }
  },
  computed: {
    b() {
      return this.obj[EMUT.NUM]
    }
  },
  watch: {
    'b'() {
      this.$emit('change', this.obj);
    }
  }
}
</script>