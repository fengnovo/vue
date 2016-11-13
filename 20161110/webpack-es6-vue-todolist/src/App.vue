<template>
<div v-bind:class="{isShow: isShow}" class="cent">
  <ToDoHeader></ToDoHeader>
  <to-do-content></to-do-content>
</div>
</template>

<script>
import ToDoHeader from './components/todo-header.vue';
import toDoContent from './components/todo-content.vue';

export default {
    name: 'app',
    data(){
      return {
        isShow: false
      }
    },
    components: {
      ToDoHeader,toDoContent
    }
  }
</script>
<style>
  .cent {
    text-align: center;
  }
  .isShow{
    font-size: 3rem;
  }
</style>