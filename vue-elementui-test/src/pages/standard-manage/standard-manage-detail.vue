<template>
    <div class="rscontent-content standard-manage-right-slide-detail">
        <div class="rscontent-content-item">
            <div class="rscontent-content-item-content">
                <el-form ref="ruleForm" label-width="140px">
                    <el-form-item label="规格ID" prop="name">
                        <span>1001011</span>
                    </el-form-item>
                    <el-form-item label="规格名称" prop="name">
                        <span>DEV勿删-cdctest(388)-一文+stb+elesty---new</span>
                    </el-form-item>
                    <el-form-item label="产品类型" prop="name">
                        <span>无线广告</span>
                    </el-form-item>
                    <el-form-item label="子产品类型" prop="name">
                        <span>不限制</span>
                    </el-form-item>
                    <el-form-item label="是否有素材集合" prop="name">
                        <span>是</span>
                    </el-form-item>
                    <el-form-item label="推广计划类型" prop="name">
                        <div>
                            <img src="http://img1.360buyimg.com/ppexp/jfs/t4903/26/2029958842/82805/967194c8/58f6cf43Nefb7dd77.png" />
                        </div>
                    </el-form-item>
                    <el-form-item label="推广计划类型" prop="name">
                        <div>
                            <img src="http://img1.360buyimg.com/ppexp/jfs/t4831/362/1979582311/27306/862d8a3/58f6cf46N4ca5dbc3.png" />
                        </div>
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
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss">
    .standard-manage-right-slide-detail {
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