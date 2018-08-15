<template>
    <div style="margin: 10px; padding-bottom: 30px;">
      <span id="blur" style="display: none;"></span>
      <Card style="margin-bottom: 10px;">
            <p slot="title">类目匹配表管理</p>
            <div>
                <Form :label-width="80">
                    <Row>
                        <Col span="4">
                            <FormItem label="一级类目:">
                                <Input v-model="formItemClassL1Name" placeholder="请输入一级类目"></Input>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="二级类目:">
                                <Input v-model="formItemClassL2Name" placeholder="请输入二级类目"></Input>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="店铺大类:">
                                <Input v-model="formItemClassShop" placeholder="请输入店铺大类"></Input>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="事业部:">
                                <Input v-model="formItemBusinessShop" placeholder="请输入事业部"></Input>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="状态:">
                                <Select v-model="formItemClassState">
                                    <Option :value='0'>全部</Option>
                                    <Option :value="1">有效</Option>
                                    <Option :value="2">失效</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" style="padding-left: 20px;">
                            <Button type="primary" @click="sreachListData">查询</Button>
                            <Button style="display: inline-block; margin-left: 8px;" type="ghost" @click="exportFile">导出Excel</Button>
                            <span style="display: inline-block;">上传数据 (<a href="//x.360buyimg.com/files/boss/jdzt/jdzt_catetory_upload_template.csv">模板</a>)：</span>
                            <Upload style="display: inline-block;" 
                                    :show-upload-list="false"
                                    :format="['csv']"
                                    :on-success="fileUpSuccess"
                                    :on-error="fileUpError"
                                    :before-upload="beforeUpload"
                                    :on-format-error="fileFormatError"
                                    :action="uploadFileUrl">
                                <Button type="primary" icon="ios-cloud-upload-outline">选择文件</Button>
                            </Upload>
                        </Col>
                    </Row>
                </Form>
                <Modal
                    v-model="visible"
                    title="excel上传错误，错误信息如下"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <p> {{ modalMsg }} </p>
                    <p v-for="(item, index) of errDesc" :key="index">
                        错误行号：【{{item.rowNum}}】,  错误原因：【{{item.retCode | errorM}}】
                    </p>
                </Modal>
            </div>
      </Card>
      <Table :columns="nameColumns"
            :loading="loading"
            :data="listData"></Table>

      <Page :total="total" 
            :page-size="pageSize"
            :current="current"
            show-sizer 
            show-total 
            class="page-foot-fixed" 
            size="small" 
            show-elevator 
            placement="top"
            :page-size-opts="[50, 100, 200]"
            @on-page-size-change="changePagesize"
            @on-change="changePageno"
            ></Page>
    </div>
</template>
<script>
import * as Types from './store/types';
import DelTips from './components/DelTips.vue';
import EditTips from './components/EditTips.vue';
import {
    transTime,
    yztFetch,
    decodeHtml,
    errcodeMap
} from './commons/util.js';

import {
    cgiPrefix,
    cgiName
} from './commons/cgiConst.js';

import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    data () {
        return {
            editForm: {
                input1: '',
                input2: ''
            },
            editFormRule: {
                input1: [
                    { type: 'string', max: 25, message: '长度不能超过25个字', trigger: 'blur' }
                ],
                input2: [
                    { type: 'string', max: 25, message: '长度不能超过25个字', trigger: 'blur' }
                ]
            },
            nameColumns:[
                {
                    title: '一级类目ID',
                    key: 'ClassL1Id'
                }, {
                    title: '一级类目',
                    key: 'ClassL1Name'
                }, {
                    title: '二级类目ID',
                    key: 'ClassL2Id'
                }, {
                    title: '二级类目',
                    key: 'ClassL2Name'
                }, {
                    title: '店铺大类',
                    key: 'ClassShop',
                    render: (h, params) => {
                        return h('div', [
                            h(EditTips, {
                                props: {
                                    row: params.row,
                                    name: 'ClassShop'
                                }
                            })
                        ]);
                    }
                }, {
                    title: '事业部（店铺）',
                    key: 'BusinessShop',
                    render: (h, params) => {
                        return h('div', [
                            h(EditTips, {
                                props: {
                                    row: params.row,
                                    name: 'BusinessShop'
                                }
                            })
                        ]);
                    }
                }, {
                    title: '状态',
                    width: 60,
                    key: 'ClassState'  // ClassState （0-未知，1-有效在用，2-无效待删除）
                }, {
                    title: '操作时间',
                    key: 'ModTime'
                }, {
                    title: '操作人',
                    key: 'ModBy'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    render: (h, params) => {
                        return h('div', [
                            h(DelTips, {
                                props: {
                                    row: params.row
                                }
                            })
                        ]);
                    }
                }
            ],
            
        }
    },
    filters: {
        errorM(retCode) {
            return errcodeMap.autoad[retCode];
        }
    },
    computed: {
        ...mapState([
            'searchCgiParam',
            'modalVisibleId',
            'modalMsg',
            'errDesc',
            'errcodeMap',
            'editModal',
            'total',
            'current',
            'pageSize',
            'listData',
            'loading'
        ]),
        ...mapGetters(['uploadFileUrl']),
        formItemClassL1Name: {
            get () {
                return this.$store.state.formItem.ClassL1Name;
            },
            set (value) {
                this.$store.commit(Types.updateFormItem, {ClassL1Name: value});
            }
        },
        formItemClassL2Name: {
            get () {
                return this.$store.state.formItem.ClassL2Name;
            },
            set (value) {
                this.$store.commit(Types.updateFormItem, {ClassL2Name: value});
            }
        },
        formItemClassShop: {
            get () {
                return this.$store.state.formItem.ClassShop;
            },
            set (value) {
                this.$store.commit(Types.updateFormItem, {ClassShop: value});
            }
        },
        formItemBusinessShop: {
            get () {
                return this.$store.state.formItem.BusinessShop;
            },
            set (value) {
                this.$store.commit(Types.updateFormItem, {BusinessShop: value});
            }
        },
        formItemClassState: {
            get () {
                return this.$store.state.formItem.ClassState;
            },
            set (value) {
                this.$store.commit(Types.updateFormItem, {ClassState: value});
            }
        },
        visible: {
            get () {
                return this.$store.state.visible;
            },
            set (value) {
                this.$store.commit(Types.updateModalVisible, value);
            }
        }
    },
    methods:{
        ...mapActions(['sreachListData', 'changePageno', 'changePagesize', 'getListData', 'fileUpSuccess']),
        ...mapMutations(['exportFile', 'fileFormatError', 'beforeUpload', 'fileUpError', 'ok', 'cancel'])
    },
    created(){
        this.$store.dispatch(Types.getListData);
    }
}
</script>
<style scoped>
.paging{
    float:right;
    margin-top:10px;
}

.page-foot-fixed{
    position: fixed;
    background: #fff;
    padding-bottom: 10px;
    padding-right: 30px;
    margin-top:10px;
    width: 100%;
    text-align: right;
    bottom: 0px;
    right: 0;
}

.ivu-page-options-sizer {
    width: 100px;
}
</style>