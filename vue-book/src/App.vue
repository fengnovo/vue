<template>
    <div id="app">
        <transition name="fade">
            <router-view/>
        </transition>
        <Tab></Tab>
    </div>
</template>

<script>
import Tab from './base/Tab.vue';
export default {
    name: 'App',
    components: {
      Tab
    }
}
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}
ul, li {
    list-style: none;
}
a {
    text-decoration: none;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
}
</style>
