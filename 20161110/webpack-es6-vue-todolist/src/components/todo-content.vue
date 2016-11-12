<template>
  <div id="todo-content">
    <input v-model="newItem" type="text" @keyup.enter="addNew" placeholder="请输入" name="">
    <button @click="addNew()">确认</button>
    <ul>
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="toggleFinish(item)">
        {{item.label}}
        <img src="./../assets/colse.png" class="colse-icon" @click="delItem(item)">
      </li>
    </ul>
  </div>
</template>

<script>
import Store from './../util/store.js';
export default {
  name: 'todo-content',
  data () {
    return {
      items: Store.fetch(),
      newItem: ''
    }
  },
  watch: {
    items: {
      handler(items){
        Store.save(items);
      },
      deep: true
    }
  },
  methods: {
    toggleFinish (item) {
      item.isFinished = !item.isFinished;
    },
    addNew (){
      this.items.push({
        label: this.newItem,
        isFinished: false
      });
      this.newItem = '';
    },
    delItem (item){
      let index = this.items.indexOf(item);
      this.items.splice(index,1);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: .5rem 1rem;

}

a {
  color: #42b983;
}


.finished{
  text-decoration: underline;
}
.colse-icon {
  height: 1rem;
  width: 1rem;
}

</style>
