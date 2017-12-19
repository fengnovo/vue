
<template>
  <div>
      <div class="left-content">
            <h2>生命周期</h2>
            {{msg}}
            <button @click="handleMsg">点击变化</button>
      </div>
      <div class="right-content">
            <img class="vue-lifecycle" src="./../../assets/vue.jpg" alt="vue生命周期"/>
      </div>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: 'Hello'
            }
        },
        beforeCreate() {
            console.log('beforeCreate')
        },
        created(){
            console.log('created')
        },
        beforeMount() {
            console.log('beforeMount')
        },
        mounted() {
            console.log('mounted')
        },
        beforeUpdate() {
            console.log('beforeUpdate')
        },
        updated() {
            console.log('updated')
        },
        beforeDestroy() {
            console.log('beforeDestroy')
        },
        destroyed() {
            console.log('beforeDestroy')
        },
        methods: {
            handleMsg() {
                this.msg = '点击了'
            }
        }

    }
</script>

<style>
.left-content {
    float: left;
    margin-top: 2rem;
    width: 200px;
}
.right-content {
    float: left;
}
.vue-lifecycle {
    width: 600px;
}
</style>
