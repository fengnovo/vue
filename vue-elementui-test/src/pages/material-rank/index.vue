<template>
    <div id="app">
        <material-rank></material-rank> 
    </div>
</template>

<script>
    import MaterialRank from './material-rank';

    export default {
        name: 'App',
        components: { MaterialRank }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>

