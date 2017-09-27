<template>
    <div class="yzt-container ads-verify">
        <p class="content-nav-title">
            <span>广告审核</span> 
        </p>
        
        <ads-verify-main
            ref="main"
            @toggleShowOrHide="toggleShowOrHide"
            @openDetailSlide="openDetailSlide"
        ></ads-verify-main>
      
      <right-slide title="详情信息"
            ref="detailSlide">
          <ads-verify-right-slide></ads-verify-right-slide> 
      </right-slide>

        <boss-dialog 
            :dialogVisible="unpassDialog"
            title="审核拒绝"
            size="tiny"
            @toggleShowOrHide="toggleShowOrHide" 
            width="500" >
                <div slot="dialog-body" class="dialog-body">
                    <p class="unpass-dialog-note">注意：审核不通过后，该广告将停止展示。</p>
                    <el-form ref="form" :model="dialogForm" class="unpass-dialog-form">
                        <el-form-item label="不通过原因:" class="unpass-dialog-form-select">
                            <el-select v-model="dialogForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="具体原因说明:" class="unpass-dialog-form-textarea">
                            <el-input type="textarea" :rows="5" v-model="dialogForm.desc"></el-input>
                            <span>(30字内)</span>
                        </el-form-item>
                    </el-form>
                </div>

               <div slot="dialog-footer" class="dialog-footer">
                    <el-button @click="unpassDialog = false">取 消</el-button>
                    <el-button type="primary" @click="unpassDialog = false">确 定</el-button>
                </div>
        </boss-dialog>
  </div>
</template>

<script>
    import BossDialog from '../../components/dialog';
    import RightSlide from '../../components/right-slide';
    import AdsVerifyRightSlide from './ads-verify-right-slide';

    import AdsVerifyMain from './ads-verify-main';

    export default {
        components: {
            RightSlide,
            AdsVerifyRightSlide,
            AdsVerifyMain,
            BossDialog
        },
        data() {
            return {
                unpassDialog: false,
                dialogForm: {

                }
            }
        },
        methods: {
            openDetailSlide(val) {
                this.$refs.detailSlide.openSlide(val);
            },
            closeDetailSlide() {
                this.$refs.detailSlide.closeSlide();
            },
            toggleShowOrHide(flag) {
                this.unpassDialog = flag;
            }
        },
        mounted() {
            this.$refs.main.getList();
        },
    }
</script>

<style lang="scss">
@import '../../css/const';

.ads-verify {
    .yzt-container-content {
        .yzt-search-form {
            display: table;
            margin-bottom: 20px;
            .yzt-search-form-cell {
                position: relative;
                display: table-cell;
                width: 320px;
                .el-form-item__label {
                    text-align: right;
                    padding: 11px 0;
                    box-sizing: border-box;
                    position: absolute;
                    right: 210px;
                }
                .el-form-item__content {
                    text-align: right;
                }
                .search-btn {
                    margin-right: 170px;
                }
            }
            .el-input,
            .el-input__inner {
                border-radius: 0;
                width: 200px;
                height: 42px;
            }
            
            
            .yzt-search-form-cell:first-child {
                width: 270px;
            }
        }
        .yzt-form-hr {
            width: 100%;
            height: 1px;
            border: none;
            border-top: 1px solid #edeef1;
        }

        .yzt-select-form {
            margin: 20px 0;
        }
        
        .download-btn {
            background-color: $confirmColor;
            height: 42px;
            width: 120px;
            margin-right: 30px;
        }
        .selete-btn {
            background-color: rgb(244, 248, 252);
            font-weight: $fontWeight;
            color: #5c5c5c;
            height: 42px;
            border-color: rgb(204, 204, 206);
            .selete-sort-icon {
                width: 20px;
                height: 20px;
                vertical-align: middle;
                margin-left: 5px;
            }
        }
        .search-btn {
            background-color: $confirmColor;
            width: 100px;
            height: 40px;
        }
        .el-button--danger {
            background-color: $submitColor;
        }
        .yzt-table {
            border: none;
            text-align: center;
            font-size: 14px;
            thead tr {
                height: 60px;
                background-color: #f4f7fa !important;
            }
            thead tr th,
            thead tr .cell {
                background-color: #f4f7fa !important;
                text-align: center;
            }
            tbody {
                color: #5c5c5c;
                tr {
                    height: 80px;
                    
                }
                td {
                    .el-button--text {
                        color: $mainColor;
                        font-weight: $fontWeight;
                    }
                }
            }
            .yzt-table-bg {
                background-color: #f4f7fa;
            }
            .table-admsg {
                width: 253px;
                .table-admsg-left {
                    width: 103px;
                    float: left;
                }

            }
            .table-produ-img {
                border: 1px solid #dddddd;
            }

        }
        .el-table td,
        .el-table th.is-leaf {
            border-bottom: none !important;
        }
        .el-table--border td,
        .el-table--border th {
            border-right: none !important;
        }
        .el-table--border th,
        .el-table__fixed-right-patch {
            border-bottom: none !important;
        }
        .el-table::after,
        .el-table::before {
            background-color: #fff;
        }
        
        .yzt-page {
            float: right;
            margin-top: 38px;
            font-size: 14px !important;
            color: #5c5c5c;
            li.active{
                background-color: #f4f7fa;  
                border: 1px solid #d1dbe5;
                color: #5c5c5c;
            }
            .el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li:last-child {
                font-size: 14px !important;
                margin-left: 10px;
            }
        }
    }
    .dialog-body {
        padding: 0 20px 0;
        .unpass-dialog-note {
            padding: 0 20px 20px 0;
        }
        .unpass-dialog-form {
            .unpass-dialog-form-select {
                label {
                    margin: 0 10px 0;
                }
                input {
                    width: 300px;
                    border-radius: 0;
                }
            }
            .unpass-dialog-form-textarea {
                .el-form-item__label {
                    padding: 0;
                    margin: 0 20px 0 0;
                }
                .el-textarea {
                    float: left;
                    width: 300px;
                    textarea {
                        border-radius: 0;
                    }
                }
                span {
                    margin-left: 10px;
                    color: rgb(211, 211, 211);
                }
            }
        }
    }
    .dialog-footer {
        padding: 0 0 0 280px;
        button {
            width: 100px;
        }
    }
}
</style>