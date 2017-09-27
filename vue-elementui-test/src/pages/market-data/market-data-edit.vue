<template>
<div class="rscontent-content market-data-right-slide-edit">
    <div class="rscontent-content-item">
        <div class="rscontent-content-item-content">
            <el-form ref="ruleForm" label-width="120px" class="market-data-editor-form">
                <el-form-item label="规格ID:" prop="datail" class="market-data-editor-input">
                    <span class="market-data-editor-text">{{datail.adSpecId}}</span>
                </el-form-item>
                <el-form-item label="规格名称:" prop="datail" class="market-data-editor-input">
                    <span class="market-data-editor-text">{{datail.adSpecName}}</span>
                </el-form-item>
                <el-form-item label="曝光量级:" prop="exposureType" class="market-data-editor-select">
                    <el-select v-model="datail.exposureType" placeholder="请选择">
                        <el-option label="未知" value="0" style="display:none"></el-option>
                        <el-option label="十万级" value="1"></el-option>
                        <el-option label="百万级" value="2"></el-option>
                        <el-option label="千万级" value="3"></el-option>
                        <el-option label="亿级" value="4"></el-option>
                        <el-option label="十亿级" value="5"></el-option>
                    </el-select>
                    <span>(仅展示在京东直投)</span>
                </el-form-item>
                <el-form-item label="点击单价(元):" prop="clickPrice" class="market-data-editor-input">
                    <el-input v-model="datail.clickPrice"></el-input>
                    <span>(仅展示在京东直投)</span>
                </el-form-item>
                <el-form-item label="最高出价(元):" prop="maxClickPrice" class="market-data-editor-input">
                    <el-input v-model="datail.maxClickPrice"></el-input>
                    <span>(仅展示在京东直投)</span>
                </el-form-item>
                <el-form-item label="点击率(%):" prop="clickRate" class="market-data-editor-input">
                    <el-input v-model="datail.clickRate"></el-input>
                    <span>(仅展示在京东直投)</span>
                </el-form-item>
                <el-form-item label="ECPM(元):" prop="ECPM" class="market-data-editor-input">
                    <span class="market-data-editor-text">{{1000*datail.clickPrice*datail.clickRate}}</span>
                    <span>(仅展示在京东直投)</span>
                </el-form-item>
                <el-form-item label="提示&建议:" prop="marketClientTips" class="market-data-editor-textarea">
                    <el-input type="textarea"                        
                        :rows="5"
                        v-model="datail.marketClientTips" 
                        placeholder="输入提示&建议">
                    </el-input>
                    <span>(仅展示在京东直投)</span>
                </el-form-item>
                <el-form-item label="是否推荐:" prop="datail" class="market-data-editor-input">
                    <el-radio class="radio" v-model="datail.adSpecProperty" :label=1>是</el-radio>
                    <el-radio class="radio" v-model="datail.adSpecProperty" :label=0>否</el-radio>
                    <span>(仅展示在京东直投)</span>
                </el-form-item>
                <el-form-item label="审核规则提示:" prop="datail" class="market-data-editor-textarea">
                    <el-input type="textarea" 
                        :rows="5"
                        v-model="datail.marketAuditTips" 
                        placeholder="输入审核规则提示">
                    </el-input>
                    <span>(仅展示在京东直投)</span>
                </el-form-item>
                <div class="market-data-editor-form-submit">
                    <div class="market-data-editor-form-submit-btn">
                        <el-button @click="cancle()">取消</el-button>
                        <el-button type="danger" @click="handleSubmit()">保存并提交</el-button>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</div> 
</template>

<script>
    import { transTime } from '../../common/util';
    
    import { fetchAdd,fetchEdit } from './service.marketData';
    import { html_encode,html_decode } from '../../common/util.antixss';

    export default {
        props: ["datail","desc"],
        methods: {
            transTime
        },
        data() {
            return {
                rules: {
                    exposureType: [
                        { required: true, message: '请选择曝光量级', trigger: 'change' }
                    ],
                    clickPrice: [
                        { required: true, message: '点击单价不能为空'},
                        { type: 'number', message: '点击单价必须为数字值'}
                    ],
                    maxClickPrice: [
                        { required: true, message: '最高出价不能为空'},
                        { type: 'number', message: '最高出价必须为数字值'}
                    ],
                    clickRate: [
                        { required: true, message: '点击率不能为空'},
                        { type: 'number', message: '点击率必须为数字值'}
                    ],
                    marketClientTips: [
                        {  max: 50, message: '长度在50个字符以内', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            cancle() {
                this.$emit('closeEditorSlide');
            },
            handleSubmit() {
                /*
                    adSpecId:1001113
                    exposureType:3
                    clickPrice:0
                    maxClickPrice:0
                    clickRate:0
                    clientTips:测试1dsfsdfd
                    proposeType:0
                    auditTips:测试测试测试测试测试111
                 */
                let { 
                    adSpecId,
                    exposureType,
                    clickPrice,
                    maxClickPrice,
                    clickRate,
                    marketClientTips,
                    adSpecProperty,
                    marketAuditTips
                } = this.datail;
                let clientTips = marketClientTips,
                    proposeType = adSpecProperty,
                    auditTips = marketAuditTips;

                console.log({
                    adSpecId,
                    exposureType,
                    clickPrice,
                    maxClickPrice,
                    clickRate,
                    clientTips,
                    proposeType,
                    auditTips
                });
                
                fetchEdit({
                    adSpecId,
                    exposureType,
                    clickPrice,
                    maxClickPrice,
                    clickRate,
                    clientTips,
                    proposeType,
                    auditTips
                }).then(response => {
                    console.log(response)
                    const h = this.$createElement;
                    let tipClass = response.errcode == '0' ? 'tip success-tip' : 'tip error-tip',
                        tipText = response.errcode == '0' ? '成功！' : ('失败!');
                    this.$notify({
                        title: '提示',
                        message: h('div', null, [
                            h('div', {
                                class: tipClass,
                            }, ''),
                            h('div', {
                                class: 'tip-text',
                            }, tipText)
                        ]),
                        duration: 3000
                    });
                })
            }
        }
    }
</script>

<style lang="scss">
.market-data-right-slide-edit {
    .rscontent-content-item {
        background-color: #fff;
        margin: 20px;
        padding: 50px 20px 50px 20px;  

        .el-form-item label {
            color: #000;
            margin-right: 30px;
        }

        .el-form-item .el-form-item__content {
            color: #5c5c5c;
        }

        .market-data-editor-form {
            span {
                margin-left: 10px;
            }
            label {
                letter-spacing: 2px;
            }
            .market-data-editor-select {
                label {
                    margin: 0 10px 0;
                }
                input {
                    width: 400px;
                    border-radius: 0;
                }
            }
            .market-data-editor-input {
                label {
                    margin: 0 10px 0;
                }
                .el-input {
                    width: 400px;
                    .el-input__inner {
                        border-radius: 0;
                    }
                }
            }
            .market-data-editor-textarea {
                .el-form-item__label {
                    padding: 0;
                    margin: 0 20px 0 0;
                }
                .el-textarea {
                    float: left;
                    width: 400px;
                    textarea {
                        border-radius: 0;
                    }
                }
            }

            .market-data-editor-text {
                margin-left: 0;
            }
            .market-data-editor-form-submit {
                position: relative;
                height: 50px;
                .market-data-editor-form-submit-btn {
                    position: absolute;
                    top: 0;
                    left: 400px;
                    button {
                        width: 184px;
                        height: 58px;
                    }
                }
            }
        }

    }
}
</style>