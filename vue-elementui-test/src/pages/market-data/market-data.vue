<template>
    <div class="yzt-container market-data">
        <p class="content-nav-title">
            <span>行情数据管理</span>
        </p>

        <market-data-main
            ref="main"
            @openDetailSlide="openDetailSlide"
            @closeDetailSlide="closeDetailSlide"
            @openEditorSlide="openEditorSlide"
            @closeEditorSlide="closeEditorSlide"
            ></market-data-main>

        <right-slide title="行情数据详情"
            @closeDetailSlide="closeDetailSlide"
            ref="detailSlide">
            <market-data-detail :datail="datail"></market-data-detail> 
        </right-slide>

        <right-slide title="编辑数据详情"
            @closeEditorSlide="closeEditorSlide"
            ref="editorSlide">
            <market-data-edit :datail="datail"></market-data-edit> 
        </right-slide>

  </div>
</template>

<script>
    import RightSlide from '../../components/right-slide';
    import MarketDataDetail from './market-data-detail';
    import MarketDataEdit from './market-data-edit';
    import MarketDataMain from './market-data-main';

    export default {
        components: {
            RightSlide,
            MarketDataDetail,
            MarketDataEdit,
            MarketDataMain
        },
        data() {
            return {
                datail: {},
                desc: `重要提示：
                        1. 为保证广告推广效果，请上传清晰美观的图片，并且必须符合广告审核规范；
                        2. 批量上传的图片所生成的广告，广告标题、广告描述、使用用户群、出价等会保持一致。`
            }
        },
        methods: {
            openDetailSlide(val) {
                this.datail = val;
                this.$refs.detailSlide.openSlide();
            },
            closeDetailSlide() {
                this.$refs.detailSlide.closeSlide();
            },
            openEditorSlide(val) {
                this.datail = val;
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

.market-data {
    .yzt-container-content {
        .yzt-form-item .el-input__inner {
            border-radius: 0;
        }
        .yzt-form-item {
            display: inline-block;
            margin-right: 14px;
        }
        .upload-div {
            width: 150px;
            float: left;
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
        .el-date-editor--daterange.el-input {
            width: 320px;
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