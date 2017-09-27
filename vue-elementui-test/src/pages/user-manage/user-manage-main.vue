<template>
<div class="yzt-container-content">
    <el-form ref="form" :model="form">
        <el-form-item>
            <el-button type="primary"
                        class="yzt-form-item-btn download-btn">下载Excel</el-button>
            <el-button type="text" class="form-del"><i class="el-icon-delete2"></i>批量删除</el-button>
            <div class="yzt-form-item">
                <el-select v-model="delivery" placeholder="全部投放状态" class="yzt-form-item-sel">
                    <el-option
                        v-for="item in deliveryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="verify" placeholder="全部审核状态" class="yzt-form-item-sel">
                    <el-option
                        v-for="item in verifyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-input placeholder="输入PIN/伪uin/GdtUid/手机号码" v-model="gdtuid" class="yzt-form-item-btn-one uid-input">
                <template slot="prepend">GdtUid</template>
            </el-input>
            <el-button type="primary" @click="handleSearch" class="yzt-form-item-btn-one search-btn">查询</el-button>
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
        width="55">
    </el-table-column>
    <el-table-column
        label="卖家资料"
        width="250">
        <template scope="scope">
            <p style="text-align: left; padding: 20px 0;">
                <span>Uin:{{scope.row.material.Uin}}</span><br/>
                <span>京东ID:{{scope.row.material.JDID}}</span><br/>
                <span>GdtUid:{{scope.row.material.GdtUid}}</span>
            </p>
        </template>
        </el-table-column>
    <el-table-column
        label="联系方式"
        width="250">
        <template scope="scope">
            <p style="text-align: left; padding: 20px 0;">
                <span>{{scope.row.contact.phoneNumber}}</span><br/>
                <span>{{scope.row.contact.email}}</span>
            </p>
        </template>
        </el-table-column>
    <el-table-column
        label="配额管理(X亿/150亿)"
        width="200">
        <template scope="scope">
            <span>{{scope.row.quota}}亿/150亿</span>
        </template>
        </el-table-column>
    <el-table-column
        label="配额利用率">
            <template scope="scope">
            <span>{{scope.row.utilization}}%</span>
        </template>
        </el-table-column>
    <el-table-column
        label="资质审核状态">
        <template scope="scope">
            <span>{{scope.row.verify}}</span>
        </template>
        </el-table-column>
    <el-table-column
        label="投放权限">
        <template scope="scope">
            <span>{{scope.row.delivery}}</span>
        </template>
        </el-table-column>
    <el-table-column
        label="操作"
        width="200">
        <template scope="scope">
            <el-button
            @click.native.prevent="toggleShowOrHide('configDialog',scope.row)"
            type="text"
            size="small">
            配额管理
            </el-button>
            <br/>
            <el-button
            @click.native.prevent="openDetailSlide(scope.row)"
            type="text"
            size="small">
            查看资质详情
            </el-button>
            <br/>
            <el-button
            @click.native.prevent="toggleShowOrHide('permissionsDialog',scope.row)"
            type="text"
            size="small">
            权限管理
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
        return fetch({
            url: '/UserManageData/list',
            method: 'get',
            params: query
        });
    }

    export default {
        data() {
            return {
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 10,
                    delivery: undefined, 
                    verify: undefined, 
                    gdtuid: undefined
                },
                deliveryOptions: [{
                    value: '启用中',
                    label: '启用中'
                }, {
                    value: '未启用',
                    label: '未启用'
                }],
                verifyOptions: [{
                    value: '已通过',
                    label: '已通过'
                }, {
                    value: '未通过',
                    label: '未通过'
                }],
                tableKey: 0,
                multipleSelection: [],
                delivery: '',
                verify: '',
                gdtuid: '',
                form: {},
                options: {}
            }
        },
        methods: {
            getList() {
                this.listLoading = true;
                document.body.scrollTop = document.documentElement.scrollTop = (document.body.scrollTop || document.documentElement.scrollTop)/2;
                console.log(this.listQuery)
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
            onSubmit() {
                console.log('submit!');
            },
            handleSearch() {
                let { delivery,verify,gdtuid } = this;
                this.listQuery.delivery = delivery;
                this.listQuery.verify = verify;
                this.listQuery.gdtuid = gdtuid;
                this.listQuery.page = 1;
                console.log(this.listQuery);
                this.getList();
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },
            notify(a) {
                const h = this.$createElement;
                this.$notify({
                    title: '提示',
                    message: h('div', null, [
                            h('div', {
                                class: 'tip error-tip',
                            },''),
                            h('div', {
                                class: 'tip-text',
                            },'确定要移除吗？')
                        ]),
                    duration: 2000
                });
            },
            open(a) {
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
            openDetailSlide(val) {
                this.$emit('openDetailSlide',val);
            },
            toggleShowOrHide(dialogName) {
                this.$emit('toggleShowOrHide',dialogName,true);
            }
        }
    }
</script>