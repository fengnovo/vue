<template>
    <div id="app">
        <user-manage></user-manage>
    </div>
</template>

<script>
    import UserManage  from './user-manage';

    export default {
        name: 'App',
        components: { UserManage }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>

