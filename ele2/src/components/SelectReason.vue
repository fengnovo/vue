<template>
    <el-dialog
        title="审核拒绝"
        size="tiny"
        width="500"
        name="reviewReason"
        :visible="dialogVisible"
        :before-close="close"
    >
        <div class="dialog-body">
            <p class="unpass-dialog-note">注意：审核不通过后，该广告将停止展示。</p>
            <el-form ref="form" :rules="rules" :model="dialogForm" class="unpass-dialog-form">
                <el-form-item label="不通过原因:" class="unpass-dialog-form-select">
                    <el-select v-model="dialogForm.curReason" placeholder="请选择">
                        <el-option v-for="item in reasonOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="具体原因说明:" prop="customReason" class="unpass-dialog-form-textarea">
                    <el-input type="textarea" :rows="5" v-model="dialogForm.customReason"></el-input>
                    <span>(60字内)</span> 
                </el-form-item>
            </el-form>
        </div>

       <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { axios as $fetch } from 'js/boss/yizhitou/common/util.fetch';
    import { CGI } from 'js/boss/yizhitou/common/config.cgi';

    export default {
        props: {
            data: Array,
            dialogVisible: Boolean
        },
        data() {
            return {
                reasonOptions: [
                    { label: '水印位置', value: '不得占用水印位置，请在素材的右下角158*42预留位置' },
                    { label: '秒杀活动', value: '该商品不属于京东官方秒杀商品，文案或素材标题请勿使用："秒杀"、"秒杀价"' },
                    { label: '限时限量文案', value: '素材不允许使用限时限量的文案，如仅售100双、抢购、再不抢就没了等' },
                    { label: '夸大、无法证实文案', value: '素材不允许使用夸大、无法证实的内容，如超多人买、都在这、超值、疯抢等' },
                    { label: '挑衅、命令语气文案', value: '素材不允许使用挑衅、命令语气文案，如你敢穿/戴吗、不看后悔等' },
                    { label: '档次类描述文案', value: '素材不允许使用档次类描述文案，如很有档次、高档货、上等货等' },
                    { label: '绝对化描述文案', value: '素材不允许使用绝对化描述文案，如这才是牛皮，你一定喜欢等' },
                    { label: '降价类描述文案', value: '素材不允许使用降价类描述文案，如终于降价了、清仓、库存即将售罄等' },
                    { label: '不健康且有歧义文案', value: '素材不允许使用不健康且有歧义文案“把妹、撩妹/汉、偷窥”等' },
                    { label: '误导性词语', value: '素材不允许使用误导性词语：如第一、必备、99%、100%等' },
                    { label: '今日、今天词汇', value: '素材文案不得涉及“今日”、“今天”等无明确日期指向的日期词汇，需优化' },
                    { label: '限定特征文案', value: '素材不允许使用限定身份、性别、婚姻状况、收入文案，如30-55 岁请进、100-160斤进来等' },
                    { label: '负面词汇或引起不安的文案', value: '素材不允许使用负面词汇或引起不安的强烈情感用词，如：出大事了、别上当等' },
                    { label: '文字或商品被截断问题', value: '不允许截断文字或商品，请保证素材图文完整性' },
                    { label: '无意义字符', value: '素材标题不符，请勿使用无意义字符' },
                    { label: '价格不符', value: '广告价格与落地页不符' },
                    { label: '虚假折扣信息', value: '虚假折扣信息，折扣价应以参考价/商品页折扣信息为基础' },
                    { label: '人物称谓', value: '不允许使用“哥、姐、老公、老婆、店长”等人物称谓' },
                    { label: '不支持推广', value: '此广告位暂不支持推广内衣、内裤、文胸等' },
                    { label: '功能性产品&文案', value: '不支持推广功能性及有治疗作用的产品&文案' },
                    { label: '资质上传', value: '未核实到有效资质，请在【京准通-我的账户-商家资质】上传资质' },
                    { label: '其他', value: '' },
                ],
                dialogForm: {
                    curReason: '不得占用水印位置，请在素材的右下角158*42预留位置',
                    customReason: '不得占用水印位置，请在素材的右下角158*42预留位置'
                },
                rules: {
                    customReason: [
                        {
                            validator: (r,v,b) =>{
                                v.trim().length > 60 ? b(new Error('长度在60个字符以内')) : b();
                            },
                            trigger:'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            close() {
                this.$refs.form.resetFields();
                this.$emit('update:dialogVisible', false);
            },
            // 冻结广告
            freezeAd() {
                let reason = this.dialogForm.customReason;
                let arr = this.data.map(function(item) {
                    return {
                        uin: item.uin,
                        adId: item.adId,
                        systemState: 1,
                        systemMsg: reason
                    };
                });
                $fetch({
                    url: CGI.adFrozen,
                    method: 'post',
                    data: {
                        frozenAdInfo: JSON.stringify(arr)
                    }
                }).then((resp)=> {
                    if (+resp.data.errcode === 0) {
                        this.$notify({
                            title: '提示',
                            message: '冻结广告成功',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '冻结广告失败',
                            message: resp.data.errmsg
                        });
                    }
                    this.$emit('refresh');
                }).catch(e => {
                    console.log(e);
                    this.$notify.error({
                        title: '冻结广告失败',
                        message: '网络错误或服务器出错，请稍后再试'
                    });
                });
            },
            save() {
                this.$refs.form.validate(result => {
                    if(!result){
                        this.$notify({
                            title: '提示',
                            message: '校验输入不通过！',
                            type: 'warning',
                            duration: 2000
                        });
                        return;
                    }else{
                        this.freezeAd();
                        this.$emit('update:dialogVisible', false);
                    }
                });
            }
        },
        watch: {
            'dialogForm.curReason': function() {
                this.dialogForm.customReason = this.dialogForm.curReason;
            },
            dialogVisible: function() {
                this.dialogForm.curReason = '不得占用水印位置，请在素材的右下角158*42预留位置';
                this.dialogForm.customReason = '不得占用水印位置，请在素材的右下角158*42预留位置';
            }
        }
    }
</script>
<style lang="scss">
    @import 'static/css/boss/yizhitou/prefixes';
    .dialog-body {  
        .unpass-dialog-note {
            padding: 8px 0;
        }
        .unpass-dialog-form {
            .el-input__inner {
                @include radius(0);
            }
            .el-textarea__inner {
                @include radius(0);
            }
        }


    }

    .dialog-footer {
        padding-top: 20px;
        button {
            position: absolute;
            bottom: 24px;
            width: 100px;
            &:first-child {
                right: 140px;
            }
            &:nth-last-child(1) {
                right: 24px;
            }
        }
    }

</style>