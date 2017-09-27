<template>
    <div id="app">
        <tax-query></tax-query>
    </div>
</template>

<script>
    import TaxQuery  from './tax-query';

    export default {
        name: 'App',
        components: { TaxQuery }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>