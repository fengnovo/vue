<template>
    <div id="app">
        <standard-manage></standard-manage> 
    </div>
</template>

<script>
    import StandardManage from './standard-manage';

    export default {
        name: 'App',
        components: { StandardManage }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>