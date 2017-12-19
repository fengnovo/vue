<template>
    <div>
        <div class="header">
            <demo-header></demo-header>
        </div>
        <div class="aside">
            <demo-aside></demo-aside>
        </div>
        <div
            class="content"
            :class="collapse && 'collapse'"
            id="content"
        >
            <transition name="bounce-in-right">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { mapState, mapMutations } from 'vuex';
    import DemoHeader from './page/header/app.vue';
    import DemoAside from './page/aside/app.vue';
    import {
        STORE_NAME as ASIDE_STORE_NAME,
        stateNameEnum as asideStateNameEnum,
    } from './common/config.aside';
    export default {
        components: {
            DemoHeader,
            DemoAside
        },
        computed: {
            ...mapState(ASIDE_STORE_NAME, {
                collapse: asideStateNameEnum.COLLAPSE
            })
        }
    }
</script>
<style lang="scss">
    @import './css/animation';
    @import './css/commons';
    @import './css/icons';
    @import './css/customElForm';
    @import './css/customElTable';
    @import './css/customElPaginations';
    @import './css/customElMessage-boxs';
</style>
