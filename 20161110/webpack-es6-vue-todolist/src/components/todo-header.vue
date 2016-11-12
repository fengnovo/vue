<template>
  <h2 id="todo-header">{{title}}</h2>
</template>

<script>
export default {
  name: 'todo-header',
  data () {
    return {
      title: '这是一个todolist'
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}
</style>
