<template>
    <div id="app">
        <market-data></market-data> 
    </div>
</template>

<script>
    import MarketData from './market-data';

    export default {
        name: 'App',
        components: { MarketData }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>
