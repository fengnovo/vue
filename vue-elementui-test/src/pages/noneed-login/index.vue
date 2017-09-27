<template>
    <div id="app">
        <noneed-login></noneed-login>
    </div>
</template>

<script>
    import NoneedLogin from './noneed-login';

    export default {
        name: 'App',
        components: { NoneedLogin }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>
