<template>
    <div class="yzt-container-content">
        <el-form ref="form" :model="form">
                <el-form-item>
                    <el-button type="primary" class="yzt-form-item-btn download-btn">新建规格</el-button>
                    <el-input placeholder="输入规格名称" v-model="input3" class="yzt-form-item-btn-one uid-input">
                        <template slot="prepend">规格名称
                        </template>
                </el-input>
                <div class="yzt-form-item">
                    <el-select v-model="value" placeholder="全部产品类型" class="yzt-form-item-sel">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="全部出价方式" class="yzt-form-item-sel">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions2"
                        class="yzt-form-item-sel">
                    </el-date-picker>
                </div>

                <el-button type="primary" 
                            @click="handleSearch"
                            class="yzt-form-item-btn-one search-btn"
                >查询</el-button>
                <el-button type="default" 
                            class="yzt-form-item-btn-one reset-btn"
                >重置</el-button>
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
            <el-table-column
                type="selection"
                width="45">
            </el-table-column>
            <el-table-column
                label="规格ID">
                <template scope="scope">
                    <span>{{scope.row.sID}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="规格名称"
                width="500">
                <template scope="scope">
                    <span>{{scope.row.sName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="产品类型">
                <template scope="scope">
                    <span>{{scope.row.prodType}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作时间">
                <template scope="scope">
                    <span>{{scope.row.opeaTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作人">
                <template scope="scope">
                    <span>{{scope.row.opeaMan}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="250">
                <template scope="scope">
                    <el-button @click.native.prevent="openDetailSlide()" type="text" size="small">
                        查看详情
                    </el-button>
                    <el-button @click.native.prevent="openEditorSlide()" type="text" size="small">
                        编辑
                    </el-button>
                    <el-button @click.native.prevent="notify()" type="text" size="small">
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
        console.log(query)
        return fetch({
            url: '/StandardManageData/list',
            method: 'get',
            params: query
        });
    }
    export default {
        data() {
            return {
                value7: '',
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
                value: '',
                input3: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    search: {}
                }
            }
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
                console.log(val);
                this.multipleSelection = val;
            },
            notify() {
                const h = this.$createElement;
                this.$notify({
                    title: '提示',
                    message: h('div', null, [
                        h('div', {
                            class: 'tip error-tip',
                        }, ''),
                        h('div', {
                            class: 'tip-text',
                        }, '确定要移除吗？')
                    ]),
                    duration: 2000
                });
            },
            open() {
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
            openDetailSlide() {
                this.$emit('openDetailSlide');
            },
            closeDetailSlide() {
                this.$emit('closeDetailSlide');
            },
            openEditorSlide() {
                this.$emit('openEditorSlide');
            },
            closeEditorSlide() {
                this.$emit('closeEditorSlide');
            }
        }
    }
</script>