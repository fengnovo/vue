<template>
<div v-bind:class="{isShow: isShow}" class="cent">
  <ToDoHeader></ToDoHeader>
  <ToDoContent></ToDoContent>
</div>
</template>

<script>
import ToDoHeader from './components/todo-header.vue';
import ToDoContent from './components/todo-content.vue';

export default {
    name: 'app',
    data(){
      return {
        isShow: false
      }
    },
    components: {
      ToDoHeader,ToDoContent
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