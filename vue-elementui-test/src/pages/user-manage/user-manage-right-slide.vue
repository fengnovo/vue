<template>
<div class="rscontent-content user-manage-right-slide-detail">
        <div class="rscontent-content-item">
            <div class="rscontent-content-item-title">
                基本信息
            </div>
            <div class="rscontent-content-item-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
                    <el-form-item label="所属行业" prop="name">
                        <span>所属行业所属行业所属行业</span>
                    </el-form-item>
                    <el-form-item label="推广内容" prop="name">
                        <span>推广内容推广内容推广内容</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="rscontent-content-item">
            <div class="rscontent-content-item-title">
                营业执照
            </div>
            <div class="rscontent-content-item-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
                    <el-form-item label="公司名称" prop="name">
                        <span>所属行业所属行业所公司</span>
                    </el-form-item>
                    <el-form-item label="营业执照编号" prop="name">
                        <span>48268555555</span>
                    </el-form-item>
                    <el-form-item label="法人代表姓名" prop="name">
                        <span>王小二</span>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="name">
                        <span>456525111554659120</span>
                    </el-form-item>
                    <el-form-item label="营业执照地址" prop="name">
                        <span>北京银行五环支行</span>
                    </el-form-item>
                    <el-form-item label="成立日期" prop="name">
                        <span>2017-05-15</span>
                    </el-form-item>
                    <el-form-item label="注册资本" prop="name">
                        <span>301,510,152</span>
                    </el-form-item>
                    <el-form-item label="营业期限" prop="name">
                        <span>2017-05-15至2027-08-15</span>
                    </el-form-item>
                    <el-form-item label="公司详情地址" prop="name">
                        <span>北京银行五环支行</span>
                    </el-form-item>
                    <el-form-item label="公司邮箱" prop="name">
                        <span>xiaoming@foxmail.com</span>
                    </el-form-item>
                    <el-form-item label="公司紧急联系人" prop="name">
                        <span>xiaoming</span>
                    </el-form-item>
                    <el-form-item label="公司紧急联系人电话" prop="name">
                        <span>13254262266</span>
                    </el-form-item>
                    <el-form-item label="上传法人身份证" prop="name">
                        <div class="default-img">身份证照片</div>
                    </el-form-item>
                    <el-form-item label="上传营业执照副本" prop="name">
                        <div class="default-img">营业执照副本</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="rscontent-content-item">
            <div class="rscontent-content-item-title">
                组织机构代码
            </div>
            <div class="rscontent-content-item-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
                    <el-form-item label="组织机构代码" prop="name">
                        <span>56562987445</span>
                    </el-form-item>
                    <el-form-item label="组织机构代码副本" prop="name">
                        <div class="default-img">组织机构代码副本</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="rscontent-content-item">
            <div class="rscontent-content-item-title">
                开户行许可证
            </div>
            <div class="rscontent-content-item-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
                    <el-form-item label="银行开户名" prop="name">
                        <span>北京银行</span>
                    </el-form-item>
                    <el-form-item label="公司银行账户" prop="name">
                        <span>4982556184555-4455</span>
                    </el-form-item>
                    <el-form-item label="公司银行账户" prop="name">
                        <span>4982556184555-4455</span>
                    </el-form-item>
                    <el-form-item label="开户银行支行名" prop="name">
                        <span>北京银行五环支行</span>
                    </el-form-item>
                    <el-form-item label="开户银行支行联行号" prop="name">
                        <span>21495558446</span>
                    </el-form-item>
                    <el-form-item label="开户银行支行地址" prop="name">
                        <span>北京市五环高速路口</span>
                    </el-form-item>
                    <el-form-item label="银行开户许可证电子版" prop="name">
                        <div class="default-img">银行开户许可证电子件</div>
                    </el-form-item>

                </el-form>
            </div>
        </div>

</div> 

</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: false, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: false, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: false, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: false, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: false, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        mounted() {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss">
    @import '../../css/const';
    .user-manage-right-slide-detail {
        min-height: 600px;
        @import './user-manage-right-slide.scss';
    }
</style>
