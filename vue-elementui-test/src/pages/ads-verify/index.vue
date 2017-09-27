<template>
    <div id="app">
        <ads-verify></ads-verify>  
    </div>
</template>

<script>
    import AdsVerify from './ads-verify';

    export default {
        name: 'App',
        components: { AdsVerify }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>

