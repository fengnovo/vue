<template>
<div class="rscontent-content market-data-right-slide-detail">
    <div class="rscontent-content-item">
        <div class="rscontent-content-item-content">
            <el-form ref="ruleForm" label-width="140px" prop="datail">
                <el-form-item label="规格ID:">
                    <span>{{datail.adSpecId}}</span>
                </el-form-item>
                <el-form-item label="规格名称:">
                    <span>{{datail.adSpecName}}</span>
                </el-form-item>
                <el-form-item label="曝光量级:">
                    <span>{{datail.exposureType}}</span>
                </el-form-item>
                <el-form-item label="点击单价(元):">
                    <span>{{datail.clickPrice}}</span>
                </el-form-item>
                <el-form-item label="最高出价:">
                    <span>{{datail.maxClickPrice}}</span>
                </el-form-item>
                <el-form-item label="点击率(%):">
                    <span>{{datail.clickRate}}</span>
                </el-form-item>
                <el-form-item label="ECPM(元):">
                    <span>{{datail.ECPM}}</span>
                </el-form-item>
                <el-form-item label="审核规则提示:">
                    <p>{{datail.marketAuditTips || desc}}</p>
                </el-form-item>
                <el-form-item label="操作时间:">
                    <span>{{transTime(datail.marketLastmodTimeMs)}}</span>
                </el-form-item>
                <el-form-item label="操作人:">
                    <span>{{datail.marketModifyBy}}</span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</div> 
</template>

<script>
    import { transTime } from '../../common/util';
    export default {
        props: ["datail","desc"],
        methods: {
            transTime
        }
    }
</script>

<style lang="scss">
    @import '../../css/const';

.market-data-right-slide-detail {
    .rscontent-content-item {
        background-color: #fff;
        margin: 20px;
        padding: 50px 20px 50px 20px;  

        .el-form-item label {
            color: #5c5c5c;
            font-weight: $fontWeight;
            margin-right: 30px;
        }

        .el-form-item .el-form-item__content {
            color: #5c5c5c;
        }

    }
}
</style>