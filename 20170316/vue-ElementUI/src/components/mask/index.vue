/**
* @desc: 遮罩插件
*/
<template>
    <transition :name="transitionName" appear @after-leave="clearBodyStyle" @before-enter="addBodyStyle">
        <div class="masking" v-show="visible" ref="masking">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'YztMask',
    props: {
        transitionName: {
            type: String,
            default: 'fade'
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        addBodyStyle() {
            document.body.style.overflow = 'hidden';
        },
        clearBodyStyle() {
            document.body.style.overflow = '';
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../css/_zindex';
    @import '../../css/animation';

    .masking {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: $zIndex-9-mask;
    }
</style>
