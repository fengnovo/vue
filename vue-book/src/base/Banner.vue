<template>
    <div class="footer">
        <router-link to="home">home</router-link>
        <router-link to="list">list</router-link>
        <router-link to="collection">collection</router-link>
        <router-link to="add">add</router-link>
    </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      msg: 'Tab'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer {
   position: fixed;
   bottom: 0;
   right: 0;
   left: 0;
   display: flex;
   width: 100%;
   height: 50px;

}
</style>
