/**
* @desc: 基于element-ui重新封装的button
* @props:
* type: {String}: danger|default|primary|text
* size: {String}: large|normal|small|mini|long
* icon: {String} 仅支持element-ui默认的icon，其他icon通过默认slot即可
* nativeType: {String}
* loading: Boolean
* disabled: Boolean
* plain: Boolean
* autofocus: Boolean
* confirm: Boolean 点击后是否popover确认
*/
<template>
    <button
        :disabled="disabled"
        class="yzt-button"
        :autofocus="autofocus"
        :type="nativeType"
        :class="[
                      type ? 'yzt-button-' + type : '',
                      size ? 'yzt-button-' + size : '',
                      {
                        'is-disabled': disabled,
                        'is-loading': loading,
                        'is-plain': plain
                      }
                ]"
        @click="handleClick"
        v-if="!confirm"
    >
        <i
            class="el-icon-loading"
            v-if="loading"
        ></i>
        <i
            :class="icon"
            class="_icon"
            v-if="icon && !loading"
        ></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
    <button
        :disabled="disabled"
        class="yzt-button middle-align"
        :autofocus="autofocus"
        :type="nativeType"
        :class="[
                      type ? 'yzt-button-' + type : '',
                      size ? 'yzt-button-' + size : '',
                      {
                        'is-disabled': disabled,
                        'is-loading': loading,
                        'is-plain': plain
                      }
                ]"
        @click="handleClick"
        v-popover:popover
        v-else-if="confirm"
    >
        <i
            class="el-icon-loading"
            v-if="loading"
        ></i>
        <i
            :class="icon"
            v-if="icon && !loading"
        ></i>
        <span v-if="$slots.default"><slot></slot></span>
        <el-popover
            ref="popover"
            placement="top"
            width="160"
            v-model="visible"
        >
            <p>{{confirmString}}</p>
            <div style="text-align: right; margin: 0">
                <yzt-button
                    size="mini"
                    type="text"
                    @click="dismiss"
                >取消
                </yzt-button>
                <yzt-button
                    type="primary"
                    size="mini"
                    @click="ok"
                >确定
                </yzt-button>
            </div>
        </el-popover>
    </button>
</template>
<script>
    export default {
        name: 'YztButton',
        data() {
            return {
                visible: false
            }
        },
        props: {
            confirm: {
                type: Boolean,
                default: false
            },
            confirmString: {
                type: String,
                default: '确定删除吗？'
            },
            type: {
                type: String,
                default: 'default'
            },
            size: {
                type: String,
                default: 'normal'
            },
            icon: {
                type: String,
                default: ''
            },
            nativeType: {
                type: String,
                default: 'button'
            },
            loading: Boolean,
            disabled: Boolean,
            plain: Boolean,
            autofocus: Boolean
        },

        methods: {
            handleClick(e) {
                if (this.confirm) {
                    return false;
                }
                this.$emit('click', e);
            },
            dismiss() {
                this.visible = false;
            },
            ok() {
                this.visible = false;
                this.$emit('click');
            }
        },
    };
</script>

<style scoped lang="scss">
    @import '../../css/_colors';

    ._icon {
        position: relative;
        left: -3px;
    }

    .yzt-button {
        box-sizing: border-box;
        text-align: center;
        border: none;
        cursor: pointer;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        margin: 0 6px;
        -webkit-appearance: none;
        outline: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        &:nth-child(1) {
            margin-left: 0;
        }
        &:nth-last-child(1) {
            margin-right: 0;
        }
    }

    .yzt-button-large {
        width: 188px;
        height: 58px;
        font-size: 18px;
    }

    .yzt-button-normal {
        width: 120px;
        height: 40px;
        font-size: 14px;
    }

    .yzt-button-small {
        width: 100px;
        height: 40px;
        font-size: 14px;
    }

    .yzt-button-mini {
        padding: 4px;
        font-size: 12px;
    }

    .yzt-button-long {
        width: 405px;
        height: 52px;
        font-size: 30px;
    }

    .yzt-button-primary {
        background: $form-button-primary;
        color: $white;
    }

    .yzt-button-danger {
        background: $form-button-danger;
        color: $white;
    }

    .yzt-button-default {
        background: $bg-btn-default-color;
        color: $text-color-main;
        border: 1px solid $text-color-step-unpass;
    }

    .yzt-button-text {
        border: none;
        color: $text-color-link;
        background: transparent;
        padding-left: 0;
        padding-right: 0;
        width: auto;
        height: auto;
    }

    .yzt-button.is-loading {
        position: relative;
        pointer-events: none;
    }

    .yzt-button-large.is-loading .el-icon-loading {
        font-size: 19px;
    }

    .yzt-button.is-loading:before {
        pointer-events: none;
        content: '';
        position: absolute;
        left: -1px;
        top: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: inherit;
        background-color: rgba(255, 255, 255, .35);
    }

    .yzt-button.is-disabled,
    .yzt-button.is-disabled:focus,
    .yzt-button.is-disabled:hover {
        color: #bfcbd9;
        cursor: not-allowed;
        background-image: none;
        background-color: #eef1f6;
        border: 1px solid #d1dbe5;
    }
</style>
