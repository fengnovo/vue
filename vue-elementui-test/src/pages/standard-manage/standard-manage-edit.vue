<template>
    <div class="rscontent-content standard-manage-right-slide-editor">
        <div class="rscontent-content-item">
            <div class="rscontent-content-item-content">
                <el-form ref="ruleForm" label-width="140px">
                    <el-form-item label="媒体类型" prop="name">
                        <span>百度媒体资源</span>
                    </el-form-item>
                    <el-form-item label="广告类型" prop="name">
                        <span>无线广告</span>
                    </el-form-item>
                    <el-form-item label="站点名称" prop="name">
                        <span>百度信息流直投</span>
                    </el-form-item>
                    <el-form-item label="投放日期" prop="name">
                        <span>不限制</span>
                    </el-form-item>
                    <el-form-item label="日限额" prop="name">
                        <span>300元/天</span>
                    </el-form-item>
                    <el-form-item label="推广计划类型" prop="name">
                        <span>无线类无线类无线类无线类无线类无线类无线类无线类无线类
                            无线类无线类无线类无线类无线类无线类无线类无线类无线类
                            无线类无线类无线类无线类无线类无线类无线类无线类无线类
                            无线类无线类无线类无线类无线类无线类无线类无线类无线类
                            无线类无线类无线类无线类无线类无线类无线类无线类无线类
                        </span>
                    </el-form-item>
                    <el-form-item label="投放区域" prop="name">
                        <span>全部地区</span>
                    </el-form-item>
                    <el-form-item label="人群定向" prop="name">
                        <span>京东DMP定向</span>
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
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .standard-manage-right-slide-editor {
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
        }
    }
</style>