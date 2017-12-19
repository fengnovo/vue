/**
 * @desc: 居中放大模板插件
 * @props:
    [src] {String} 图片的地址
    [alt] {String} 图片的alt
 */
<template lang="html">
    <masking class="outer" @click.native="hiddenHandle" :visible="visible">
        <img :src="src" :alt="alt" class="mask-inner-img">
    </masking>
</template>

<script>
import Masking from './index.vue';

export default {
    components: {
        Masking
    },
    props: {
        src: String,
        alt: String
    },
    data() {
        return {
            visible: true
        }
    },
    methods: {
        hiddenHandle() {
            this.visible = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.outer {
    text-align: center;
    &:before {
        content: "";
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
}

.mask-inner-img {
    vertical-align: middle;
}
</style>
