/**
* @desc: imgbox图片居中放大插件
* @props:
[src] {String|Array} imgbox的图片地址，支持多图
[alt] {String} imgbox的图片地址
[width] {String|Number} imgbox的宽度
[height] {String|Number} imgbox的高度
[scaleSrc] {String} 大图src
[loop] {Boolean} 多图时，滚动到边界后是否从头开始
[isPreview] {Boolean} 是否需要大图预览
*/
<template>
    <div class="imgbox-wrap">
        <div class="imgbox" @click="$emit('click')">
            <div class="inner-box "
                 :style="slideOffset"
            >
                <span v-for="_src in srcs"
                      :style="{
                        display: 'inline-block',
                        width: width + 'px',
                        height: '100%',
                        textAlign: 'center'
                      }"
                      class="middle-align"
                      @click="scaleImg"
                >
                    <img :src="_src"
                         :alt="alt"
                    >
                </span>
            </div>
            <span class="arrow arrow-left middle-align" @click.stop="slide('left')" v-if="srcs.length > 1">
                <span class="icon-left-arrow"></span>
            </span>
            <span class="arrow arrow-right middle-align" @click.stop="slide('right')" v-if="srcs.length > 1">
                <span class="icon-right-arrow"></span>
            </span>
            <span class="icon-scale"
                  v-if="isIcon"
                  @click="scaleImg"
            ></span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { typeIs } from '@/common/util.helper';

    let instance;

    export default {
        name: 'YztThumbnail',
        mounted() {
            this.width = this.$el.clientWidth;
        },
        data() {
            return {
                offset: 0,
                width: 0
            }
        },
        props: {
            src: {
                type: [String, Array],
                default() {
                    return [];
                }
            },
            alt: String,
//            width: [String, Number],
            height: [String, Number],
            scaleSrc: String,
            isIcon: {
                type: Boolean,
                default: true
            },
            loop: {
                type: Boolean,
                default: false
            },
            isPreview: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            srcs() {
                if (typeIs(this.src) !== 'array') {
                    return [this.src];
                }
                return this.src;
            },
            slideOffset() {
                const offset = -this.offset * parseInt(this.width) || 0;
                return {
                    width: `${(this.srcs.length || 1) * parseInt(this.width)}px`,
                    transform: `translateX(${offset}px)`
                }
            }
        },
        methods: {
            scaleImg(e) {
                if (!this.isPreview) {
                    return;
                }
                e.stopPropagation();
                if (instance) {
                    instance.src = this.scaleSrc ? this.scaleSrc : this.srcs[this.offset];
                    instance.alt = this.alt;
                    instance.vm.visible = true;
                } else {
                    let MaskImgConstructor = Vue.extend(require('./mask-img.vue'));
                    instance = new MaskImgConstructor();
                    instance.src = this.scaleSrc ? this.scaleSrc : this.srcs[this.offset];
                    instance.alt = this.alt;
                    instance.vm = instance.$mount();
                    document.body.appendChild(instance.$el);
                }


            },
            slide(direction) {
                if (direction === 'left') {
                    if (this.offset <= 0) {
                        if (this.loop) {
                            return this.offset = this.srcs.length - 1;
                        }
                        return this.offset = 0;
                    }
                    return this.offset -= 1;
                }
                if (direction === 'right') {
                    if (this.offset >= this.srcs.length - 1) {
                        if (this.loop) {
                            return this.offset = 0;
                        }
                        return this.offset = this.srcs.length - 1;
                    }
                    return this.offset += 1;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../css/_icons';
    @import '../../css/_colors';
    @import '../../css/_zindex';

    .imgbox-wrap {
        height: 100%;
    }

    .imgbox {
        height: 100%;
        overflow: hidden;
        position: relative;
        background: white;
        border: 1px solid $border-gray;
        text-align: center;
        &:before {
            content: '';
            display: inline-block;
            height: 100%;
            width: 0;
            vertical-align: middle;
        }
        img {
            vertical-align: middle;
            cursor: pointer;
        }
        .icon-scale {
            position: absolute;
            right: 0;
            bottom: 0;
            background: #eceef3;
            cursor: pointer;
        }
        .inner-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: transform .5s cubic-bezier(0.75, 0.43, 0.29, 1.06);
            text-align: left;
        }
        & .arrow {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 26px;
            cursor: pointer;
            background: rgba(255, 255, 255, .8);
            opacity: 0;
            transition: opacity .4s ease;
        }
        /*图标最后再加*/
        & .arrow-left {
            left: 0;
        }
        & .arrow-right {
            right: 0;
        }
        &:hover {
            .arrow {
                opacity: 1;
            }
        }
    }
</style>
