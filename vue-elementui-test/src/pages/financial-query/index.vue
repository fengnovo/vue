<template>
    <div id="app">
        <financial-query></financial-query>
    </div>
</template>

<script>
    import FinancialQuery from './financial-query';

    export default {
        name: 'App',
        components: { FinancialQuery }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>

