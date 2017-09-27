<template>
    <div class="yzt-container-content">
        <el-form ref="form" :model="form">
            <div class="yzt-search-form">
                <el-form-item label="京东ID:" class="yzt-search-form-cell">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="素材标题:" class="yzt-search-form-cell">
                    <el-input v-model="form.materialTitle"></el-input>
                </el-form-item>
                <el-form-item label="广告ID:" class="yzt-search-form-cell">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="广告状态:" class="yzt-search-form-cell">
                    <el-select v-model="form.adStatus" placeholder="请选择">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="暂停" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推广单元状态:" class="yzt-search-form-cell">
                    <el-select v-model="form.productStatus" placeholder="请选择">
                        <el-option label="全部" value="-1"></el-option>
                        <el-option label="有效" value="0"></el-option>
                        <el-option label="临时失效" value="1"></el-option>
                        <el-option label="永久失效" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="yzt-search-form">
                <el-form-item label="审核状态:" class="yzt-search-form-cell">
                    <el-select v-model="form.auditStatus" placeholder="请选择">
                        <el-option label="全部" value="-1"></el-option>
                        <el-option label="未审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核不通过" value="2"></el-option>
                        <el-option label="需要重新审核" value="3"></el-option>
                        <el-option label="系统自动通过" value="4"></el-option>
                        <el-option label="系统不通过" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告类型:" class="yzt-search-form-cell">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投放站点:" class="yzt-search-form-cell">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="素材规格:" class="yzt-search-form-cell">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创意来源:" class="yzt-search-form-cell">
                    <el-select v-model="form.adCreativeWay" placeholder="请选择">
                        <el-option label="全部" value="-1"></el-option>
                        <el-option label="自主上传" value="0"></el-option>
                        <el-option label="一键创意" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="yzt-search-form">
                <el-form-item label="投放时间:" class="yzt-search-form-cell">
                    <el-date-picker
                        v-model="form.insertTime"
                        type="datetimerange"
                        :picker-options="pickerOptions2" placeholder="请选择" align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="修改时间:" class="yzt-search-form-cell">
                    <el-date-picker
                        v-model="form.modTime"
                        type="datetimerange" :picker-options="pickerOptions2" placeholder="请选择" align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="yzt-search-form-cell">
                    <el-button type="primary" @click="handleSearch" class="search-btn">查询</el-button>
                </el-form-item>
            </div>
        </el-form>
        <hr class="yzt-form-hr" />
        <el-form ref="formSearch" :model="form.search" class="yzt-select-form">
            <el-button type="primary" class="download-btn">下载Excel</el-button>
            <el-button type="primary" class="selete-btn">批量审核通过</el-button>
            <el-button type="primary" class="selete-btn">批量审核拒绝</el-button>
            <el-button type="primary" class="selete-btn">QQ号排序<img src="../../assets/imgs/sort.png" class="selete-sort-icon" /></el-button>
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
                type="selection" width="55">
            </el-table-column>
            <el-table-column 
                label="京东ID">
                <template scope="scope">
                    <span>{{scope.row.jdid}}</span>
                </template>
            </el-table-column>
            <el-table-column 
                label="广告信息" width="253px">
                <template scope="scope">
                    <div class="table-admsg">
                        <div class="table-admsg-left">
                            <img :src="scope.row.image" width="100px" height="100px" class="table-produ-img"/>
                        </div>
                        <div class="table-admsg-right">
                            <el-button
                                type="text"
                                size="small">
                                XX时尚鞋风范限时秒杀
                            </el-button>
                            <p>ID: {{ scope.row.adid }}</p>
                            <p>素材描述: {{ scope.row.desc }}</p>
                            <p>
                            [<el-button
                                @click.native.prevent="openDetailSlide(scope.row.adid)"
                                type="text"
                                size="small">
                                查看详情
                            </el-button>] 
                            </p>
                        </div>
                    </div>
                </template>
        </el-table-column>
        <el-table-column label="主推SKU" width="180">
            <template scope="scope">
                <el-popover trigger="hover" placement="right">
                    <img :src="scope.row.image" />
                    <div slot="reference" class="name-wrapper">
                        <img :src="scope.row.image" width="100px" height="100px" class="table-produ-img" />
                    </div>
                </el-popover>
            </template>
            
        </el-table-column>
        <el-table-column
            label="规格信息">
            <template scope="scope">
                <span>{{scope.row.standardInfo}}</span>
            </template>
            </el-table-column>
        <el-table-column
            label="商品信息">
            <template scope="scope">
                <el-button type="text" size="small">
                    查看链接
                </el-button>
            </template>
        </el-table-column>
        <el-table-column
            label="投放时间">
            <template scope="scope">
                <span>{{scope.row.publishTime}}</span>
            </template>
            </el-table-column>
        <el-table-column
            label="修改时间">
            <template scope="scope">
                <span>{{scope.row.changeTime}}</span>
            </template>
            </el-table-column>
        <el-table-column
            label="状态">
            <template scope="scope">
                <span>{{scope.row.state}}</span>
            </template>
            </el-table-column>
        <el-table-column
            label="关键词">
            <template scope="scope">
                <span>{{scope.row.keyword}}</span>
            </template>
            </el-table-column>
        <el-table-column
            label="操作"
            width="200">
            <template scope="scope">
                <el-button v-if="scope.row.isPass=='1'" type="primary" @click="pass()" class="yzt-form-item-btn-one search-btn">
                    审核通过</el-button>
                <el-button v-if="scope.row.isPass=='0'" type="danger" @click="unpass()" class="yzt-form-item-btn-one search-btn">
                    审核不通过</el-button>
            </template>
            </el-table-column>
        </el-table>

        
        <div v-show="!listLoading" class="pagination-container yzt-page">
            <el-pagination @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="listQuery.page"
                :page-sizes="[10,20,30, 50]"
                :page-size="listQuery.limit"
                layout="total, prev, pager, next, sizes, jumper" :total="total">
            </el-pagination>
        </div>
        
        <select-spec></select-spec>
    </div>
</template>

<script>
    import fetch from '../../utils/fetch';
    import selectSpec from './view/select-spec'
    function fetchList(query) {
        console.log(query);
        return fetch({
            url: '/AdsVerifyData/list',
            method: 'get',
            params: query
        });
    }
    export default {
        components: {
            selectSpec: selectSpec
        },
        data() {
            return {
                dialogVisible: true,
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
                specList: [
                    { id: 1, name: '哈哈' },
                    { id: 2, name: '嘿嘿' }
                ],
                options: {},
                form: {
                    adID: '', // 广告ID
                    adStatus: '', // 广告状态
                    adType: '', // 广告类型
                    adCreativeWay: '', // 创意来源
                    auditStatus: '', // 审核状态
                    insertTime: '', // 投放时间
                    jdID: '',   // 京东ID
                    materialTitle: '', // 素材标题
                    modTime: '', // 修改时间
                    productStatus: '',   // 推广单元状态
                    site: '', // 站点信息
                    spec: [] // 规格
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
                if (index % 2 === 0) {
                    return '';
                } else{
                    return 'yzt-table-bg';
                }
            },
            handleSearch() {
                this.listQuery.page = 1;
                console.log(this.listQuery);
                this.getList();
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },
            pass() {
                const h = this.$createElement;
                this.$msgbox({
                    title: '审核通过',
                    message: h('p', null, '亲爱的主人，审核通过数据已提交成功！'),
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: '关闭'
                });
            },
            unpass() {
                this.$emit('toggleShowOrHide', true)  //要显示对话框
            },
            openDetailSlide(val) {
                this.$emit('openDetailSlide', val)
            }
        },
        watch: {
            'form.spec': function(a, b) {
                console.log(this.form.spec)
            }
        }
    }
</script>