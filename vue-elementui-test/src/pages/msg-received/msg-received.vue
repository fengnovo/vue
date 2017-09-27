<template>
    <div class="yzt-container msg-received">
        <p class="content-nav-title">
            <span>消息触达</span>
        </p>

        <msg-received-main
            ref="main"
            @openDetailSlide="openDetailSlide"
            @closeDetailSlide="closeDetailSlide"
            ></msg-received-main>

        <right-slide title="新建消息"
            ref="detailSlide">
            <msg-received-right-slide></msg-received-right-slide>  
        </right-slide>
    </div>
</template>

<script>
    import RightSlide from '../../components/right-slide';
    import MsgReceivedRightSlide from './msg-received-right-slide';
    import MsgReceivedMain from './msg-received-main';

    export default {
        components: { RightSlide,MsgReceivedRightSlide,MsgReceivedMain },
        methods: {
            openDetailSlide() {
                this.$refs.detailSlide.openSlide();
            },
            closeDetailSlide() {
                this.$refs.detailSlide.closeSlide();
            }
        },
        mounted() {
            this.$refs.main.getList();
        }
    }
</script>

<style lang="scss">
@import '../../css/const';

.msg-received {
    .yzt-container-content {
        .yzt-form-item .el-input__inner{
            border-radius: 0;
        }
        .yzt-form-item{
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

        button{
            border-radius: 0;
        }

        form input{
            height: 40px;
        }

        .yzt-form-item-sel .el-input__inner, .el-input-group__prepend {
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
        
        .uid-input .el-input__inner{
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

        .yzt-table{
            border: none;
            text-align: center; 
            font-size: 14px;

            thead tr{
                height:60px;
                background-color: #f4f7fa !important;
            }
            thead tr th, thead tr .cell {
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
            
            .el-table__expand-column, [name=el-table_1_column_1] {
                display: none;
            }

        }

        .el-table td,.el-table th.is-leaf {
            border-bottom: none !important;
        }
        .el-table--border td,.el-table--border th {
            border-right: none !important;
        }
        .el-table--border th, .el-table__fixed-right-patch {
            border-bottom: none !important;
        }

        .el-table::after, .el-table::before {
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
}

</style>