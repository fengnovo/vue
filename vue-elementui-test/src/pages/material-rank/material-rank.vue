<template>
    <div class="yzt-container material-rank">
        <p class="content-nav-title">
            <span>素材排行</span>
        </p>
        <div class="yzt-container-content">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-button type="primary"
                            class="yzt-form-item-btn">下载Excel</el-button>
                    <div class="yzt-form-item">
                        <el-date-picker
                            class="yzt-form-item-sel"
                            v-model="value6"
                            type="daterange"
                            placeholder="选择日期范围">
                        </el-date-picker>
                        <el-select v-model="value" placeholder="请选择" class="yzt-form-item-sel">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="value" placeholder="请选择" class="yzt-form-item-sel">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="value" placeholder="请选择" class="yzt-form-item-sel">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-input placeholder="输入PIN/伪uin/GdtUid" v-model="input3" class="yzt-form-item-btn-one uid-input">
                        <template slot="prepend">GdtUid</template>
                    </el-input>
                    <el-button type="primary" class="yzt-form-item-btn-one">查询</el-button>
                </el-form-item>
            </el-form>


            <el-table
            :data="tableData2"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
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
                if (index%2 === 0) {
                    return '';
                } else{
                    return 'yzt-table-bg';
                }
            },
            onSubmit() {
                console.log('submit!');
            }
        },
        data() {
            return {
                value6: '',
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
                }],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                input3: '',
                form: {}
            }
        }
    }
</script>

<style lang="scss">
.material-rank {
    .yzt-container-content {
        .yzt-form-item .el-input__inner{
            border-left: none; 
            border-radius: 0;
        }
        .yzt-form-item{
            display: inline-block;
        }

        button{
            border-radius: 0;
        }

        .yzt-form-item-sel .el-input__inner {
            border-radius: 0px !important;
        }

        .yzt-form-item-sel {
            margin-right: -8px;
        }

        .yzt-form-item-sel input {
            border-radius: 0px !important;
        }

        .el-input-group {
            width: 300px;
        }

        .uid-input {
            margin-left: 10px;
        }
        
        .uid-input .el-input__inner{
            border-radius: 0px !important;
        }

        .yzt-table{
            border: none;
            text-align: center;
            .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div, .yzt-table-bg, .el-table__header thead th {
                background: #f4f7fa;
                text-align: center;
            }
            thead tr{
                height: 60px;
            }
            tbody tr{
                height: 80px;
            }
            tbody td{
                border-bottom: none;
            }
            
        }

        .el-table::after, .el-table::before {
            background: none;
        }   

    }
}

</style>