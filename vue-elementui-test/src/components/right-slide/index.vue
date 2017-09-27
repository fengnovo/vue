<template>
    <div class="boss-yzt-right-slide">
        <div class="sidebar" :class="[sidebar]">
            <div class="sidebar-left">
                <div class="close-btn sidebar-pull-button" 
                    v-show="divpop" @click="closeSlide()">
                    关闭­
                </div>
            </div>
            <div class="rs-bg sidebar-right">
                <div class="yzt-rscontent">
                    <div class="rscontent-title">
                        <span>{{ title }}</span>
                        <div class="rscontent-title-close" 
                            @click="closeSlide()">
                            <img src="../../assets/imgs/close.png" />
                        </div>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </div>
        <div class="div-pop" v-show="divpop" @click="closeSlide()"></div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            required: true,
            default: '标题'
        }
    },
    methods: {
        openSlide() {
            if (this.sidebar === 'slideRight') {
                this.divpop = true;
                this.sidebar = 'slideLeft';
            } else {
                this.divpop = false;
                this.sidebar = 'slideRight';
            }
        },
        closeSlide() {
            this.divpop = false;
            this.sidebar = 'slideRight';
        },
    },
    data() {
        return {
            divpop: false,
            sidebar: 'slideRight'
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../css/const';
@import './rightSidebar';

.yzt-rscontent {
    .rscontent-title {
        position: relative;
        width: 100%;
        height: 70px;
        font-size: 16px;
        font-weight: $fontWeight;
        line-height: 70px;
        background-color: #fff;
        span {
            margin-left: 20px;
            color: #5c5c5c;
        }
        .rscontent-title-close {
            display: inline-block;
            position: absolute;
            right: 0;
            top: 0;
            width: 50px;
            height: 50px;
            padding: 10px;
            text-align: center;
            line-height: 60px;
            cursor: pointer;
            img {
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>