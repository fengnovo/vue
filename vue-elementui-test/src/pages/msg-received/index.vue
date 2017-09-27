<template>
    <div id="app">
        <msg-received></msg-received> 
    </div>
</template>

<script>
    import MsgReceived from './msg-received';

    export default {
        name: 'App',
        components: { MsgReceived }
    }
</script>

<style lang="scss">
    @import '../../css/common';
    @import '../../css/app';
</style>
