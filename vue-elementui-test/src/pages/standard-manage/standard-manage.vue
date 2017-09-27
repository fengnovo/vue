<template>
    <div class="yzt-container standard-manage">
        <p class="content-nav-title">
            <span>规格管理</span>
        </p>
        
        <standard-manage-main
            ref="main"
            @openDetailSlide="openDetailSlide"
            @closeDetailSlide="closeDetailSlide"
            @openEditorSlide="openEditorSlide"
            @closeEditorSlide="closeDetailSlide"
        ></standard-manage-main>

        <right-slide title="规格详情"
             ref="detailSlide">
            <standard-manage-detail></standard-manage-detail> 
        </right-slide>

        <right-slide title="新建规格"
             ref="editorSlide">
            <standard-manage-edit></standard-manage-edit> 
        </right-slide>

  </div>
</template>

<script>
    import RightSlide from '../../components/right-slide';
    import StandardManageDetail from './standard-manage-detail';
    import StandardManageEdit from './standard-manage-edit';
    import StandardManageMain from './standard-manage-main';
    export default {
        components: {
            RightSlide,
            StandardManageDetail,
            StandardManageEdit,
            StandardManageMain
        },
        methods: {
            openDetailSlide() {
                this.$refs.detailSlide.openSlide();
            },
            closeDetailSlide() {
                this.$refs.detailSlide.closeSlide();
            },
            openEditorSlide() {
                this.$refs.editorSlide.openSlide();
            },
            closeEditorSlide() {
                this.$refs.editorSlide.closeSlide();
            }
        },
        mounted() {
            this.$refs.main.getList();
        }
    }
</script>

<style lang="scss">
@import '../../css/const';

.standard-manage {
    .yzt-container-content {
        background-color: #fff;
        padding: 20px 20px 97px 20px;
        min-height: 700px;
        font-size: 14px;
        font-weight: $fontWeight;
        color: #5c5c5c;
        line-height: normal;
        .yzt-form-item .el-input__inner {
            border-radius: 0;
        }
        .yzt-form-item {
            display: inline-block;
            margin-right: 14px;
        }
        .download-btn {
            background-color: $confirmColor;
            height: 40px;
            width: 120px;
            margin-right: 30px;
        }
        .search-btn {
            background-color: $confirmColor;
            height: 40px;
            width: 100px;
        }
        .reset-btn {
            background-color: #f4f8fc;
            height: 40px;
            width: 100px;
        }
        button {
            border-radius: 0;
        }
        form input {
            height: 40px;
        }
        .yzt-form-item-sel .el-input__inner,
        .el-input-group__prepend {
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
            margin-right: 14px;
        }
        .uid-input .el-input__inner {
            border-radius: 0px !important;
        }
        .form-del {
            color: #5c5c5c;
            margin-right: 40px;
            i {
                width: 12px;
                height: 12px;
                margin-right: 7px;
            }
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
            .el-form-item__label {
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #48576a;
                line-height: 1;
                padding: 11px 12px 11px 0;
                box-sizing: border-box;
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
            li.active {
                background-color: #f4f7fa;
                border: 1px solid #d1dbe5;
                color: #5c5c5c;
            }
            .el-pagination--small .btn-next,
            .el-pagination--small .btn-prev,
            .el-pagination--small .el-pager li,
            .el-pagination--small .el-pager li:last-child {
                font-size: 14px !important;
                margin-left: 10px;
            }
        }
    }
}

</style>
