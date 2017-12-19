<template>
    <div class="hd-bar">
        <div class="hd-platform-type"
            :class="collapse && 'collapse'"
             v-clickoutside="hide"
        >
            <ul @click="show=!show">
                <li>
                    <a src="#">
                        <span>blog</span>
                        <i class="icon-arrow-white-small"></i>
                    </a>
                </li>
                <transition name="hd-platform">
                    <li v-show="show" class="hd-platform-item">
                        <a target="_blank">blog管理端</a>
                    </li>
                </transition>
            </ul>
        </div>
        <div class="hd-user-info">
            <div class="hd-inside-message">
            <div class="hd-message-dot">
                <i class="icon-message"></i><span class="hd-number-dot">13</span>
            </div>
            <span>评论数</span>
            </div>
            <div class="hd-username">
                <i class="icon-account-white"></i>
                <span>{{'fengnovo'}}</span> |
                <span class="hd-logout">退出</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import Clickoutside from '@/common/util.clickoutside';
    import {
        STORE_NAME as ASIDE_STORE_NAME,
        stateNameEnum as asideStateNameEnum,
    } from '@/common/config.aside';
    export default {
        data() {
            return {
                show: false
            }
        },
        computed: {
            ...mapState(ASIDE_STORE_NAME, {
                collapse: asideStateNameEnum.COLLAPSE
            }),
        },
        methods: {
            hide() {
                this.show = false;
            }
        },
        directives: { Clickoutside },
    }
</script>
<style lang="scss" scoped>
    @import '../../css/_colors';
    @import '../../css/_libCommons';

    .hd-bar {
        background: $bg-top-bar-color;
        color: $text-color-top-bar;
        width: 100%;
        height: 70px;
        line-height: 70px;
        box-sizing: border-box;
        border: none;
        font-size: 16px;
        padding-right: 33px;
    }

    .hd-platform-type {
        display: inline-block;
        margin-left: 310px;
        background: $bg-top-bar-color;
        font-size: 18px;
        @include prefix(transition, margin-left .3s);
        &.collapse {
            margin-left: 150px;
        }
        ul {
            padding-left: 30px;
            padding-right: 5px;
            color: #fff;
            a {
                width: 100%;
                display: inline-block;
                height: 100%;
                color: #fff;
            }
            li:hover {
                opacity: 0.8;
                cursor: pointer;
            }
        }
        .icon-arrow-white-small {
            margin-left: 18px;
        }
    }

    .hd-platform-item {
        @include prefix(transition, all .3s ease);
    }

    .hd-platform-enter-active, .hd-platform-leave {
        height: 70px;
    }

    .hd-platform-enter, .hd-platform-leave-to {
        opacity: 0;
        height: 0;
    }

    .hd-user-info {
        float: right;
        > div {
            display: inline-block;
            &:not(:last-of-type) {
                margin-right: 43px;
            }
        }
        i {
            margin-right: 13px;
        }
        .icon-account-white {
            &:before {
                margin-top: -3px;
            }
        }
        .hd-logout {
            cursor: pointer;
        }
    }

    .hd-money > div {
        display: inline-block;
    }

    .hd-inside-message > div {
        display: inline-block;
    }

    .hd-cost {
        margin-left: 30px;
    }

    .hd-message-dot {
        display: inline-block;
        position: relative;
        .hd-number-dot {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 10px;
            box-sizing: border-box;
            background-color: $form-button-danger;
            font-size: 10px;
            position: absolute;
            left: 15px;
            top: 15px;
            text-align: center;
        }
    }

</style>
