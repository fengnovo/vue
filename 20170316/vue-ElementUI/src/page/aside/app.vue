<template>
    <div
        class="menu-bar"
        :class="{'menu-close': menuClosed, 'menu-open-active': menuOpenActive, 'menu-close-active': menuCloseActive}"
        @transitionend="menuOpenActive=false;menuCloseActive=false"
        ref="menuBar"
    >
        <ul class="menu-menus">
            <li class="menu-logo">
                <img
                    src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg"
                    alt="logo"
                    v-if="!menuClosed"
                >
                <img
                    src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg"
                    alt="logo"
                    v-else
                >
            </li>
            <li
                class="icon-nav-wrap"
                @click="toggleMenu"
            >
                <i class="icon-nav"></i>
            </li>
            <li>
                <ul class="menu-set">
                    <li
                        v-for="(item, index) in menuData"
                        :key="item.name"
                        @mouseenter="menuClosed&&item.children&&item.children.length&&selectMenu(item.name, index)"
                        @mouseleave="menuClosed&&item.children&&item.children.length&&selectMenu(item.name, index)"
                    >
                        <div
                            class="menu-item"
                            @click="selectMenu(item.name, index)"
                            :class="{
                                'menu-active': lastSelectIndex === index && slideSubMenu[item.name],
                                'current-menu': item.name === currentName,
                                'menu-text-blue': item.name === currentName && !(item.children && item.children.length)
                                }"
                        >
                            <i :class="item.icon.slice(0, -4) + (item.name === currentName ? 'blue':'gray')"></i><span>{{item.title}}</span>
                            <i
                                class="icon-arrow-gray-small"
                                :class="{'icon-arrow-rotate': slideSubMenu[item.name]}"
                                v-if="item.children && item.children.length"
                            ></i>
                        </div>
                        <transition
                            name="slide"
                            v-if="item.children && item.children.length"
                        >
                            <ul
                                class="sub-menu"
                                v-show="slideSubMenu[item.name]"
                            >
                                <li v-show="menuClosed">
                                    <div class="sub-menu-title">{{item.title}}</div>
                                </li>
                                <li
                                    v-for="child in item.children"
                                    @click="selectChild(item.name, child.name)"
                                >
                                    <router-link
                                        :class="['sub-menu-item', {'menu-text-blue': child.name === currentChildName}]"
                                        :to="'/' + child.name"
                                        tag="div"
                                    >{{child.title}}
                                    </router-link>
                                </li>
                            </ul>
                        </transition>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from "vue";
    import { menuData } from '@/common/config.menu.js';
    import {
        mutationTypeEnum as asideMutationTypeEnum,
        STORE_NAME as ASIDE_STORE_NAME
    } from '@/common/config.aside';
    import { mapMutations } from 'vuex';

    export default {
        data() {
            return {
                slideSubMenu: {},   // 展开的子菜单对象
                menuClosed: false,
                menuCloseActive: false,
                menuOpenActive: false,
                menuData,                   // 菜单配置
                lastSelectIndex: -1,        // 上次点击的主菜单索引，用于隐藏菜单和控制点击当前变灰底色
                currentName: '',            // 当前父菜单的name
                currentChildName: '',        // 当前子菜单菜单name
            }
        },
        created() {
            this.lockNav(location.hash.split('/')[1]);
        },
        methods: {
            ...mapMutations(ASIDE_STORE_NAME, {
                updateCollapse: asideMutationTypeEnum.UPDATE_COLLAPSE
            }),
            selectMenu(name, index) {
                if (this.menuData[index].children && this.menuData[index].children.length) {
                    Vue.set(this.slideSubMenu, name, !this.slideSubMenu[name]); // 展开子菜单
                }
                // 若主菜单是关闭的，则选择其他子菜单要将上次打开的其他菜单隐藏
                this.menuClosed &&
                this.lastSelectIndex !== -1 &&
                this.lastSelectIndex !== index &&
                Vue.set(this.slideSubMenu, this.menuData[this.lastSelectIndex].name, false);
                this.lastSelectIndex = index;

                if (!(this.menuData[index].children && this.menuData[index].children.length)) {
                    // this.currentName !== name && this.clearPathRecord();
                    this.currentName = name;
                    this.currentChildName = '';
                    this.$router.push(`/${name}`);
                }
            },
            selectChild(currentName, childName) {
                // this.currentChildName !== childName && this.clearPathRecord();
                this.currentName = currentName;
                this.currentChildName = childName;
            },
            toggleMenu() {
                this.menuClosed = !this.menuClosed;
                if (this.menuClosed) {
                    this.menuCloseActive = true;
                    for (let key of Object.keys(this.slideSubMenu)) {
                        this.slideSubMenu[key] && Vue.set(this.slideSubMenu, key, false);
                    }
                } else {
                    this.menuOpenActive = true;
                    if (!window.TransitionEvent) {
                        this.menuOpenActive = false;
                    }
                }
                this.updateCollapse(this.menuClosed);
                //echarts自适应需要触发window的rezise事件
                if (window.TransitionEvent) {
                    document.body.style.overflow = 'hidden';
                    this.$el.addEventListener('transitionend', this.triggerResize, false);
                } else {
                    this.triggerResize();
                }
            },
            triggerResize() {
                let ev = document.createEvent('Event');
                ev.initEvent('resize', true, true);
                window.dispatchEvent(ev);
                document.body.style.overflow = '';
                this.$el.removeEventListener('transitionend', this.triggerResize);
            },
            lockNav(name) {
                let currentName = name || 'index';
                let currentChildName = '';
                let unWatchName;
                let findNavName = this.menuData.some(item => {
                    if (item.name === currentName) {
                        return true;
                    }
                    return item.children && item.children.length && item.children.some(child => {
                        if (currentName === child.name) {
                            currentName = item.name;
                            currentChildName = child.name;
                            return true;
                        }
                    });
                });
                if (findNavName) {
                    this.currentName = currentName;
                    currentChildName && (this.currentChildName = currentChildName);
                    Vue.set(this.slideSubMenu, currentName, true);
                } else {
                    unWatchName = this.$watch('$route', (from, to) => {
                        this.lockNav(from.path.split('/')[1]);
                        unWatchName();
                    });
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../css/_colors';
    @import '../../css/_libCommons';

    .menu-set {
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        top: 70px;
        bottom: 0;
        width: 100%;
    }

    .menu-bar {
        background: $bg-aside-bar-color;
        width: 240px;
        color: $text-color-aside-bar;
        @include prefix(transition, all .3s ease);
        position: relative;
        height: 100%;
    }

    .menu-logo {
        height: 70px;
        line-height: 70px;
        color: $text-color-top-bar;
        background: $bg-aside-logo-color;
        font-size: 24px;
        text-align: center;
    }

    .menu-item {
        box-sizing: border-box;
        @include prefix(transition, all .3s);
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        &:hover {
            background: $bg-aside-hover-color;
        }
        i:not(.icon-arrow-gray-small) {
            margin-right: 27px;
            margin-left: 27px;
        }
    }

    .sub-menu-item {
        padding-left: 86px;
        &:hover {
            background: $bg-aside-hover-color;
        }
        cursor: pointer;
    }

    .icon-arrow-gray-small {
        float: right;
        margin-right: 30px;
        margin-top: 18px;
        line-height: normal;
        @include prefix(transform, rotate(-90deg));
    }

    .menu-menus {
        .icon-nav-wrap {
            position: absolute;
            left: 100%;
            top: 0;
            line-height: 50px;
            padding: 10px 25px;
            background: #545454;
            cursor: pointer;
        }
        li {
            line-height: 60px;
        }
        a {
            color: inherit;
        }
    }

    .current-menu:before {
        content: '';
        display: inline-block;
        height: 100%;
        border-left: 5px solid $bg-top-bar-color;
        position: absolute;
        left: 0;
        top: 0;
    }

    .sub-menu {
        overflow: hidden;
        max-height: 300px;
    }

    .slide-enter, .slide-leave-to {
        max-height: 0;
        opacity: 0;
    }

    .slide-enter-active, .slide-leave-active {
        @include prefix(transition, all .3s linear);
    }

    .icon-arrow-rotate {
        @include prefix(transform, rotate(0deg));
    }

    .menu-bottom {
        position: absolute;
        background: $bg-aside-bottom-menu-color;
        width: 100%;
        bottom: 0;
        left: 0;
    }

    .menu-botom-item {
        display: inline-block;
        width: 80px;
        height: 46px;
        line-height: 46px;
        text-align: center;
    }

    .menu-text-blue {
        color: $text-color-aside-selected;
    }

    .menu-active {
        background: $gray;
    }

    .menu-close {
        width: 80px;
        .menu-item > *:not(:first-child) {
            display: none;
        }
        .menu-bottom > *:not(:first-child) {
            display: none;
        }
        .sub-menu {
            position: fixed;
            left: 80px;
            margin-top: -60px;
            width: 140px;
            background: $bg-sub-menu-color;
            box-shadow: 4px 5px 6px #dddddd;
            &:last-child {
                padding-bottom: 15px;
            }
        }
        .sub-menu-item {
            padding-left: 0;
            text-align: center;
            line-height: 40px;
        }
        .sub-menu-title {
            text-align: center;
            line-height: 60px;
        }
    }

    .menu-close-active {
        .menu-item ~ ul {
            display: none;
        }
    }

    .menu-open-active {
        /*overflow: hidden;*/
        .menu-item {
            width: 240px;
        }
        .menu-item ~ ul {
            display: none;
        }
        .menu-bottom {
            width: 240px;
        }
    }

</style>
