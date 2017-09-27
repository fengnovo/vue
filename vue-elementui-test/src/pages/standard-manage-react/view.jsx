/**
 * Created by chenjiawei1 on 2017/1/11.
 */
import React, { Component } from 'react';
import {
    CreativeEleListContainer,
    SpecPaginationContainer,
    SpecListContainer,
    SBoxContainer,
    EditModalContainer,
    CreativeStoryContainer,
    CtrBarContainer,
    CreativeCreateContainer
} from './container.jsx';
import {
    searchParam,
    initialPagination,
    cgiMap,
    cgiConst,
    creativeTypeEnum
} from './const.jsx';

import { dataConst, dataEnum } from './config.const.js';
import {
    Popconfirm,
    Popover,
    Pagination,
    Icon,
    Input,
    Row,
    Col,
    Form,
    Select,
    Table,
    Button,
    Radio,
    Modal,
    Checkbox,
    Upload,
    Card,
    Switch
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;
import Animate from 'rc-animate';

import {
    renderChild,
    fromTimestamp,
    parseRelationData,
    decodeBitData,
    typeIs,
    decodeSiteSet,
    getNameById,
    decodeHTML,
    encodeSiteSet,
    validMin,
    validMax,
    validSpecChar,
    flatArr,
    uniqueId,
    getDataMapChild,
    getAntdFormDataValue,
    handleUploadChange
} from 'util.helper';
import {filterCurCreative} from './helper.js';
import DateRange from './react.dateRange.jsx';


const validRange = (rule, value, cb) => {
    if (typeIs(rule.min) !== 'undefined' && +value < +rule.min) {
        return cb(rule.message || '请输入正确的值');
    }
    if (typeIs(rule.max) !== 'undefined' && +value > +rule.max) {
        return cb(rule.message || '请输入正确的值');
    }
    cb();
}
// 搜索栏: 这里不用redux，状态完全在内部维护
class SearchBox extends Component {
    getFieldValue = this.props.form.getFieldValue
    // 组件内部的私有状态在组件内部消化即可，无需丢到store里
    getSubBizOpts = () => {
        const adBizId = +this.getFieldValue(cgiConst.BIZ_ID);
        if (adBizId === 0) {
            return [];
        }
        return renderChild(getDataMapChild(dataEnum.bizTypeMap, adBizId), Option);
    }

    getSiteOpts = () => {
        const adBizId = +this.getFieldValue(cgiConst.BIZ_ID);
        const adSubBizId = +this.getFieldValue(cgiConst.SUB_BIZ_ID);
        if (adSubBizId === 0) {
            return [];
        }
        const siteArr = getDataMapChild(getDataMapChild(dataEnum.bizTypeMap, adBizId), adSubBizId);
        return renderChild(siteArr, Option);
    }
    
    getCrtSizeOpts = () => {
        const adBizId = +this.getFieldValue(cgiConst.BIZ_ID);
        const adSubBizId = +this.getFieldValue(cgiConst.SUB_BIZ_ID);

        if (adBizId === 0 || adSubBizId === 0) {
            return [];
        } else {
            return renderChild(this.props.crtSizeList, Option);;
        }
    }

    handleBizIdChange = id => {
        this.props.form.resetFields([cgiConst.SUB_BIZ_ID, cgiConst.SITE_SET, cgiConst.CRT_SIZE]);
    }
    
    handleSubBizIdChange = id => {
        this.props.form.resetFields([cgiConst.SITE_SET, cgiConst.CRT_SIZE]);
        const adBizId = +this.getFieldValue(cgiConst.BIZ_ID);
        this.props.onGetCrtSize({
            adBizId: adBizId,
            subAdBizId: id
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    componentDidMount = () => {
        this.handleSearch();
    }
    handleSearch = () => {
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            }
            /* 对表单数据进行处理 */
            let params = Object.assign(searchParam, values, {
                pageNo: 1,
                beginTime: values.beginTime ? fromTimestamp(values.beginTime.valueOf(), 'yyyy-MM-dd HH:mm:ss') : '',
                endTime: values.endTime ? fromTimestamp(values.endTime.valueOf(), 'yyyy-MM-dd HH:mm:ss') : ''
            });
            this.props.onSearch(params);
        });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        };
        const colLayout = {
            xs: 12,
            sm: 8,
            md: 6,
            lg: 6,
            className: 'search-col'
        };
        const lgColLayout = {
            xs: 24,
            sm: 8,
            md: 6,
            lg: 6,
            className: 'search-col'
        };
        const fieldLayout = {
            style: { width: 130 }
        };
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form
                layout="horizontal"
                className="searchForm">
                <Row>
                    <Col {...colLayout} >
                        <FormItem
                            {...formItemLayout}
                            label="规格ID："
                        >
                            {getFieldDecorator(cgiConst.SPEC_ID, {
                                initialValue: ''
                            })(
                                <Input type="text"
                                       {...fieldLayout}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...colLayout} >
                        <FormItem
                            {...formItemLayout}
                            label="规格名称："
                        >
                            {getFieldDecorator(cgiConst.SPEC_NAME, {
                                initialValue: ''
                            })(
                                <Input type="text"
                                       {...fieldLayout}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...colLayout} >
                        <FormItem
                            {...formItemLayout}
                            label="产品类型："
                        >
                            {getFieldDecorator(cgiConst.BIZ_ID, {
                                initialValue: '1',
                                onChange: this.handleBizIdChange
                            })(
                                <Select
                                    {...fieldLayout}
                                >
                                    {/* <Option value="0">全部</Option> */}
                                    {renderChild(dataEnum.bizTypeMap, Option)}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...colLayout} >
                        <FormItem
                            {...formItemLayout}
                            label="子产品类型：">
                            {getFieldDecorator(cgiConst.SUB_BIZ_ID, {
                                initialValue: '0',
                                onChange: this.handleSubBizIdChange
                            })(
                                <Select
                                    {...fieldLayout}
                                >
                                    <Option value="0">全部</Option>
                                    {this.getSubBizOpts()}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...colLayout} >
                    	<FormItem
                            {...formItemLayout}
                            label="投放站点：">
                            {getFieldDecorator(cgiConst.SITE_SET, {
                                initialValue: '0'
                            })(
                                <Select
                                    {...fieldLayout}
                                >
                                    <Option value="0">全部</Option>
                                    {this.getSiteOpts()}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col {...colLayout} >
                        <FormItem
                            {...formItemLayout}
                            label="规格ID同步：">
                            {getFieldDecorator(cgiConst.CRT_SIZE, {
                                initialValue: '0'
                            })(
                                <Select
                                    {...fieldLayout}
                                >
                                    <Option value="0">全部</Option>
                                    {this.getCrtSizeOpts()}
                                </Select>
                            )}
                        </FormItem>
                    </Col> */}
                    <Col {...colLayout} >
                        <FormItem
                            {...formItemLayout}
                            label="出价方式：">
                            {getFieldDecorator(cgiConst.BID_TYPE, {
                                initialValue: '0'
                            })(
                                <Select
                                    {...fieldLayout}
                                >
                                    <Option value="0">全部</Option>
                                    {renderChild(dataEnum.chargeTypeEnum, Option)}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col {...colLayout} >
                        <SelectField
                            formItemLayout={formItemLayout}
                            fieldLayout={fieldLayout}
                            name={cgiConst.AUTO_TYPE}
                            label="自动化投放规格："
                            form={form}
                        />
                    </Col>
                    <Col {...colLayout} >
                        <SelectField
                            formItemLayout={formItemLayout}
                            fieldLayout={fieldLayout}
                            name={cgiConst.APPJUMP}
                            label="支持应用直达："
                            form={form}
                        />
                    </Col>
                    <Col {...colLayout} >
                        <SelectField
                            formItemLayout={formItemLayout}
                            fieldLayout={fieldLayout}
                            name={cgiConst.WEIXINJUMP}
                            label="支持微信直达："
                            form={form}
                        />
                    </Col>
                    <Col {...colLayout} >
                        <SelectField
                            formItemLayout={formItemLayout}
                            fieldLayout={fieldLayout}
                            name={cgiConst.ONE_KEY_CREATIVE}
                            label="支持一键创意："
                            form={form}
                        />
                    </Col>
                    <Col {...colLayout} >
                        <SelectField
                            formItemLayout={formItemLayout}
                            fieldLayout={fieldLayout}
                            name={cgiConst.LIMIT}
                            label="权限控制："
                            form={form}
                            childData={dataEnum.isAuth}
                        />
                    </Col> */}
                    <Col {...lgColLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="操作时间：">
                            <DateRange
                                form={form}
                                startProps={{
                                    name: 'beginTime',
                                    initialValue: null,
                                    format: 'YYYY/MM/DD HH:mm:ss',
                                    style: { width: 150 },
                                    size: 'large'
                                }}
                                endProps={{
                                    name: 'endTime',
                                    initialValue: null,
                                    format: 'YYYY/MM/DD HH:mm:ss',
                                    style: { width: 150 },
                                    size: 'large'
                                }}
                                rangeProps={{ style: { width: 350 } }}
                            />
                        </FormItem>
                    </Col>

                    <Col lg={24} md={24} sm={24} xs={24} style={{ textAlign: 'center' }}>
                        <Button type="dashed" onClick={this.handleReset}>重置</Button>
                        <Button type="primary" onClick={this.handleSearch}>搜索</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
export const FSearchBox = Form.create()(SearchBox);

// 列表
export class SpecList extends Component {
    decodeProperty(propertyEnum, bit) {
        return (propertyEnum & bit) !== 0 ? '是' : '否';
    }
    componentDidMount = () => {
        // this.props.onGetBlackWorldList();
    }

    getColumns() {
        const columns = [{
            title: '规格ID',
            dataIndex: cgiConst.SPEC_ID,
            key: cgiConst.SPEC_ID
        }, {
            title: '规格名称',
            dataIndex: cgiConst.SPEC_NAME,
            key: cgiConst.SPEC_NAME,
        }, {
            title: '产品类型',
            dataIndex: cgiConst.BIZ_ID,
            key: cgiConst.BIZ_ID,
            render: type => getNameById(type, dataEnum.bizTypeMap)
        }, {
            title: '子产品类型',
            dataIndex: cgiConst.SUB_BIZ_ID,
            key: cgiConst.SUB_BIZ_ID,
            render: type => {
                // console.log(type);
                // debugger
                // console.log(flatArr);
                // console.log(getNameById)
                // getNameById(type, flatArr(dataEnum.bizTypeMap.map(i => {
                //     console.log(i.child)
                //     return i.child
                // } )))

                // debugger
                return getNameById(type, flatArr(dataEnum.bizTypeMap.map(i => i.child)));
            }
        }, {
            title: '投放站点',
            dataIndex: cgiConst.SITE_SET,
            key: cgiConst.SITE_SET,
            render: (site, record) => decodeSiteSet(site, getDataMapChild(dataEnum.bizTypeMap, record.adBizId, record.subAdBizId), 'name').join('、')
        // },  {
        //     title: '规格ID同步',
        //     dataIndex: cgiConst.CRT_SIZE,
        //     key: cgiConst.CRT_SIZE
        // }, {
        //     title: '支持应用直达',
        //     dataIndex: cgiConst.SPEC_PROPERTY,
        //     key: cgiConst.SPEC_PROPERTY+2,
        //     render: property => this.decodeProperty(dataConst.APPJUMP, property)
        // }, {
        //     title: '支持微信直达',
        //     dataIndex: cgiConst.SPEC_PROPERTY,
        //     key: cgiConst.SPEC_PROPERTY+4,
        //     render: property => this.decodeProperty(dataConst.WECHATJUMP, property)
        // }, {
        //     title: '支持一键创意',
        //     dataIndex: cgiConst.SPEC_PROPERTY,
        //     key: cgiConst.SPEC_PROPERTY+8,
        //     render: property => this.decodeProperty(dataConst.AUTOCREATIVE, property)
        // }, {
        //     title: '权限控制',
        //     dataIndex: cgiConst.LIMIT,
        //     key: cgiConst.LIMIT,
        //     render: type => getNameById(type, dataEnum.isOrNot)
        }, {
            title: '操作时间',
            dataIndex: cgiConst.LAST_MOD_TIME_SHOW,
            key: cgiConst.LAST_MOD_TIME_SHOW
        }, {
            title: '操作人',
            dataIndex: cgiConst.MOD_BY,
            key: cgiConst.MOD_BY
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Popover content={<SpecDetail data={record}/>}
                             trigger="click"
                             arrowPointAtCenter={false}
                             placement="left">
                        <a href="javascript:;">详情</a>
                    </Popover>
                    <span className="ant-divider"></span>
                    <a href="javascript:;" onClick={() => {
                        this.props.onOpenEditModal(record);
                    }}>编辑</a>
                    <span className="ant-divider"></span>
                    <Popconfirm title={<span>是否确定删除？</span>}
                                placement="top"
                                onConfirm={() => {
                                    this.props.onDelete(record);
                                }}
                    >
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                </div>
            )
        }];
        return columns;
    }

    render() {
        return (
            <Table columns={this.getColumns()}
                   dataSource={this.props.specList}
                   pagination={false}
                   loading={this.props.loading}
                   size="small"
                   style={{ marginBottom: '70px' }}
            />
        );
    }
}

// 详情
class SpecDetail extends Component {
    decodeProperty(propertyEnum, bit) {
        return (propertyEnum & bit) !== 0 ? '是' : '否';
    }

    decodeChargeType(type) {
        return decodeBitData(type, dataEnum.chargeTypeEnum, 'name').join(' | ');
    }

    getCreativeCount(data) {
        if (!data.oCreativeTemplate) {
            return 0;
        }
        const { text, images, enums, urls } = data.oCreativeTemplate;
        return (text ? text.length : 0)
               + (images ? images.length : 0)
               + (enums ? enums.length : 0)
               + (urls ? urls.length : 0)
    }

    getCreativeEnums(data) {
        if (!data.oCreativeTemplate) {
            return false;
        }
        const { enums } = data.oCreativeTemplate;
        return !!enums && !!enums.length;
    }

    getCreativeStoryCount(data) {
        if (!data.oCreativeTemplate) {
            return 0;
        }
        const { element_story } = data.oCreativeTemplate;
        return {
            isStory: !!element_story,
            min: element_story ? element_story.min_occurs : 0,
            max: element_story ? element_story.max_occurs : 0
        };
    }

    formatInfoData = (record) => {
        return Object.assign({}, record, {
            bizName: getNameById(record.adBizId, dataEnum.bizTypeMap),
            subBizName: getNameById(record.subAdBizId, getDataMapChild(dataEnum.bizTypeMap, record.adBizId)),
            isAppJump: this.decodeProperty(dataConst.APPJUMP, record.adSpecProperty),
            isWechatJump: this.decodeProperty(dataConst.WECHATJUMP, record.adSpecProperty),
            isAutocreative: this.decodeProperty(dataConst.AUTOCREATIVE, record.adSpecProperty),
            isAutoType: getNameById(record.autoType, dataEnum.isOrNot),
            isLimit: getNameById(record.adSpecLimit, dataEnum.isOrNot),
            lastModTime: fromTimestamp(record.lastModTimeMs * 1000, 'yyyy/MM/dd HH:mm:ss'),
            insertTime: fromTimestamp(record.insertTimeMs * 1000, 'yyyy/MM/dd HH:mm:ss'),
            siteset: decodeSiteSet(record.adSiteSet, getDataMapChild(dataEnum.bizTypeMap, record.adBizId, record.subAdBizId), 'name').join('、'),
            chargeType: this.decodeChargeType(record.adBidType),
            platform: getNameById(record.showPlatform, dataEnum.showPlatFormEnum),
            creativeCount: this.getCreativeCount(record),
            creativeStory: this.getCreativeStoryCount(record),
            isSortable: this.getCreativeEnums(record) ? '是' : '否',
            auditType: getNameById(record.auditType, dataEnum.auditTypeEnum),
            productType: decodeBitData(record.productType, dataEnum.operProductTypeEnum, 'name').join('、'),
        });
    }

    render() {
        const {
            adSpecId, adSpecName, modifyBy, lastModTime, insertTime, bizName, adBizId,
            subBizName, isLimit, isAutoType, isAppJump, isWechatJump,
            isAutocreative, siteset, chargeType, platform, adCrtSize, examplePreviewImgUrl1,
            examplePreviewImgUrl2, creativeCount, isSortable, creativeStory, auditType, productType,
            dwCreativeMainTextMaxLimit, dwCreativeMainTextMinLimit, dwCreativeSubTextMaxLimit,
            dwCreativeSubTextMinLimit//,textBlackWorld, imageBlackWorld
        } = this.formatInfoData(this.props.data);
        return (
            <div className="msg-wrap">
                <p>
                    <span className="msg-label">规格ID：</span>
                    <span className="msg-des">{adSpecId}</span>
                </p>
                <p>
                    <span className="msg-label">规格名称：</span>
                    <span className="msg-des">{adSpecName}</span>
                </p>
                <p>
                    <span className="msg-label">产品类型：</span>
                    <span className="msg-des">{bizName}</span>
                </p>
                <p>
                    <span className="msg-label">子产品类型：</span>
                    <span className="msg-des">{subBizName}</span>
                </p>
                <p>
                    <span className="msg-label">投放站点：</span>
                    <span className="msg-des">{siteset}</span>
                </p>
                <p>
                    <span className="msg-label">扣费类型：</span>
                    <span className="msg-des">{chargeType}</span>
                </p>
                <p>
                    <span className="msg-label">素材个数：</span>
                    <span className="msg-des">{creativeCount}</span>
                </p>
                {adBizId == dataConst.GDT ? <div>
                    <p>
                        <span className="msg-label">是否有素材集合：</span>
                        <span className="msg-des">{creativeStory.isStory ? '是' : '否'}</span>
                    </p>
                    {creativeStory.isStory ? <p>
                        <span className="msg-label">子素材个数：</span>
                        <span className="msg-des">{creativeStory.min}~{creativeStory.max}</span>
                    </p>
                        : null}
                    <p>
                        <span className="msg-label">是否传入sortable：</span>
                        <span className="msg-des">{isSortable}</span>
                    </p>
                </div>
                    : null }
                <p>
                    <span className="msg-label">大预览图：</span>
                    <span className="msg-des"><img src={examplePreviewImgUrl1}/></span>
                </p>
                <p>
                    <span className="msg-label">小预览图：</span>
                    <span className="msg-des"><img src={examplePreviewImgUrl2}/></span>
                </p>
                <p>
                    <span className="msg-label">外部规格ID：</span>
                    <span className="msg-des">{+adCrtSize || '无'}</span>
                </p>
                <p>
                    <span className="msg-label">权限控制：</span>
                    <span className="msg-des">{isLimit}</span>
                </p>
                <p>
                    <span className="msg-label">投放平台：</span>
                    <span className="msg-des">{platform}</span>
                </p>
                <p>
                    <span className="msg-label">审核规则：</span>
                    <span className="msg-des">{auditType}</span>
                </p>
                {adBizId == dataConst.GDT ? <div>

                    <p>
                        <span className="msg-label">上线产品：</span>
                        <span className="msg-des">{productType}</span>
                    </p>
                    {/* <p>
                        <span className="msg-label">自动化投放规格：</span>
                        <span className="msg-des">{isAutoType}</span>
                    </p>
                    <p>
                        <span className="msg-label">支持一键创意：</span>
                        <span className="msg-des">{isAutocreative}</span>
                    </p> */}
                    {isAutocreative === '是' ? <div>
                        <p>
                            <span className="msg-label">主文案长度：</span>
                            <span
                                className="msg-des">{`${dwCreativeMainTextMinLimit}~${dwCreativeMainTextMaxLimit}`}</span>
                        </p>
                        <p>
                            <span className="msg-label">副文案长度：</span>
                            <span
                                className="msg-des">{`${dwCreativeSubTextMinLimit}~${dwCreativeSubTextMaxLimit}`}</span>
                        </p>
                    </div>
                        : null}
                </div>
                    : null}

                {/* {(adBizId == dataConst.GDT || adBizId == dataConst.OMG) ? <div>
                    <p>
                        <span className="msg-label">支持应用直达：</span>
                        <span className="msg-des">{isAppJump}</span>
                    </p>
                    <p>
                        <span className="msg-label">支持微信直达：</span>
                        <span className="msg-des">{isWechatJump}</span>
                    </p>
                </div> : null }
                <p>
                    <span className="msg-label">黑词库-标题&描述：</span>
                    <span className="msg-des">{textBlackWorld}</span>
                </p>
                <p>
                    <span className="msg-label">黑词库-素材文案：</span>
                    <span className="msg-des">{imageBlackWorld}</span>
                </p> */}
                <p>
                    <span className="msg-label">创建时间：</span>
                    <span className="msg-des">{insertTime}</span>
                </p>
                <p>
                    <span className="msg-label">操作时间：</span>
                    <span className="msg-des">{lastModTime}</span>
                </p>
                <p>
                    <span className="msg-label">操作人：</span>
                    <span className="msg-des">{modifyBy}</span>
                </p>
            </div>
        );
    }
}

// step1 创建一个纯组件，不维护state。事件和数据都通过props获得。
export const SpecPagination = (props) => {
    const { current, total, PageSize, onChangePage, } = props;
    const pagination = Object.assign({}, initialPagination, {
        total,
        PageSize,
        current,
        onChange: onChangePage,
        onShowSizeChange: onChangePage
    });
    return (
        <div className="affix-pagination">
            <Pagination
                {...pagination}
                style={{ float: 'right', display: total > 0 ? 'block' : 'none' }}/>
        </div>
    );
}

// 添加、编辑modal
class SpecEditModal extends Component {
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    }
    uploadProps = {
        name: 'Filedata',
        action: cgiMap.uploadImg,
        multiple: false,
        listType: 'picture',
        accept: 'image/jpg,image/jpeg,image/png,image/gif',
        errcode: 'result',
        errmsg: 'msg',
        resurl: 'data'
    }

    handleAdBizIdChange = (e) => {
        const subBizData = getDataMapChild(dataEnum.bizTypeMap, e.target.value);
        this.props.onInfoChange({
            data: {
                [cgiConst.SUB_BIZ_ID]: { value: subBizData[0]['id'] },
                [cgiConst.AD_SITE]: { value: [] }
            }
        });
    }

    handleOk = () => {
        let validStatus = true;
        // 外层非素材部分的校验
        this.props.form.validateFieldsAndScroll((err) => {
            if (err) {
                validStatus = false;
            }
        });
        if (!validStatus) {
            return false;
        }
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.onOk(fieldsValue);
    }

    isGDT = () => {
        return +getAntdFormDataValue(cgiConst.BIZ_ID, this.props.data) === +dataConst.GDT;
    }

    isToutiao = () => {
        return +getAntdFormDataValue(cgiConst.BIZ_ID, this.props.data) === +dataConst.JRTT;
    }
    isOMG = () => {
        return +getAntdFormDataValue(cgiConst.BIZ_ID, this.props.data) === +dataConst.OMG;
    }
    isBaidu = () => {
        return +getAntdFormDataValue(cgiConst.BIZ_ID, this.props.data) === +dataConst.BAIDU;
    }

    getSpecIdField = () => {
        let { data, form } = this.props;
        if (this.isGDT()) {
            return <GDTSpecIdField
                data={data}
                form={form}
            />
        }

        if (this.isToutiao()) {
            return <ToutiaoSpecId
                data={data}
                form={form}
            />
        }

        if (this.isOMG()) {
            return <OMGSpecId
                data={data}
                form={form}
            />
        }
        
        if (this.isBaidu()) {
            return <BaiduSpecId
                data={data}
                form={form}
            />
        }
    }

    // 是否支持自动化投放：gdt + 投放工具
    isAutoType = () => {
        const { data } = this.props;
        const productType = getAntdFormDataValue(cgiConst.PRODUCT_TYPE, data) || [];
        return this.isGDT() && productType.indexOf(dataConst.OPERAD) !== -1;
    }

    // 直达：gdt/omg
    isJump = () => {
        return this.isGDT() || this.isOMG();
    }

    // 一键创意：gdt + jdzt
    isAutoCreative = () => {
        const { data } = this.props;
        const productType = getAntdFormDataValue(cgiConst.PRODUCT_TYPE, data) || [];
        return this.isGDT() && productType.indexOf(dataConst.JDZT) !== -1;
    }

    checkDirty = (name) => {
        return this.props.form.getFieldError(name);
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps !== this.props);
    }

    render() {
        let { form, modalVisible, isEdit, onCancel, data, onInfoChange } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal title={`${isEdit ? '编辑' : '新增'}规格`}
                   visible={modalVisible}
                   width={700}
                   onOk={this.handleOk}
                   onCancel={onCancel}
                   style={{ top: 10 }}
            >
                <Form>
                    <FormItem
                        {...this.formItemLayout}
                        label="规格id"
                        className="hidden"
                    >
                        {getFieldDecorator(cgiConst.SPEC_ID)(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="产品类型"
                    >
                        {getFieldDecorator(cgiConst.BIZ_ID, {
                            onChange: this.handleAdBizIdChange
                        })(
                            <RadioGroup>
                                {renderChild(dataEnum.bizTypeMap, RadioButton)}
                            </RadioGroup>
                        )}
                    </FormItem>
                    <SubBizField
                        onInfoChange={onInfoChange}
                        data={data}
                        formItemLayout={this.formItemLayout}
                        form={form}
                    />
                    <SiteField
                        data={data}
                        formItemLayout={this.formItemLayout}
                        form={form}
                    />
                    <CreativeEleListContainer
                        formItemLayout={this.formItemLayout}
                        bizId={getAntdFormDataValue(cgiConst.BIZ_ID, this.props.data)}
                    />
                    {this.isGDT()
                        ? <CreativeStoryContainer
                         formItemLayout={this.formItemLayout}
                     />
                        : null
                    }
                    <FormItem
                        {...this.formItemLayout}
                        label="示例图"
                        required={true}
                    >
                        <UploadImageField
                            label="大图"
                            name={cgiConst.SEXAMPLEURL1}
                            data={data}
                            form={form}
                            required={true}
                            uploadProps={this.uploadProps}
                        />
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label=" "
                        colon={false}
                    >
                        <UploadImageField
                            label="小图"
                            name={cgiConst.SEXAMPLEURL2}
                            data={data}
                            form={form}
                            required={true}
                            uploadProps={this.uploadProps}
                        />
                    </FormItem>

                    <AdspecNameField
                        data={data}
                        form={form}
                        formItemLayout={this.formItemLayout}
                    />

                    <FormItem
                        {...this.formItemLayout}
                        label="规格ID同步"
                        required={true}
                    >
                        {this.getSpecIdField()}
                    </FormItem>

                    <PriceField
                        data={data}
                        form={form}
                        formItemLayout={this.formItemLayout}
                    />

                    <RadioField
                        label="投放平台"
                        name={cgiConst.PLATFORM}
                        childData={dataEnum.showPlatFormEnum}
                        data={data}
                        form={form}
                        formItemLayout={this.formItemLayout}
                    />

                    <RadioField
                        label="审核规则"
                        name={cgiConst.AUDIT_TYPE}
                        childData={dataEnum.auditTypeEnum}
                        initialValue={dataConst.AUDIT_FIRST}
                        data={data}
                        form={form}
                        formItemLayout={this.formItemLayout}
                    />

                    {/* <Animate transitionName="fade">
                    {this.isGDT()
                        ? <ProductTypeField
                         data={data}
                         form={form}
                         formItemLayout={this.formItemLayout}
                     />
                        : null}
                    </Animate> 

                    <Animate transitionName="fade">
                    {this.isAutoType()
                        ? <RadioField
                         label="自动化投放规格"
                         name={cgiConst.AUTO_TYPE}
                         data={data}
                         form={form}
                         formItemLayout={this.formItemLayout}
                     /> : null}
                    </Animate>

                    <Animate transitionName="fade">
                    {this.isJump()
                        ? <div>
                         <RadioField
                             label="支持应用直达"
                             name={cgiConst.APPJUMP}
                             data={data}
                             form={form}
                             formItemLayout={this.formItemLayout}
                         />
                         <RadioField
                             label="支持微信直达"
                             name={cgiConst.WEIXINJUMP}
                             data={data}
                             form={form}
                             formItemLayout={this.formItemLayout}
                         />
                     </div>
                        : null}
                    </Animate>

                    <Animate transitionName="fade">
                    {this.isAutoCreative()
                        ? <AutoCreativeField
                         data={data}
                         form={form}
                         formItemLayout={this.formItemLayout}
                         checkDirty={this.checkDirty}
                     />
                        : null}
                    </Animate>

                    <RadioField
                        label="是否权限控制"
                        name={cgiConst.LIMIT}
                        data={data}
                        form={form}
                        formItemLayout={this.formItemLayout}
                    />
                    <BlackWorldField
                        worldList={blackWorldList ? blackWorldList.filter((item)=> item.type === '1') : []}
                        data={data}
                        formItemLayout={this.formItemLayout}
                        form={form}
                        labelName="黑词库-标题&描述"
                        fieldName={cgiConst.BLACK_WORLD_TITLE}
                    />
                    <BlackWorldField
                        worldList={blackWorldList ? blackWorldList.filter((item)=> item.type === '2') : []}
                        data={data}
                        formItemLayout={this.formItemLayout}
                        form={form}
                        labelName="黑词库-素材文案"
                        fieldName={cgiConst.BLACK_WORLD_METARIAL}
                    /> */}
                </Form>
            </Modal>
        );
    }
}
export const FSpecEditModal = Form.create({
    onFieldsChange: (props, changedFields) => {
        props.onInfoChange({
            data: changedFields
        });
    },
    mapPropsToFields: (props) => {
        return {
            ...props.data
        }
    }
})(SpecEditModal);

// 文字链组件
const FShareTextCreative = Form.create({
    onFieldsChange: (props, changedFields) => {
        props.onInfoChange({
            type: props.type || dataConst.CREATIVE_TYPE_TEXT,
            name: props.name,
            id: props.data.id,
            data: changedFields
        });
    },
    mapPropsToFields: (props) => {
        return {
            ...props.data
        }
    }
})(
    (props) => {
        const { required, form, formItemLayout, label, unit, name, data } = props;
        const { getFieldDecorator, getFieldValue, getFieldError, isFieldTouched, validateFields } = form;

        function checkDirty(name) {
            return getFieldError(name);
        }

        let minName = props.minName || 'min_length';
        let maxName = props.maxName || 'max_length';
        let cfg = creativeTypeEnum.filter(i => i.name === name);
        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    style={{ lineHeight: 1.5 }}
                    label={label || '文本长度'}
                    required={required}
                >
                    <InputGroup>
                        <Col span="6">
                            <FormItem>
                                {getFieldDecorator(minName, {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        validator: (rule, value, cb) => {
                                            if (validMin({
                                                    equal: true,
                                                    required,
                                                    compareValue: getFieldValue(maxName),
                                                    value,
                                                    cb
                                                })) {
                                                if (checkDirty(maxName)) {
                                                    validateFields([maxName], { force: true });
                                                }
                                                if (data['default']) {
                                                    validateFields(['default'], { force: true });
                                                }
                                            }
                                        }
                                    }]
                                })(
                                    <Input type="number"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span="2">
                            <p className="ant-form-split">-</p>
                        </Col>
                        <Col span="6">
                            <FormItem>
                                {getFieldDecorator(maxName, {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        validator: (rule, value, cb) => {
                                            if (validMax({
                                                    equal: true,
                                                    required,
                                                    compareValue: getFieldValue(minName),
                                                    value,
                                                    cb
                                                })) {
                                                if (checkDirty(minName)) {
                                                    validateFields([minName], { force: true });
                                                }
                                                if (data['default']) {
                                                    validateFields(['default'], { force: true });
                                                }
                                            }
                                        }
                                    }]
                                })(
                                    <Input type="number"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <p className="ant-form-split">{unit || '字数'}</p>
                        </Col>
                    </InputGroup>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={'文案'}
                    required={required}
                >
                    {getFieldDecorator('default', {
                        rules: [
                            {
                                required: true,
                                type: 'string',
                                min: +getFieldValue(minName) || 0,
                                max: +getFieldValue(maxName) || 0,
                                message: `${cfg[0] ? cfg[0]['alias'] : '文案'}长度不正确`
                            }
                        ]
                    })(
                        <Input />
                    )}
                </FormItem>
            </div>
        )
    }
);
// 文字链组件
const FTextCreative = Form.create({
    onFieldsChange: (props, changedFields) => {
        props.onInfoChange({
            type: props.type || dataConst.CREATIVE_TYPE_TEXT,
            name: props.name,
            id: props.data.id,
            data: changedFields
        });
    },
    mapPropsToFields: (props) => {
        let minName = props.minName || 'min_length';
        let maxName = props.maxName || 'max_length';
        const { [minName]: minname, [maxName]: maxname } = props.data;
        return {
            [minName]: minname,
            [maxName]: maxname
        }
    }
})(
    (props) => {
        const { required, form, formItemLayout, label, unit } = props;
        const { getFieldDecorator, getFieldValue, getFieldError } = form;
        const checkDirty = (name) => {
            return getFieldError(name);
        };
        let minName = props.minName || 'min_length';
        let maxName = props.maxName || 'max_length';
        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    style={{ lineHeight: 1.5 }}
                    label={label || '文本长度'}
                    required={required}
                >
                    <InputGroup>
                        <Col span="6">
                            <FormItem>
                                {getFieldDecorator(minName, {
                                    rules: [{
                                        validator: (rule, value, cb) => {
                                            if (validMin({
                                                    equal: true,
                                                    required,
                                                    compareValue: getFieldValue(maxName),
                                                    value,
                                                    cb
                                                })) {
                                                if (checkDirty(maxName)) {
                                                    form.validateFields([maxName], { force: true });
                                                }
                                            }
                                        }
                                    }]
                                })(
                                    <Input type="number"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span="2">
                            <p className="ant-form-split">-</p>
                        </Col>
                        <Col span="6">
                            <FormItem>
                                {getFieldDecorator(maxName, {
                                    rules: [{
                                        validator: (rule, value, cb) => {
                                            if (validMax({
                                                    equal: true,
                                                    required,
                                                    compareValue: getFieldValue(minName),
                                                    value,
                                                    cb
                                                })) {
                                                if (checkDirty(minName)) {
                                                    form.validateFields([minName], { force: true });
                                                }
                                            }
                                        }
                                    }]
                                })(
                                    <Input type="number"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <p className="ant-form-split">{unit || '字数'}</p>
                        </Col>
                    </InputGroup>
                </FormItem>
            </div>
        )
    }
);
class TextCreative extends Component {
    render() {
        const { name, order, type, data } = this.props;
        const {id} =data;
        const isShare = () => {
            return (name === dataConst.CREATIVE_NAME_SHARE_TITLE
                    || name === dataConst.CREATIVE_NAME_SHARE_CONTENT
                    || name === dataConst.CREATIVE_NAME_AD_FROM);

        };
        let cfg = creativeTypeEnum.filter(i => i.name === name);
        return (
            <Card title={cfg[0] ? cfg[0]['alias'] : name}
                  extra={
                      <a style={{ fontSize: '16px', padding: '13px 13px', marginRight: '-15px' }}
                         onClick={() => {
                             this.props.onDelete({ type: type || dataConst.CREATIVE_TYPE_TEXT, id })
                         }}
                         href="javascript:void(0);"
                      >
                          <Icon type='close'/>
                      </a>
                  }
                  style={{ margin: '10px auto', width: 500 }}
            >
                {isShare()
                    ? <FShareTextCreative
                     ref={(ref) => {
                         window._refs_ = window._refs_ || {};
                         window._refs_[name + order] = ref
                     }}
                     {...this.props}
                 />
                    : <FTextCreative
                     ref={(ref) => {
                         window._refs_ = window._refs_ || {};
                         window._refs_[name + order] = ref
                     }}
                     {...this.props}
                 />
                }
            </Card>
        )
    }
}

class UrlCreative extends Component {
    render() {
        const { name, order, type, data } = this.props;
        const {id} = data;
        let cfg = creativeTypeEnum.filter(i => i.name === name);
        return (
            <Card title={cfg[0] ? cfg[0]['alias'] : name}
                  extra={
                      <a style={{ fontSize: '16px', padding: '13px 13px', marginRight: '-15px' }}
                         onClick={() => {
                             this.props.onDelete({ type: type || dataConst.CREATIVE_TYPE_URL, id })
                         }}
                         href="javascript:void(0);"
                      >
                          <Icon type='close'/>
                      </a>
                  }
                  style={{ margin: '10px auto', width: 500 }}
            >
                <FTextCreative
                    {...this.props}
                    type={dataConst.CREATIVE_TYPE_URL}
                    label="链接长度"
                    ref={(ref) => {
                        window._refs_ = window._refs_ || {};
                        window._refs_[name + order] = ref
                    }}
                />
            </Card>
        )
    }
}

//图片组件
// F开头代表用Form.create包装过的组件
const FImageCreative = Form.create({
    onFieldsChange: (props, changedFields) => {
        props.onInfoChange({
            type: props.type || dataConst.CREATIVE_TYPE_IMAGE,
            name: props.name,
            id: props.data.id,
            data: changedFields
        });
    },
    mapPropsToFields: (props) => {
        return {
            ...props.data
        }
    }
})(
    (props) => {
        const getImageFormat = () => {
            return dataEnum.formatTypeEnum.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            })
        };
        const normFile = (e) => {
            const resEnum = {errcode: 'errCode', errmsg: 'msg'};
            if (Array.isArray(e)) {
                return handleUploadChange(e, resEnum);
            }
            return e && handleUploadChange(e.fileList, resEnum);
        };
        const clearUploadField = () => {
            props.form.setFieldsValue({
                watermarklayer: '',
                tipslayer: ''
            });
        };
        const { required, form, formItemLayout, order, data, onInfoChange, name, type, multiple } = props;
        const { getFieldDecorator } = form;
        const visiOrder = order ? +order + 1 : '';
        const uploadLayerData = {
            creativeWidth: data.width ? data.width.value : 0,
            creativeHeight: data.height ? data.height.value : 0,
            creativeNum: visiOrder
        };
        const uploadProps = {
            name: 'Filedata',
            action: cgiMap.uploadLayer,
            multiple: false,
            accept: 'image/jpg,image/jpeg,image/png,image/gif',
            data: uploadLayerData,
            listType: 'picture',
            disabled: !data.width || !data.height,
            errcode: 'errCode',
            errmsg: 'msg',
            resurl: 'layerImgUrl'
        };
        return (
            <div>
                {multiple
                    ? <FormItem>
                     <FTextCreative formItemLayout={formItemLayout}
                                    onInfoChange={onInfoChange}
                                    type={type}
                                    name={name}
                                    minName="min_occurs"
                                    maxName="max_occurs"
                                    label="图片个数"
                                    unit="个"
                                    data={data}
                                    ref={(ref) => {
                                        window._refs_ = window._refs_ || {};
                                        window._refs_[uniqueId()] = ref
                                    }}
                     />
                 </FormItem>
                    : null}
                <FormItem
                    {...formItemLayout}
                    label={`尺寸${visiOrder}`}
                    required={required}
                >
                    <Row>
                        <Col span="10">
                            <FormItem>
                                {getFieldDecorator('width', {
                                    rules: [
                                        {
                                            required,
                                            message: '请正确填写尺寸'
                                        },
                                        {
                                            validator: validRange,
                                            min: 1
                                        }
                                    ],
                                    onChange: clearUploadField
                                })(
                                    <Input
                                        type="number"
                                        size="large"
                                        addonBefore="宽"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span="4"></Col>
                        <Col span="10">
                            <FormItem>
                                {getFieldDecorator('height', {
                                    rules: [
                                        {
                                            required,
                                            message: '请正确填写尺寸'
                                        },
                                        {
                                            validator: validRange,
                                            min: 1
                                        }
                                    ],
                                    onChange: clearUploadField
                                })(
                                    <Input type="number"
                                           size="large" addonBefore="高"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={`图片大小${visiOrder}`}
                >
                    {getFieldDecorator('file_size_KB_limit', {
                        rules: [
                            {
                                required,
                                message: '请正确填写图片大小'
                            },
                            {
                                validator: validRange,
                                min: 1
                            }
                        ]
                    })(
                        <Input type="number"
                               addonAfter="KB"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={`图片格式${visiOrder}`}
                >
                    {getFieldDecorator('file_format', {
                        rules: [{
                            required,
                            message: '请正确选择图片格式'
                        }]
                    })(
                        <CheckboxGroup options={getImageFormat()}/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={`界面说明${visiOrder}`}
                >
                    {getFieldDecorator('comment', {
                        rules: [
                            {
                                validator: validSpecChar,
                                message: '界面说明不能包含特殊字符'
                            }
                        ]
                    })(
                        <Input size="large"/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={`添加水印${visiOrder}`}
                >
                    <div>
                        <Row>
                            <Col span="6">
                                <p>水印位置：</p>
                            </Col>
                            <Col span="18">
                                <FormItem>
                                    {getFieldDecorator('jdwatermarkpos')(
                                        <RadioGroup>
                                            {renderChild(dataEnum.waterMarkPosEnum, Radio)}
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem
                            style={{ marginBottom: 0 }}
                        >
                            {getFieldDecorator('jdwatermark')(
                                <Input size="large"
                                       addonBefore="水印链接"
                                />
                            )}
                        </FormItem>
                    </div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={`添加图层${visiOrder}`}
                >
                    <UploadImageField
                        formItemLayout={formItemLayout}
                        data={data}
                        form={form}
                        normFile={normFile}
                        name="watermarklayer"
                        label="水印图层"
                        uploadProps={uploadProps}
                        disabled={!data.width || !data.width.value
                                  || !data.height || !data.height.value}
                    />

                    <UploadImageField
                        formItemLayout={formItemLayout}
                        data={data}
                        form={form}
                        normFile={normFile}
                        name="tipslayer"
                        label="提示图层"
                        uploadProps={uploadProps}
                        disabled={!data.width || !data.width.value
                                  || !data.height || !data.height.value}
                    />
                </FormItem>
            </div>
        )
    }
);

const FShareImageCreative = Form.create({
    onFieldsChange: (props, changedFields) => {
        props.onInfoChange({
            type: props.type || dataConst.CREATIVE_TYPE_IMAGE,
            name: props.name,
            id: props.data.id,
            data: changedFields
        });
    },
    mapPropsToFields: (props) => {
        return {
            ...props.data
        }
    }
})(
    (props) => {
        const getImageFormat = () => {
            return dataEnum.formatTypeEnum.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            })
        }
        const { required, form, formItemLayout, order, data } = props;
        const { getFieldDecorator } = form;
        const visiOrder = order ? +order + 1 : '';
        const uploadLayerData = {
            imageWidth: data.width ? data.width.value : 0,
            imageHeight: data.height ? data.height.value : 0,
            imageFilesize: data.file_size_KB_limit ? data.file_size_KB_limit.value * 1024 : 0,
            imageFileType: data.file_format ? data.file_format.value.map(i => {
                return dataEnum.formatTypeEnum.filter(ii => ii.id == i)[0]['name']
            }).join('|') : ''
        };
        const uploadProps = {
            name: 'Filedata',
            action: cgiMap.uploadShareImg,
            multiple: false,
            accept: 'image/jpg,image/jpeg,image/png,image/gif',
            data: uploadLayerData,
            listType: 'picture',
            errcode: 'result',
            errmsg: 'msg',
        };
        const clearUploadField = () => {
            props.form.setFieldsValue({
                default: ''
            });
        };
        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    label={`尺寸${visiOrder}`}
                    required={required}
                >
                    <Row>
                        <Col span="10">
                            <FormItem>
                                {getFieldDecorator('width', {
                                    rules: [
                                        {
                                            required,
                                            message: '请正确填写尺寸'
                                        }, {
                                            validator: validRange,
                                            min: 1
                                        }
                                    ],
                                    onChange: clearUploadField
                                })(
                                    <Input
                                        type="number"
                                        size="large"
                                        addonBefore="宽"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span="4"></Col>
                        <Col span="10">
                            <FormItem>
                                {getFieldDecorator('height', {
                                    rules: [
                                        {
                                            required,
                                            message: '请正确填写尺寸'
                                        },
                                        {
                                            validator: validRange,
                                            min: 1
                                        }
                                    ],
                                    onChange: clearUploadField
                                })(
                                    <Input type="number"
                                           size="large" addonBefore="高"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={`图片大小${visiOrder}`}
                >
                    {getFieldDecorator('file_size_KB_limit', {
                        rules: [
                            {
                                required,
                                message: '请正确图片大小'
                            },
                            {
                                validator: validRange,
                                min: 1
                            }
                        ],
                        onChange: clearUploadField
                    })(
                        <Input type="number"
                               addonAfter="KB"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={`图片格式${visiOrder}`}
                >
                    {getFieldDecorator('file_format', {
                        rules: [{
                            required,
                            message: '请正确选择图片格式'
                        }],
                        onChange: clearUploadField
                    })(
                        <CheckboxGroup options={getImageFormat()}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="上传图片"
                    required={required}
                >
                    <UploadImageField
                        data={data}
                        form={form}
                        name="default"
                        uploadProps={uploadProps}
                        required={true}
                        disabled={!data.width || !+data.width.value
                                  || !data.height || !+data.height.value
                                  || !data.file_size_KB_limit || !+data.file_size_KB_limit.value
                                  || !data.file_format || !data.file_format.value
                                  || !data.file_format.value.length
                        }
                    />
                </FormItem>
            </div>
        )
    }
);
class ImageCreative extends Component {
    getCreative = () => {
        const { name } = this.props;
        switch (name) {
            case dataConst.CREATIVE_NAME_IMAGE:
                return <FImageCreative/>;
            case dataConst.CREATIVE_NAME_SHARE_IMAGE:
                return <FShareImageCreative/>;
            case dataConst.CREATIVE_NAME_IMAGE_LIST:
                return <FImageCreative multiple={true}/>;
            default:
                return <FImageCreative/>;
        }
    }

    render() {
        const { order, type, name, data } = this.props;
        const {id} = data;
        const visiOrder = +order + 1;
        let cfg = creativeTypeEnum.filter(i => i.name === name);
        return (
            <Card title={`${cfg[0] ? cfg[0]['alias'] : '图片'}${order ? visiOrder : ''}`}
                  extra={
                      <a style={{ fontSize: '16px', padding: '13px 13px', marginRight: '-15px' }}
                         onClick={() => {
                             this.props.onDelete({ id, type: type || dataConst.CREATIVE_TYPE_IMAGE })
                         }}
                         href="javascript:void(0);"
                      >
                          <Icon type='close'/>
                      </a>
                  }
                  style={{ margin: '10px auto', width: 500 }}
            >
                {
                    React.cloneElement(
                        this.getCreative(),
                        {
                            ...this.props,
                            ref: ref => {
                                window._refs_ = window._refs_ || {};
                                window._refs_[uniqueId()] = ref
                            }
                        }
                    )
                }
            </Card>
        )
    }

}
const FEnumCreative = Form.create({
    onFieldsChange: (props, changedFields) => {
        props.onInfoChange({
            type: props.type || dataConst.CREATIVE_TYPE_ENUM,
            name: props.name,
            id: props.data.id,
            data: changedFields
        });
    },
    mapPropsToFields: (props) => {
        return {
            ...props.data
        }
    }
})(
    props => {
        const getEnumOptions = data => {
            return data.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            })
        };
        const { name, data, type, optionsMap, required, form, formItemLayout, onDelete } = props;
        const {id} = data;
        const { getFieldDecorator } = form;
        // 获取配置表里的alias
        let cfg = creativeTypeEnum.filter(i => i.name === name);
        return (
            <Card title={cfg[0] ? cfg[0]['alias'] : name}
                  extra={
                      <a style={{ fontSize: '16px', padding: '13px 13px', marginRight: '-15px' }}
                         onClick={() => {
                             onDelete({ id, type: type || dataConst.CREATIVE_TYPE_ENUM })
                         }}
                         href="javascript:void(0);"
                      >
                          <Icon type='close'/>
                      </a>
                  }
                  style={{ margin: '10px auto', width: 500 }}
            >
                <FormItem
                    {...formItemLayout}
                    required={required}
                    label="选项"
                >
                    {getFieldDecorator('option', {
                        rules: [{ required: true, message: `请至少选择一个`, type: 'array' }]
                    })(
                        <CheckboxGroup options={getEnumOptions(optionsMap)}/>
                    )}
                </FormItem>
            </Card>
        )
    }
)

export class CreativeEleList extends Component {
    render() {
        let { data, bizId, onDelete, onAdd, onInfoChange, formItemLayout } = this.props;
        const {
            [dataConst.CREATIVE_TYPE_TEXT]: text,
            [dataConst.CREATIVE_TYPE_IMAGE]: images,
            [dataConst.CREATIVE_TYPE_ENUM]: enums,
            [dataConst.CREATIVE_TYPE_URL]: urls
        } = data;
        let creativeArr = [];
        if (text && text.length) {
            // 切换产品类型时只展示当前bizid下允许的素材
            filterCurCreative(text, bizId).forEach((item, key) => {
                creativeArr.push(
                    <TextCreative
                        required={true}
                        type={dataConst.CREATIVE_TYPE_TEXT}
                        name={item.name}
                        key={`${item.name}${key}`}
                        onDelete={onDelete}
                        onInfoChange={onInfoChange}
                        formItemLayout={formItemLayout}
                        data={item}
                    />
                );
            })
        }

        if (images && images.length) {
            filterCurCreative(images, bizId).forEach((item, key) => {
                creativeArr.push(
                    <ImageCreative
                        required={true}
                        type={dataConst.CREATIVE_TYPE_IMAGE}
                        name={item.name}
                        key={item.id}
                        order={item.order}
                        onDelete={onDelete}
                        onInfoChange={onInfoChange}
                        formItemLayout={formItemLayout}
                        data={item}
                    />
                );
            })
        }

        if (enums && enums.length) {
            filterCurCreative(enums, bizId).forEach((item, key) => {
                creativeArr.push(
                    <FEnumCreative
                        required={true}
                        name={item.name}
                        key={item.id}
                        order={item.order}
                        onDelete={onDelete}
                        onInfoChange={onInfoChange}
                        formItemLayout={formItemLayout}
                        data={item}
                        optionsMap={dataEnum.sortableEnum}
                        ref={(ref) => {
                            window._refs_ = window._refs_ || {};
                            window._refs_[uniqueId()] = ref
                        }}
                    />
                )
            })
        }

        if (urls && urls.length) {
            filterCurCreative(urls, bizId).forEach(item => {
                creativeArr.push(
                    <UrlCreative
                        required={true}
                        name={item.name}
                        key={item.id}
                        order={item.order}
                        onDelete={onDelete}
                        onInfoChange={onInfoChange}
                        formItemLayout={formItemLayout}
                        data={item}
                    />
                )
            })
        }

        return (
            <div>
                <div className="ant-card ant-card-bordered creative-bar"
                     style={{ margin: '10px auto', width: '500px' }}
                >
                    <div className="ant-card-head"
                         style={{ border: 'none' }}>
                        <h3 className="ant-card-head-title"><Icon type="setting"/> 添加素材</h3>
                    </div>
                    <div className="ant-card-extra">
                        <CreativeCreateContainer
                            creativeList={data}
                            bizId={this.props.bizId}
                            onAdd={onAdd}
                        />
                    </div>
                </div>
                {creativeArr}
            </div>
        )
    }
}
// 子素材集合
// Form包装一层，以便使用rc-form的相关方法
export const FCreativeStory = Form.create({
    mapPropsToFields: (props) => {
        return {
            ...props.data
        }
    },
    onFieldsChange: (props, changedFields) => {
        props.onInfoChange({
            type: props.type || dataConst.CREATIVE_NAME_ELEMENT_STORY,
            name: props.name,
            id: props.data.id,
            data: changedFields
        });
    }
})(
    (props) => {
        const { onInfoChange, formItemLayout, data, form } = props;
        const {
            [dataConst.CREATIVE_TYPE_TEXT]: text,
            [dataConst.CREATIVE_TYPE_IMAGE]: images,
            [dataConst.CREATIVE_TYPE_URL]: urls
        } = data;
        const titleData = text
                          && text.filter(item => {
                return item && item.name == dataConst.CREATIVE_NAME_TITLE
            })[0]
                          || {};
        const descData = text
                         && text.filter(item => {
                return item && item.name == dataConst.CREATIVE_NAME_DESCRIPTION
            })[0]
                         || {};
        const imageData = images && images[0] || {};
        const urlData = urls && urls[0] || {};
        // Switch的状态只影响到改组件的内部，理论上可以直接内部消化，
        // 但考虑到最后提交数据时需要使用到，所以仍然在store里维护
        return (
            <Card title="素材集合"
                  extra={
                      <Switch size="small" onChange={props.onSwitch} checked={data.isStory}/>
                  }
                  style={{ margin: '10px auto', width: 500 }}
            >
                <Animate transitionName="fade">
                    {data.isStory
                        ? <div>
                         <FormItem>
                             <FTextCreative formItemLayout={formItemLayout}
                                            data={data}
                                            type={dataConst.CREATIVE_NAME_ELEMENT_STORY}
                                            onInfoChange={onInfoChange}
                                            order={0}
                                            name={dataConst.CREATIVE_NAME_ELEMENT_STORY}
                                            minName="min_occurs"
                                            maxName="max_occurs"
                                            label="子素材个数"
                                            required={true}
                                            unit="个"
                                            ref={(ref) => {
                                                window._refs_ = window._refs_ || {};
                                                window._refs_[uniqueId()] = ref
                                            }}
                             />
                         </FormItem>
                         <FormItem
                             label={
                                 <CheckboxTitle
                                     data={imageData}
                                     onInfoChange={onInfoChange}
                                     type={dataConst.CREATIVE_TYPE_IMAGE}
                                     name={dataConst.CREATIVE_NAME_IMAGE}
                                     title="子素材图片"
                                 />
                             }
                             colon={false}
                         >
                         </FormItem>

                         <Animate transitionName="fade">
                             {
                                 !!imageData.checked
                                     ? <FImageCreative formItemLayout={formItemLayout}
                                                       name={dataConst.CREATIVE_NAME_IMAGE}
                                                       data={imageData}
                                                       onInfoChange={onInfoChange}
                                                       order={0}
                                                       required={true}
                                                       ref={(ref) => {
                                                           window._refs_ = window._refs_ || {};
                                                           window._refs_[uniqueId()] = ref
                                                       }}
                                 />
                                     : null
                             }
                         </Animate>

                         <FormItem
                             {...formItemLayout}
                             label={
                                 <CheckboxTitle
                                     data={titleData}
                                     onInfoChange={onInfoChange}
                                     type={dataConst.CREATIVE_TYPE_TEXT}
                                     name={dataConst.CREATIVE_NAME_TITLE}
                                     title="子素材标题"
                                 />
                             }
                             colon={false}
                         >
                         </FormItem>
                         <Animate transitionName="fade">
                             {
                                 !!titleData.checked
                                     ? <FormItem>
                                     <FTextCreative formItemLayout={formItemLayout}
                                                    required={true}
                                                    data={titleData}
                                                    onInfoChange={onInfoChange}
                                                    order={1}
                                                    name={dataConst.CREATIVE_NAME_TITLE}
                                                    ref={(ref) => {
                                                        window._refs_ = window._refs_ || {};
                                                        window._refs_[uniqueId()] = ref
                                                    }}
                                     />
                                 </FormItem>
                                     : null
                             }
                         </Animate>
                         <FormItem
                             {...formItemLayout}
                             label={
                                 <CheckboxTitle
                                     data={descData}
                                     onInfoChange={onInfoChange}
                                     type={dataConst.CREATIVE_TYPE_TEXT}
                                     name={dataConst.CREATIVE_NAME_DESCRIPTION}
                                     title="子素材描述"
                                 />
                             }
                             colon={false}
                         >
                         </FormItem>
                         <Animate transitionName="fade">
                             {
                                 !!descData.checked
                                     ? <FormItem>
                                     <FTextCreative formItemLayout={formItemLayout}
                                                    required={true}
                                                    data={descData}
                                                    onInfoChange={onInfoChange}
                                                    order={2}
                                                    name={dataConst.CREATIVE_NAME_DESCRIPTION}
                                                    ref={(ref) => {
                                                        window._refs_ = window._refs_ || {};
                                                        window._refs_[uniqueId()] = ref
                                                    }}
                                     />
                                 </FormItem>
                                     : null
                             }
                         </Animate>
                         <FormItem
                             {...formItemLayout}
                             label={
                                 <CheckboxTitle
                                     data={urlData}
                                     onInfoChange={onInfoChange}
                                     type={dataConst.CREATIVE_TYPE_URL}
                                     name={dataConst.CREATIVE_NAME_URL}
                                     title="子素材URL"
                                 />
                             }
                             colon={false}
                         >
                         </FormItem>

                         <Animate transitionName="fade">
                             {
                                 !!urlData.checked
                                     ? <FormItem>
                                     <FTextCreative formItemLayout={formItemLayout}
                                                    required={true}
                                                    data={urlData}
                                                    onInfoChange={onInfoChange}
                                                    order={0}
                                                    name={dataConst.CREATIVE_NAME_URL}
                                                    type={dataConst.CREATIVE_TYPE_URL}
                                                    label="链接长度"
                                                    ref={(ref) => {
                                                        window._refs_ = window._refs_ || {};
                                                        window._refs_[uniqueId()] = ref
                                                    }}
                                     />
                                 </FormItem>
                                     : null
                             }
                         </Animate>
                     </div>
                        : <div style={{
                            textAlign: 'center',
                        }}
                     >
                         <p className="tip-text">不使用素材集合</p>
                     </div>
                    }
                </Animate>
            </Card>
        )
    }
);

export class CtrBar extends Component {
    render() {
        return (
            <div className="ctrBar">
                <Button
                    icon="plus"
                    onClick={this.props.onOpenEditModal}>
                    新建规格
                </Button>
            </div>
        );
    }
}

export class CreativeCreate extends Component {
    render() {
        let { onInfoChange, onAdd, bizId, data, creativeList } = this.props;
        let creativeName = data || dataConst.CREATIVE_NAME_TITLE;
        let curCreativeEnum = creativeTypeEnum
            .filter(i => {
                return i.name === creativeName;
            })[0];
        // 切换媒体类型时，若不支持当前的素材类型，重置为title
        if (curCreativeEnum['mediaType'].indexOf(bizId) === -1) {
            creativeName = dataConst.CREATIVE_NAME_TITLE;
        }
        if (!creativeList || !creativeList[curCreativeEnum.type]) {
            creativeList = {
                [curCreativeEnum.type]: []
            }
        }
        let curCreativeLength = creativeList[curCreativeEnum.type].filter(i => i.name === creativeName).length;
        // 如果是omg，title和content都是title的别名，计算数量应该合并计算
        if (bizId === dataConst.OMG
            && (creativeName === dataConst.CREATIVE_NAME_TITLE
                || creativeName === dataConst.CREATIVE_NAME_CONTENT)) {
            curCreativeLength = creativeList[curCreativeEnum.type]
                .filter(i => {
                    return i.name === dataConst.CREATIVE_NAME_TITLE
                           || i.name === dataConst.CREATIVE_NAME_CONTENT;
                }).length;
        }
        return (
            <div>
                <Select onChange={(value) => {
                    onInfoChange({ data: { creativeName: value } })
                }}
                        value={creativeName}
                        style={{ width: 90 }}
                        dropdownMatchSelectWidth={false}
                >
                    {
                        renderChild(
                            creativeTypeEnum
                                .filter(i => {
                                    return i.mediaType.indexOf(bizId) !== -1;
                                })
                                .map(i => {
                                    return {
                                        id: i.name,
                                        name: i.alias
                                    };
                                }),
                            Option)
                    }
                </Select>
                <Button type="primary"
                        onClick={() => {
                            onAdd({ name: creativeName, type: curCreativeEnum.type })
                        }}
                        style={{ marginLeft: 10 }}
                        disabled={curCreativeLength >= curCreativeEnum.maximum}
                >
                    添加
                </Button>
            </div>
        )
    }
}

export class App extends Component {
    render() {
        return (
            <div>
                <SBoxContainer />
                <CtrBarContainer />
                <SpecListContainer />
                <SpecPaginationContainer/>
                <EditModalContainer/>
            </div>
        );
    }
}

const SubBizField = (props) => {
    const { form, formItemLayout, onInfoChange, data } = props;
    const { getFieldDecorator } = form;
    const adBizId = getAntdFormDataValue(cgiConst.BIZ_ID, data);
    const subBizData = getDataMapChild(dataEnum.bizTypeMap, adBizId);
    return (
        <FormItem
            {...formItemLayout}
            label="子产品类型"
        >
            {getFieldDecorator(cgiConst.SUB_BIZ_ID, {
                onChange: () => {
                    onInfoChange({
                        data: { [cgiConst.AD_SITE]: [] }
                    });
                }
            })(
                <RadioGroup>
                    {renderChild(subBizData, Radio)}
                </RadioGroup>
            )}
        </FormItem>
    )
}

class SiteField extends Component {
    getAdSite(sites) {
        return sites.map(item => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }

    render() {
        const { form, formItemLayout, data } = this.props;
        const { getFieldDecorator } = form;
        const adBizId = getAntdFormDataValue(cgiConst.BIZ_ID, data);
        const subAdBizId = getAntdFormDataValue(cgiConst.SUB_BIZ_ID, data);
        const siteData = getDataMapChild(dataEnum.bizTypeMap, adBizId, subAdBizId);

        return (
            <FormItem
                {...formItemLayout}
                label="投放站点"
            >
                {getFieldDecorator(cgiConst.AD_SITE, {
                    rules: [{ required: true, type: 'array', message: '请至少选择一个投放站点' }]
                })(
                    <CheckboxGroup options={this.getAdSite(siteData)}/>
                )}
            </FormItem>
        )
    }
}

const UploadImageField = (props) => {
    const { form, data, required, label, name, uploadProps } = props;
    const { getFieldDecorator } = form;
    const normFile = (e) => {
        const {errcode, errmsg, resurl} = uploadProps;
        const resEnum = {errcode, errmsg, resurl};
        if (Array.isArray(e)) {
            return handleUploadChange(e, resEnum);
        }
        return e && handleUploadChange(e.fileList, resEnum);
    };
    const formItemLayout = Object.assign({
        labelCol: { span: 3 },
        wrapperCol: { span: 16 }
    }, props.formItemLayout || {});
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            colon={false}
            className="field-box up-label"
        >
            {getFieldDecorator(name, {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
                rules: [{
                    validator: (rule, value, cb) => {
                        if (required && (!value || !value[0] || value[0].status == 'error' ||
                                         (value[0].status == 'success' && !value[0].url))) {
                            cb(`请正确上传${props.label || '图片'}`)
                        }
                        else {
                            cb()
                        }
                    }
                }]
            })(
                <Upload {...uploadProps}>
                    <Button disabled={props.disabled}>
                        <Icon type="paper-clip"/>上传
                    </Button>
                </Upload>
            )}
        </FormItem>
    )
}

const AdspecNameField = (props) => {
    const { form, formItemLayout, data } = props;
    const { getFieldDecorator } = form;
    return (
        <FormItem
            {...formItemLayout}
            label="规格名称"
        >
            <Row>
                <Col span="12">
                    {getFieldDecorator(cgiConst.SPEC_NAME, {
                        rules: [
                            {
                                required: true,
                                type: 'string',
                                whitespace: true,
                                message: '请填写规格名称'
                            },
                            {
                                validator: validSpecChar,
                                message: '规格名称不能包含特殊字符'
                            }
                        ]
                    })(
                        <Input type="text" size="large"/>
                    )}
                </Col>
            </Row>
        </FormItem>
    )
}

const GDTSpecIdField = (props) => {
    const { form, data } = props;
    const { getFieldDecorator, getFieldError, getFieldValue, validateFields } = form;
    const validCheck = (rule, value, cb) => {
        let GDTCheck;
        let OMGCheck;
        let relateCheckName;
        let relateInputName;
        if (rule.field === cgiConst.GDT_CHECK) {
            relateCheckName = cgiConst.OMG_CHECK;
            relateInputName = cgiConst.CRT_SIZE;
            GDTCheck = value;
            OMGCheck = getFieldValue(relateCheckName);
        }
        if (rule.field === cgiConst.OMG_CHECK) {
            relateCheckName = cgiConst.GDT_CHECK;
            relateInputName = cgiConst.TANGO_ID;
            GDTCheck = getFieldValue(relateCheckName);
            OMGCheck = value;
        }
        if (!OMGCheck && !GDTCheck) {
            cb(rule.message);
            return;
        }
        setTimeout(() => {
            [relateCheckName, relateInputName].forEach(item => {
                if (getFieldError(item)) {
                    validateFields([item], { force: true });
                }
            });
        }, 0)
        cb();
    }
    return (
        <div>
            {/* <Row >
                <Col span="4">
                    <FormItem className="field-box">
                        {getFieldDecorator(cgiConst.OMG_CHECK, {
                                valuePropName: 'checked',
                                rules: [{
                                    validator: validCheck,
                                    message: '请至少填写一种规格ID'
                                }]
                            }
                        )(
                            <Checkbox>
                                OMG
                            </Checkbox>
                        )}
                    </FormItem>
                </Col> 
                <Col span="8">
                    <FormItem className="field-box">
                        {getFieldDecorator(cgiConst.TANGO_ID, {
                            rules: [{
                                required: !!getFieldValue(cgiConst.OMG_CHECK),
                                message: '请正确填写规格ID'
                            }]
                        })(
                            <Input type="number"
                                   size="large"
                                   addonBefore="规格ID"
                                   disabled={!getFieldValue(cgiConst.OMG_CHECK)}
                            />
                        )}
                    </FormItem>
                </Col>
            </Row>*/}
            <Row >
                <Col
                    span="4">
                    <FormItem >
                        { getFieldDecorator(cgiConst.GDT_CHECK, {
                            valuePropName: 'checked',
                            rules: [{
                                validator: validCheck,
                                message: '请至少填写一种规格ID'
                            }]
                        })(
                            <Checkbox>
                                GDT
                            </Checkbox>
                        )}
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem className="field-box">
                        {getFieldDecorator(cgiConst.CRT_SIZE, {
                            rules: [{
                                required: !!getFieldValue(cgiConst.GDT_CHECK),
                                message: '请正确填写规格ID'
                            }]
                        })(
                            <Input type="number"
                                   size="large"
                                   addonBefore=" crtsize"
                                   disabled={!getFieldValue(cgiConst.GDT_CHECK)}
                            />
                        )}
                    </FormItem>
                </Col>
            </Row>
        </div>
    )
}

const ToutiaoSpecId = props => {
    const { form, data } = props;
    const { getFieldDecorator } = form;
    return (
        <div>
            <FormItem className="field-box">
                {getFieldDecorator(cgiConst.CRT_TYPE, {
                    initialValue: +data[cgiConst.CRT_TYPE] || 1
                })(
                    <RadioGroup>
                        {renderChild(dataEnum.jrttCrtTypeEnum, Radio, { className: 'vertical-radio' })}
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem className="field-box">
                {getFieldDecorator(cgiConst.CRT_SIZE_JRTT, {
                    initialValue: +data[cgiConst.CRT_SIZE] || '',
                    rules: [{
                        required: true,
                        message: '请输入正确的规格ID'
                    }]
                })(
                    <Input type="number"
                           size="large"
                           addonBefore="crtsize"
                           style={{ width: 250 }}
                    />
                )}
            </FormItem>
        </div>
    )
}

const OMGSpecId = props => {
    const { form, data } = props;
    const { getFieldDecorator } = form;
    return (
        <Col span="12">
            <FormItem>
                {getFieldDecorator(cgiConst.CRT_SIZE_OMG, {
                    initialValue: +data[cgiConst.CRT_SIZE] || '',
                    rules: [{
                        required: true,
                        message: '请输入正确的规格ID'
                    }]
                })(
                    <Input type="number"
                           addonBefore="OMG"
                    />
                )}
            </FormItem>
        </Col>
    )

}

const BaiduSpecId = props => {
    const { form, data } = props;
    const { getFieldDecorator } = form;
    return (
        <div>
            <FormItem className="field-box">
                {getFieldDecorator(cgiConst.CRT_TYPE, {
                    initialValue: +data[cgiConst.CRT_TYPE] || 1
                })(
                    <RadioGroup>
                        {renderChild(dataEnum.jrttCrtTypeEnum, Radio, { className: 'vertical-radio' })}
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem className="field-box">
                {getFieldDecorator(cgiConst.CRT_SIZE, {
                    initialValue: +data[cgiConst.CRT_SIZE] || '',
                    rules: [{
                        required: true,
                        message: '请输入正确的规格ID'
                    }]
                })(
                    <Input type="number"
                           size="large"
                           addonBefore="crtsize"
                           style={{ width: 250 }}
                    />
                )}
            </FormItem>
        </div>
    )
}

const PlatformField = (props) => {
    const { form, data, formItemLayout } = props;
    const { getFieldDecorator } = form;
    return (
        <FormItem
            {...formItemLayout}
            label="投放平台"
        >
            {getFieldDecorator(cgiConst.PLATFORM)(
                <RadioGroup>
                    {renderChild(dataEnum.showPlatFormEnum, Radio)}
                </RadioGroup>
            )}
        </FormItem>
    )
}

const AuditRuleField = (props) => {
    const { form, data, formItemLayout } = props;
    const { getFieldDecorator } = form;
    return (
        <FormItem
            {...formItemLayout}
            label="审核规则"
        >
            {getFieldDecorator(cgiConst.AUDIT_TYPE, {
                initialValue: data[cgiConst.AUDIT_TYPE] || dataConst.AUDIT_FIRST
            })(
                <RadioGroup>
                    {renderChild(dataEnum.auditTypeEnum, Radio)}
                </RadioGroup>
            )}
        </FormItem>
    )
}

// const ProductTypeField = (props) => {
//     const { form, data, formItemLayout } = props;
//     const { getFieldDecorator } = form;
//     const getProductType = () => {
//         return dataEnum.operProductTypeEnum
//             .filter(item => {
//                 return +item.id !== 0;
//             })
//             .map(item => {
//                 return {
//                     label: item.name,
//                     value: item.id
//                 };
//             });
//     };
//     return (
//         <FormItem
//             {...formItemLayout}
//             label="上线产品"
//         >
//             {getFieldDecorator(cgiConst.PRODUCT_TYPE, {
//                 initialValue: data[cgiConst.PRODUCT_TYPE] || [],
//                 rules: [{
//                     required: true,
//                     type: 'array',
//                     message: '请至少选择一种上线产品'
//                 }]
//             })(
//                 <CheckboxGroup
//                     options={getProductType()}
//                 >
//                 </CheckboxGroup>
//             )}
//         </FormItem>
//     )
// }

const RadioField = props => {
    const { form, data, initialValue, childData, formItemLayout, label, name } = props;
    const { getFieldDecorator } = form;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
        >
            {getFieldDecorator(name, {
                initialValue: initialValue || dataConst.FALSE
            })(
                <RadioGroup>
                    {renderChild(childData || dataEnum.isOrNot, Radio)}
                </RadioGroup>
            )}
        </FormItem>

    )
}

const SelectField = props => {
    const { form, initialValue, formItemLayout, fieldLayout, label, name, childData } = props;
    const { getFieldDecorator } = form;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
        >
            {getFieldDecorator(name, {
                initialValue: initialValue || '-1'
            })(
                <Select
                    {...fieldLayout}
                >
                    <Option value="-1">全部</Option>
                    {renderChild(childData || dataEnum.isOrNot, Option)}
                </Select>
            )}
        </FormItem>
    );
}

const AutoCreativeField = props => {
    const { form, data, formItemLayout } = props;
    const { getFieldDecorator, getFieldValue } = form;
    return (
        <FormItem
            {...formItemLayout}
            label="支持一键创意"
        >
            {getFieldDecorator(cgiConst.ONE_KEY_CREATIVE, {
                initialValue: data.oneKeyCreativeType || dataConst.FALSE
            })(
                <RadioGroup>
                    {renderChild(dataEnum.isOrNot, Radio)}
                </RadioGroup>
            )}
            <Animate transitionName="fade">
            {+getFieldValue(cgiConst.ONE_KEY_CREATIVE)
                ? <div>
                <Row className="field-box">
                    <Col span="8">
                        <FormItem className="field-box">
                            {getFieldDecorator(cgiConst.CREATIVE_MAIN_TEXT_MIN, {
                                rules: [{
                                    validator: (rule, value, cb) => {
                                        const isOnekey = getFieldValue(cgiConst.ONE_KEY_CREATIVE);
                                        if (+isOnekey) {
                                            if (validMin({
                                                    compareValue: getFieldValue(cgiConst.CREATIVE_MAIN_TEXT_MAX),
                                                    value,
                                                    required: true,
                                                    cb
                                                })) {
                                                // 重新校验
                                                if (props.checkDirty(cgiConst.CREATIVE_MAIN_TEXT_MAX)) {
                                                    form.validateFields([cgiConst.CREATIVE_MAIN_TEXT_MAX], { force: true });
                                                }
                                            }
                                            return;
                                        }
                                        cb();
                                    }
                                }]
                            })(
                                <Input type="number"
                                       size="large"
                                       addonBefore="主文案长度"

                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span="1">
                        <p className="ant-form-split">-</p>
                    </Col>
                    <Col span="6">

                        <FormItem className="field-box">
                            {getFieldDecorator(cgiConst.CREATIVE_MAIN_TEXT_MAX, {
                                rules: [{
                                    validator: (rule, value, cb) => {
                                        const isOnekey = getFieldValue(cgiConst.ONE_KEY_CREATIVE);
                                        if (+isOnekey) {
                                            if (validMax({
                                                    compareValue: getFieldValue(cgiConst.CREATIVE_MAIN_TEXT_MIN),
                                                    value,
                                                    required: true,
                                                    cb
                                                })) {
                                                // 重新校验
                                                if (props.checkDirty(cgiConst.CREATIVE_MAIN_TEXT_MIN)) {
                                                    form.validateFields([cgiConst.CREATIVE_MAIN_TEXT_MIN], { force: true });
                                                }
                                            }
                                            return;
                                        }
                                        cb();
                                    }
                                }]
                            })(
                                <Input type="number"
                                       size="large"/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="field-box">
                    <Col span="8">
                        <FormItem className="field-box">
                            {getFieldDecorator(cgiConst.CREATIVE_SUB_TEXT_MIN, {
                                rules: [{
                                    validator: (rule, value, cb) => {
                                        const isOnekey = getFieldValue(cgiConst.ONE_KEY_CREATIVE);
                                        if (+isOnekey) {
                                            if (validMin({
                                                    compareValue: getFieldValue(cgiConst.CREATIVE_SUB_TEXT_MAX),
                                                    value,
                                                    required: true,
                                                    cb
                                                })) {
                                                // 重新校验
                                                if (props.checkDirty(cgiConst.CREATIVE_SUB_TEXT_MAX)) {
                                                    form.validateFields([cgiConst.CREATIVE_SUB_TEXT_MAX], { force: true });
                                                }
                                            }
                                            return;
                                        }
                                        cb();
                                    }
                                }]
                            })(
                                <Input type="number"
                                       size="large"
                                       addonBefore="副文案长度"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span="1">
                        <p className="ant-form-split">-</p>
                    </Col>
                    <Col span="6">
                        <FormItem className="field-box">
                            {getFieldDecorator(cgiConst.CREATIVE_SUB_TEXT_MAX, {
                                rules: [{
                                    validator: (rule, value, cb) => {
                                        const isOnekey = getFieldValue(cgiConst.ONE_KEY_CREATIVE);
                                        if (+isOnekey) {
                                            if (validMax({
                                                    compareValue: getFieldValue(cgiConst.CREATIVE_SUB_TEXT_MIN),
                                                    value,
                                                    required: true,
                                                    cb
                                                })) {
                                                // 重新校验
                                                if (props.checkDirty(cgiConst.CREATIVE_SUB_TEXT_MIN)) {
                                                    form.validateFields([cgiConst.CREATIVE_SUB_TEXT_MIN], { force: true });
                                                }
                                            }
                                            return;
                                        }
                                        cb();
                                    }
                                }]
                            })(
                                <Input type="number"
                                       size="large"
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
                : null}
            </Animate>
        </FormItem>
    )
}

const PriceField = (props) => {
    const { form, data, formItemLayout } = props;
    const { getFieldDecorator, getFieldError, getFieldValue, validateFields } = form;
    const checkDirty = (name) => {
        return getFieldError(name);
    };
    const getChargeTypeCheckbox = (type) => {
        return dataEnum.chargeTypeEnum
            .filter(item => item.name === type)
            .map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            })
    };
    return (
        <FormItem
            {...formItemLayout}
            label="出价方式"
            required={true}
        >
            <Row >
                <Col span="4">
                    <FormItem className="field-box">
                        {getFieldDecorator('cpcCheck', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const cpmCheck = getFieldValue('cpmCheck');
                                    if ((!value || !value.length) && (!cpmCheck || !cpmCheck.length)) {
                                        cb('至少选择一种出价方式');
                                        return;
                                    }
                                    // 重新校验
                                    ['cpcMin', 'cpcMax', 'cpmCheck', 'ocpaCheck'].forEach(item => {
                                        if (checkDirty(item)) {
                                            validateFields([item], { force: true });
                                        }
                                    })
                                    cb();
                                }
                            }]
                        })(
                            <CheckboxGroup options={getChargeTypeCheckbox('CPC')}>
                            </CheckboxGroup>
                        )}
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem className="field-box">
                        {getFieldDecorator('cpcMin', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const cpcCheck = getFieldValue('cpcCheck');
                                    if (cpcCheck && cpcCheck.length) {
                                        if (validMin({
                                                equal: true,
                                                compareValue: getFieldValue('cpcMax'),
                                                value,
                                                required: true,
                                                decimal: true,
                                                cb
                                            })) {
                                            // 重新校验
                                            if (checkDirty('cpcMax')) {
                                                validateFields(['cpcMax'], { force: true });
                                            }
                                        }
                                        return;
                                    }
                                    cb();
                                }
                            }]
                        })(
                            <Input type="number"
                                   step="0.1"
                                   min="0"
                                   size="large"
                                   addonBefore="底价范围"
                                   disabled={!(getFieldValue('cpcCheck') &&
                                               getFieldValue('cpcCheck').length)}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span="1">
                    <p className="ant-form-split">-</p>
                </Col>
                <Col span="5">
                    <FormItem className="field-box">
                        {getFieldDecorator('cpcMax', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const cpcCheck = getFieldValue('cpcCheck');
                                    if (cpcCheck && cpcCheck.length) {
                                        if (validMax({
                                                equal: true,
                                                compareValue: getFieldValue('cpcMin'),
                                                decimal: true,
                                                required: true,
                                                value,
                                                cb
                                            })) {
                                            // 重新校验
                                            if (checkDirty('cpcMin')) {
                                                validateFields(['cpcMin'], { force: true });
                                            }
                                        }
                                        return;
                                    }
                                    cb();
                                }
                            }]
                        })(
                            <Input type="number"
                                   size="large"
                                   min="0"
                                   step="0.1"
                                   disabled={!(getFieldValue('cpcCheck') &&
                                               getFieldValue('cpcCheck').length)}
                            />
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row >
                <Col span="4">
                    <FormItem className="field-box">
                        {getFieldDecorator('cpmCheck', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const cpcCheck = getFieldValue('cpcCheck');
                                    if ((!value || !value.length) && (!cpcCheck || !cpcCheck.length)) {
                                        cb('至少选择一种出价方式');
                                        return;
                                    }
                                    // 重新校验
                                    ['cpmMin', 'cpmMax', 'cpcCheck'].forEach(item => {
                                        if (checkDirty(item)) {
                                            validateFields([item], { force: true });
                                        }
                                    })
                                    cb();
                                }
                            }]
                        })(
                            <CheckboxGroup options={getChargeTypeCheckbox('CPM')}>
                            </CheckboxGroup>
                        )}
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem className="field-box">
                        {getFieldDecorator('cpmMin', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const cpmCheck = getFieldValue('cpmCheck');
                                    if (cpmCheck && cpmCheck.length) {
                                        if (validMin({
                                                equal: true,
                                                compareValue: getFieldValue('cpmMax'),
                                                value,
                                                required: true,
                                                decimal: true,
                                                cb
                                            })) {
                                            // 自己校验通过了，需要重新校验关联的表单
                                            if (checkDirty('cpmMax')) {
                                                validateFields(['cpmMax'], { force: true });
                                            }
                                        }
                                        return;
                                    }
                                    cb();
                                }
                            }]
                        })(
                            <Input type="number"
                                   size="large"
                                   step="0.1"
                                   addonBefore="底价范围"
                                   disabled={!(getFieldValue('cpmCheck') &&
                                               getFieldValue('cpmCheck').length)}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span="1">
                    <p className="ant-form-split">-</p>
                </Col>
                <Col span="5">
                    <FormItem className="field-box">
                        {getFieldDecorator('cpmMax', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const cpmCheck = getFieldValue('cpmCheck');
                                    if (cpmCheck && cpmCheck.length) {
                                        if (validMax({
                                                equal: true,
                                                compareValue: getFieldValue('cpmMin'),
                                                value,
                                                required: true,
                                                decimal: true,
                                                cb
                                            })) {
                                            // 重新校验
                                            if (checkDirty('cpmMin')) {
                                                validateFields(['cpmMin'], { force: true });
                                            }
                                        }
                                        return;
                                    }
                                    cb();
                                }
                            }]
                        })(
                            <Input type="number"
                                   size="large"
                                   step="0.1"
                                   disabled={!(getFieldValue('cpmCheck') &&
                                               getFieldValue('cpmCheck').length)}
                            />
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row >
                <Col span="4">
                    <FormItem className="field-box">
                        {getFieldDecorator('ocpaCheck', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const cpcCheck = getFieldValue('cpcCheck');
                                    if ((value && value.length) && (!cpcCheck || !cpcCheck.length)) {
                                        cb('oCPA规格必须选择CPC出价方式');
                                        return;
                                    }
                                    // 重新校验
                                    ['ocpaMin', 'ocpaMax', 'ocpaCheck', 'cpcCheck', 'cpcMin', 'cpcMax'].forEach(item => {
                                        if (checkDirty(item)) {
                                            validateFields([item], { force: true });
                                        }
                                    })
                                    cb();
                                }
                            }]
                        })(
                            <CheckboxGroup options={getChargeTypeCheckbox('oCPA')}>
                            </CheckboxGroup>
                        )}
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem className="field-box">
                        {getFieldDecorator('ocpaMin', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const ocpaCheck = getFieldValue('ocpaCheck');
                                    if (ocpaCheck && ocpaCheck.length) {
                                        if (validMin({
                                                equal: true,
                                                compareValue: getFieldValue('ocpaMax'),
                                                value,
                                                required: true,
                                                decimal: true,
                                                cb
                                            })) {
                                            // 自己校验通过了，需要重新校验关联的表单
                                            if (checkDirty('ocpaMax')) {
                                                validateFields(['ocpaMax'], { force: true });
                                            }
                                        }
                                        return;
                                    }
                                    cb();
                                }
                            }]
                        })(
                            <Input type="number"
                                   size="large"
                                   step="0.1"
                                   addonBefore="底价范围"
                                   disabled={!(getFieldValue('ocpaCheck') &&
                                               getFieldValue('ocpaCheck').length)}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span="1">
                    <p className="ant-form-split">-</p>
                </Col>
                <Col span="5">
                    <FormItem className="field-box">
                        {getFieldDecorator('ocpaMax', {
                            rules: [{
                                validator: (rule, value, cb) => {
                                    const ocpaCheck = getFieldValue('ocpaCheck');
                                    if (ocpaCheck && ocpaCheck.length) {
                                        if (validMax({
                                                equal: true,
                                                compareValue: getFieldValue('ocpaMin'),
                                                value,
                                                required: true,
                                                decimal: true,
                                                cb
                                            })) {
                                            // 重新校验
                                            if (checkDirty('ocpaMin')) {
                                                validateFields(['ocpaMin'], { force: true });
                                            }
                                        }
                                        return;
                                    }
                                    cb();
                                }
                            }]
                        })(
                            <Input type="number"
                                   size="large"
                                   step="0.1"
                                   disabled={!(getFieldValue('ocpaCheck') &&
                                               getFieldValue('ocpaCheck').length)}
                            />
                        )}
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
    )
}

const CheckboxTitle = props => {
    const { name, title, type, data, onInfoChange } = props;
    const handleChange = (e) => {
        onInfoChange({
            name,
            id: data.id,
            type,
            data: {
                checked: e.target.checked
            }
        });
    };
    return (
        <Checkbox
            checked={!!data.checked}
            onChange={handleChange}
            style={{ position: 'relative', left: 17 }}
        >
            <h3 style={{ display: 'inline-block' }}>
                {title}
            </h3>
        </Checkbox>
    );
}

// class BlackWorldField extends Component {
//     getBlackWorld(worldList) {
//         return worldList.map(item => {
//             return {
//                 label: item.name,
//                 value: item.id
//             }
//         })
//     }

//     render() {
//         const { form, formItemLayout, data } = this.props;
//         const { getFieldDecorator } = form;
//         const worldList = this.props.worldList;

//         return (
//             <FormItem
//                 {...formItemLayout}
//                 label={this.props.labelName}
//             >
//                 {getFieldDecorator(this.props.fieldName, {
//                     rules: [{ required: true, type: 'array', message: '请至少选择一个选项' }]
//                 })(
//                     <CheckboxGroup options={this.getBlackWorld(worldList)}/>
//                 )}
//             </FormItem>
//         )
//     }
// }