<template>
  <div>
    <input type="text" placeholder="请输入" v-model="question"/>
    <p>{{ answer }}</p>
    <div>{{ fullName }}</div>
  </div>
</template>

<script>
export default {
  name: 'ComputedWatch',
  data () {
    return {
      firstName:'firstName',
      lastName: 'lastName',
      question: '',
      answer: ''
    }
  },
  computed: {
    fullName () {
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    getAnswer() {
      console.log(this.question);
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
