<template>
    <div class="yzt-container noneed-login">
        <p class="content-nav-title">
            <span>免登陆查询</span>
        </p>
        <div class="yzt-container-content">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input placeholder="输入广告主pin查询" v-model="input3">
                    </el-input>
                    <el-button type="primary" class="yzt-form-item-btn-one search-btn">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss">
.noneed-login {
    .yzt-container-content {
        .el-input, .el-input__inner {
            border-radius: 0;
            width: 300px;
            margin-right: 20px;
        }
    }
}

</style>

<script>
    export default {
        methods: {

        },
        data() {
            return {
                input3: '',
                form: {}
            }
        }
    }
</script>