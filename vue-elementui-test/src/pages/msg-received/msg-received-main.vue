<template>
    <div class="yzt-container-content">
        <el-form ref="form" :model="form">
            <el-form-item>
                <el-button type="primary"
                           class="yzt-form-item-btn download-btn">下载Excel</el-button>
                <el-button type="text" class="form-del"><i class="el-icon-delete2"></i>批量删除</el-button>
                <div class="yzt-form-item">
                    <el-select v-model="value" placeholder="全部投放状态" class="yzt-form-item-sel">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="全部审核状态" class="yzt-form-item-sel">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-input placeholder="输入PIN/伪uin/GdtUid/手机号码" v-model="input3" class="yzt-form-item-btn-one uid-input">
                    <template slot="prepend">GdtUid</template>
                </el-input>
                <el-button type="primary" class="yzt-form-item-btn-one search-btn">查询</el-button>
            </el-form-item>
        </el-form>


         <el-table
            ref="multipleTable"
            :key='tableKey' 
            :data="list" 
            v-loading.body="listLoading" 
            border
            tooltip-effect="dark"
            style="width: 100%"
            class="yzt-table"
            id="table"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand" look="查看" colspan="13">
                <template scope="props">
                    <el-form label-position="left" inline>
                        <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="msgid"
            label="消息ID">
            </el-table-column>
        <el-table-column
            prop="title"
            label="消息标题"
            width="200">
            </el-table-column>
        <el-table-column
            prop="publishTime"
            label="发布时间">
            </el-table-column>
        <el-table-column
            prop="msgModle"
            label="消息模板">
            </el-table-column>
        <el-table-column
            prop="msgType"
            label="消息类型">
            </el-table-column>
        <el-table-column
            prop="state"
            label="消息状态">
            </el-table-column>
        <el-table-column
            prop="expend"
            label="触达范围">
            </el-table-column>
        <el-table-column
            prop="myPin"
            label="自定义pin">
            </el-table-column>
        <el-table-column
            prop="readMount"
            label="阅读量/总触达">
            </el-table-column>
        <el-table-column
            prop="opeaTime"
            label="操作时间">
            </el-table-column>
        <el-table-column
            prop="opeaMan"
            label="操作人">
            </el-table-column>
        <el-table-column
            label="操作">
            <template scope="scope">
                <el-button
                @click.native.prevent="openDetailSlide(scope.row)"
                type="text"
                size="small">
                编辑
                </el-button>
                <el-button
                @click.native.prevent="del(scope.row)"
                type="text"
                size="small">
                删除
                </el-button>
            </template>
            </el-table-column>
        </el-table>          

        <div v-show="!listLoading" class="pagination-container yzt-page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, prev, pager, next, sizes, jumper" :total="total">
            </el-pagination>
        </div>

      </div>
</template>

<script>
    import fetch from '../../common/util.fetch';
    function fetchList(query) {
        console.log(query);
        return fetch({
            url: '/MsgReceivedData/list',
            method: 'get',
            params: query
        });
    }
    export default {
        data() {
            return {
                value: '',
                input3: '',
                currentPage1: 10,
                form: {},
                options: {},
                list: [],
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 10,
                    delivery: undefined, 
                    verify: undefined, 
                    gdtuid: undefined
                },
                tableKey: 0,
                multipleSelection: [],
                options: {},
                pickerOptions2: [],
            };
        },
        methods: {
            getList() {
                this.listLoading = true;
                document.body.scrollTop = document.documentElement.scrollTop = (document.body.scrollTop || document.documentElement.scrollTop)/2;
                setTimeout(() => {
                    fetchList(this.listQuery).then(response => {
                        console.log(response.data.items)
                        this.list = response.data.items;
                        this.total = response.data.total;
                        this.listLoading = false;
                        this.$nextTick(()=>{
                            console.log(document.body.scrollTop)
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                        })
                    })
                },300)
            },
            handleSizeChange(val) {
                this.listQuery.limit = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList();
            },
            tableRowClassName(row, index) {
                if (index%2 === 0) {
                    return '';
                } else{
                    return 'yzt-table-bg';
                }
            },
            handleSearch() {
                // let { delivery,verify,gdtuid } = this;
                // this.listQuery.delivery = delivery;
                // this.listQuery.verify = verify;
                // this.listQuery.gdtuid = gdtuid;
                this.listQuery.page = 1;
                console.log(this.listQuery);
                this.getList();
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },
            openDiv() {
                console.log('2');
                $('.el-table__expand-column').trigger('click');
            },
            del(val) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, '确定要移除吗？'),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                            instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });
                });
            },
            closeDetailSlide(val) {
                this.$emit('closeDetailSlide',val);
            },
            openDetailSlide(val) {
                this.$emit('openDetailSlide',val);
            }
        },
        mounted() {
            
        },
        watch: {
            list() {
                var _this = this;
                this.$nextTick(()=>{
                    $('.el-table__body-wrapper .el-table__row').find('td').not(".el-table__expand-column").not(".el-table_1_column_14").click(function(){
                        var _tr = $(this).parent();
                        _tr.find('.cell').find('i').trigger('click');
                        _this.$nextTick(()=>{
                            var _td = _tr.next().find('td');
                            console.log(_td.attr('colspan'))
                            if(_td.attr('colspan')){
                                _td.attr('colspan','13')
                            }
                        })
                    })  
                })
            }
        }
    }
</script>