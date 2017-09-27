<template>
    <div class="yzt-container financial-query">
        <p class="content-nav-title">
            <span>财务查询</span>
        </p>
        <div class="yzt-container-content">
            <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
            <div class="yzt-page">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            tableRowClassName(row, index) {
                if (index % 2 === 0) {
                    return '';
                } else {
                    return 'yzt-table-bg';
                }
            }
        },
        data() {
            return {
                tableData2: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        }
    }
</script>

<style lang="scss">
.financial-query {
    .yzt-container-content {
        .yzt-form-item .el-input__inner {
            border-left: none;
            border-radius: 0;
        }
        .yzt-form-item {
            border-left: 1px solid #bfcbd9 !important;
        }
        .yzt-form-item-btn,
        .yzt-form-item-btn-one,
        .yzt-form-item-input input,
        .el-input-group__prepend {
            border-radius: 0;
        }
        .yzt-table {
            border: none;
            text-align: center;
            .el-table__footer-wrapper thead div,
            .el-table__header-wrapper thead div,
            .yzt-table-bg,
            .el-table__header thead th {
                background: #f4f7fa;
                text-align: center;
            }
            thead tr {
                height: 60px;
            }
            tbody tr {
                height: 80px;
            }
            tbody td {
                border-bottom: none;
            }
        }
        .el-table::after,
        .el-table::before {
            background: none;
        }
        .yzt-page {
            float: right;
            margin-top: 20px;
        }
    }
}

</style>