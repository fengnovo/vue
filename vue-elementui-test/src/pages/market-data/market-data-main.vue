<template>
    <div class="yzt-container-content">
        <el-form ref="form" :model="form">
            <el-form-item>
                    <el-upload
                        class="upload-div"
                        name="excel"
                        action="//xoa.pp.jd.com/xoa/exp/adspecmarket/addbatchtask"
                        accept="application/*excel"
                        :on-change="handleFileChange"
                        :headers="{'Cache-Control':'max-age=0',Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'}"
                        :file-list="fileList">
                        <el-button size="small" type="primary" class="yzt-form-item-btn download-btn">上传行情数据</el-button>
                        <!-- <div v-if="on-progress" slot="tip" class="el-upload__tip"></div> -->
                    </el-upload>
                    <span>上传行情数据</span>
                    <el-button @click.native.prevent="download()" type="text" size="small">
                        (模版)
                    </el-button>
                    
                    <el-input placeholder="输入规格名称" v-model="listQuery.adSpecName" class="yzt-form-item-btn-one uid-input">
                        <template slot="prepend">规格名称
                        </template>
                </el-input>
                <div class="yzt-form-item">
                    <el-select v-model="listQuery.adBizId" placeholder="全部产品类型" class="yzt-form-item-sel">
                        <el-option
                            v-for="adBizId in adBizIds"
                            :key="adBizId.value"
                            :label="adBizId.label"
                            :value="adBizId.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        v-model="marketTime"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="marketTimePickerOptions"
                        class="yzt-form-item-sel">
                    </el-date-picker>
                </div>
                <el-button type="primary" 
                        class="yzt-form-item-btn-one search-btn"
                        @click="handleSearch()">查询</el-button>
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
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="45">
            </el-table-column>
            <el-table-column
                label="规格ID">
                <template scope="scope">
                    <span>{{scope.row.adSpecId}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="规格名称"
                width="300">
                <template scope="scope">
                    <span>{{scope.row.adSpecName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="曝光量级"
                width="120">
                <template scope="scope">
                    <span>{{scope.row.exposureType}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="点击单价(元)"
                width="120">
                <template scope="scope">
                    <span>{{scope.row.clickPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="最高出价"
                width="120">
                <template scope="scope">
                    <span>{{scope.row.maxClickPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="点击率(%)"
                width="120">
                <template scope="scope">
                    <span>{{scope.row.clickRate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="ECPM(元)"
                width="120">
                <template scope="scope">
                    <span>{{scope.row.ECPM}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作时间">
                <template scope="scope">
                    <span>{{transTime(scope.row.marketLastmodTimeMs)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作人">
                <template scope="scope">
                    <span>{{scope.row.marketModifyBy}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="250">
                <template scope="scope">
                    <el-button @click.native.prevent="openDetailSlide(scope.row)" type="text" size="small">
                        查看详情
                    </el-button>
                    <el-button @click.native.prevent="openEditorSlide(scope.row)" type="text" size="small">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-show="!listLoading" class="pagination-container yzt-page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, prev, pager, next, sizes, jumper" :total="total">
            </el-pagination>
        </div>

      </div>
</template>

<script>
    import { transTime } from '../../common/util';
    import { cgi } from '../../common/config.cgi';
    import { fetchList } from './service.marketData';

    export default {
        data() {
            return {
                form: {},
                marketTime: '',
                list: [],
                total: 0,
                fileList: [],
                listLoading: true,
                listQuery: {
                    pageNo: 1,
                    pageSize: 10,
                    adBizId: 0, 
                    adSpecName: '', 
                    marketBeginTime: '',
                    marketEndTime: ''
                },
                tableKey: 0,
                multipleSelection: [],
                adBizIds: [{
                    value: 0,
                    label: '全部'
                },{
                    value: 1,
                    label: '腾讯社交资源'
                },{
                    value: 2,
                    label: '其他资源'
                },{
                    value: 3,
                    label: '腾讯媒体资源'
                },{
                    value: 4,
                    label: '百度媒体资源'
                }],
                marketTimePickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                adSpecName: ''
            }
        },
        methods: {
            transTime,
            getList() {
                this.listLoading = true;
                document.body.scrollTop = document.documentElement.scrollTop = (document.body.scrollTop || document.documentElement.scrollTop)/2;
                // console.log(this.listQuery)
                fetchList(this.listQuery).then(response => {
                    if(response.errcode != "0"){
                        const h = this.$createElement;
                        this.$notify({
                            title: '提示',
                            message: h('div', null, [
                                    h('div', {
                                        class: 'tip error-tip',
                                    },''),
                                    h('div', {
                                        class: 'tip-text',
                                    },'请求出错！')
                                ]),
                            duration: 2000
                        });
                    }
                    let data = response.data;
                    this.list = data.list;
                    console.log(this.list);
                    this.total = +data.total;
                    this.listLoading = false;
                    this.$nextTick(()=>{
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                    })
                })
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList(this.listQuery);
            },
            handleCurrentChange(val) {
                this.listQuery.pageNo = val;
                this.getList(this.listQuery);
            },
            tableRowClassName(row, index) {
                if (index%2 === 0) {
                    return '';
                } else{
                    return 'yzt-table-bg';
                }
            },
            handleSearch() {
                if(this.marketTime.length > 0){
                    // console.log(this.marketTime)
                    this.listQuery.marketBeginTime = transTime(this.marketTime[0]);
                    this.listQuery.marketEndTime = transTime(this.marketTime[1]);
                }
                this.listQuery.pageNo = 1;
                console.log(this.listQuery);
                this.getList(this.listQuery);
            },
            handleSelectionChange(val) {
                // console.log(val)
                this.multipleSelection = val;
            },
            download(a) {
                window.location.href = cgi.mddownload;
            },
            handleFileChange(file, fileList) {
                console.log(fileList);
                console.log(file);
                this.fileList = fileList.slice(-1);
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
                console.log(val);
                this.$emit('openDetailSlide',val);
            },
            openEditorSlide(val) {
                console.log(val);
                this.$emit('openEditorSlide',val);
            } 
        }
    }
</script>