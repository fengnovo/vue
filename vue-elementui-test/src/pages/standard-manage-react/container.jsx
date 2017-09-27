/**
 * Created by chenjiawei1 on 2017/1/11.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    CtrBar,
    SpecPagination,
    SpecList,
    FSearchBox,
    FSpecEditModal,
    CreativeEleList,
    FCreativeStory,
    CreativeCreate
} from './view.jsx';
import {
    creativeTpl,
    searchParam,
    getSpecList,
    getCrtSizeList,
    // getBlackWorldList,
    editSpec,
    addSpec,
    deleteSpec,
    actionMap,
    cgiConst,
    editParams,
    initState,
    creativeTypeEnum
} from './const.jsx';
import { dataConst, dataEnum } from './config.const.js';
import {
    parseRelationData,
    fromTimestamp,
    extendObject,
    typeIs,
    encodeSiteSet,
    encodeBitData,
    decodeBitData,
    decodeSiteSet,
    deepCopy,
    unFlatDimensionData,
    kb2Byte,
    flatDimensionData,
    flatArr,
    uniqueId,
    getDataMapChild,
    decodeHtml,
    getAntdFormDataValue

} from 'util.helper';
import {filterCurCreative, decodeProperty} from './helper.js';
import { message } from 'antd';
import { store } from './store.jsx';

export class SpecListContainer extends Component {

    // step2 把store里的state组装成纯组件所需要的props
    mapStateToProps = store => {
        return {
            specList: this.formatData(store.listReducer.specList)
            // blackWorldList: store.blackWorldReducer.blackWorldList
        };
    }

    formatData(data) {
        return data.map(item => {
            let obj = { key: item.adSpecId }
            
            // if (item[cgiConst.BLACK_WORLD_TITLE] && blackWorldList && blackWorldList.length > 0) {
            //     obj.textBlackWorld = this.transBlackWorldIdToStr(item[cgiConst.BLACK_WORLD_TITLE], blackWorldList);
            // }
            // if (item[cgiConst.BLACK_WORLD_METARIAL] && blackWorldList && blackWorldList.length > 0) {
            //     obj.imageBlackWorld = this.transBlackWorldIdToStr(item[cgiConst.BLACK_WORLD_METARIAL], blackWorldList);
            // }
            if (item[cgiConst.LAST_MOD_TIME]) {
                obj[cgiConst.LAST_MOD_TIME_SHOW] = fromTimestamp(item[cgiConst.LAST_MOD_TIME] * 1000, 'yyyy/MM/dd HH:mm:ss').toString()
            }
            return Object.assign({}, item, { key: item.adSpecId }, obj);
        });
    }
    // 黑词ID翻译为字符串
    // transBlackWorldIdToStr(ids, blackWorldList) {
    //     let arr = ids.split('|');
    //     let result = [];
        
    //     arr.forEach(function(id) {
    //         blackWorldList.forEach(function(item) {
    //             if (id === item.id) {
    //                 result.push(item.name);
    //             }
    //         });
    //     });
    //     return result.join('、');
    // }

    // step3 维护一个纯组件所需要的事件表，所有的事件都通过dispatch来更新state
    mapDispatchToProps(dispatch) {
        return {
            onDelete: data => {
                deleteSpec(data, dispatch);
            },
            onOpenEditModal: data => {
                // 初始化编辑数据
                dispatch(actionMap.overrideModalData(unSerializeData(data), dispatch));
                // 打开modal
                dispatch(actionMap.changeModalStatus({ modalVisible: true, isEdit: true }, dispatch));
            }
            // onGetBlackWorldList: ()=> {
            //     getBlackWorldList(dispatch)
            // }
        };
    }

    render() {
        const SList = connect(this.mapStateToProps, this.mapDispatchToProps)(SpecList);
        return (
            <SList/>
        );
    }
}

export class SBoxContainer extends Component {
    mapStateToProps = store => {
        return {
            crtSizeList: store.crtSizeReducer.crtSizeList
        };
    }
    mapDispatchToProps(dispatch) {
        return {
            onSearch: query => {
                window._queryData = query; // todo 先暂时猥琐的解决一下，下次有时间再优化吧
                getSpecList(query, dispatch);
            },
            onGetCrtSize: query => {
                getCrtSizeList(query, dispatch);
            }
        };
    }

    render() {
        // step4 通过connect把2,3跟纯组件绑定，这样store有更新时就会调用2生成props传给纯组件
        // 同理，纯组件的所有事件都会变成调用3里对应的事件方法
        // 这就维护了纯组件的输入和输出的闭环
        // 组件交互产生事件，调用this.props.handler->变成调用mapDispatchToProps里对应的handler，handler进行dispatch->
        // reducer收到dispatch，创建新store->把store传给mapStateToProps，生成props传给组件->组件根据新的props进行rerender
        // 这个方法省去了手动去subscribe，并且把一个组件的所有dispatch集中起来管理
        const SBox = connect(this.mapStateToProps, this.mapDispatchToProps)(FSearchBox);
        return (
            <SBox/>
        );
    }
}

export class SpecPaginationContainer extends Component {
    mapStateToProps(store) {
        const { PageSize, current, total } = store.listReducer.pagination;
        return {
            PageSize,
            current,
            total
        };
    }

    mapDispatchToProps(dispatch) {
        return {
            onChangePage: (PageNo, PageSize) => {
                const data = Object.assign(searchParam, {
                    PageNo: PageNo,
                    PageSize: typeof PageSize === 'undefined' ? searchParam.PageSize : PageSize
                });
                getSpecList(data, dispatch);
            }
        };
    }

    render() {
        const SPagination = connect(this.mapStateToProps, this.mapDispatchToProps)(SpecPagination);
        return (
            <SPagination/>
        );
    }
}
export class EditModalContainer extends Component {
    mapStateToProps = (store) => {
        const { outerData, modalVisible, isEdit } = store.modalReducer;
        return {
            modalVisible,
            data: outerData,
            isEdit
            // blackWorldList: store.blackWorldReducer.blackWorldList
        };
    }

    mapDispatchToProps(dispatch) {
        return {
            onCancel: () => {
                dispatch(actionMap.changeModalStatus({ modalVisible: false }, dispatch));
            },
            onOk: (outerData) => {
                // 校验数据
                const { creativeReducer: creativeList, modalReducer: { isEdit } } = store.getState();
                let validStatus = true;
                // 由于使用antd的getFieldDecorator，触发校验必须直接调用该组件的方法，
                // 临时使用全局变量存放这些需要校验的ref来解决这个问题
                while (1) {
                    // 素材和story的数据校验
                    if (window._refs_) {
                        Object.values(window._refs_).some(item => {
                            if (!item) {
                                return;
                            }
                            item.validateFieldsAndScroll((err) => {
                                if (err) {
                                    validStatus = false;
                                    return true;
                                }
                            })
                        });
                    }
                    if (!validStatus) {
                        break;
                    }
                    break;
                }
                if (!validStatus) {
                    return false;
                }
                // 校验通过，进行序列化
                let formData = {
                    outerData,
                    creativeList: Object.keys(creativeList)
                        .filter((v, k) => k !== dataConst.CREATIVE_TYPE_STRUCT)
                        .reduce((res, key) => (res[key] = creativeList[key], res), {}),
                    creativeStory: creativeList[dataConst.CREATIVE_TYPE_STRUCT][dataConst.CREATIVE_NAME_ELEMENT_STORY]
                };
                let params = serializeData(formData);
                if (!Object.values(JSON.parse(params.oCreativeTemplate)).filter(i => i !== null).length) {
                    message.error('请至少添加一个素材');
                    return false;
                }
                if (isEdit) {
                    editSpec(params, dispatch);
                } else {
                    addSpec(params, dispatch);
                }
            },
            onInfoChange: ({ data } = {}) => {
                dispatch(actionMap.updateEditData({
                    data
                }))
            }
        };
    }

    render() {
        const EditModal = connect(this.mapStateToProps, this.mapDispatchToProps)(FSpecEditModal);
        return (
            <EditModal />
        );
    }
}

export class CreativeEleListContainer extends Component {
    mapStateToProps(store) {
        return {
            data: store.creativeReducer
        };
    }

    mapDispatchToProps(dispatch) {
        return {
            onAdd: ({ type, name } = {}) => {
                dispatch(actionMap.addCreative({ type, name }));
            },
            onDelete: ({ type, id } = {}) => {
                dispatch(actionMap.deleteCreative({
                    type,
                    id
                }));
            },
            onInfoChange: ({ type, name, id, data } = {}) => {
                dispatch(actionMap.updateCreative({
                    type,
                    name,
                    id,
                    data
                }));
            }
        };
    }

    render() {
        const CreativeList = connect(this.mapStateToProps, this.mapDispatchToProps)(CreativeEleList);
        return (
            <CreativeList {...this.props}/>
        );
    }
}

export class CreativeStoryContainer extends Component {
    mapStateToProps(store) {
        const {
            [dataConst.CREATIVE_TYPE_STRUCT]: {
                [dataConst.CREATIVE_NAME_ELEMENT_STORY]: data
            }
        } = store.creativeReducer;

        return {
            data
        };
    }

    mapDispatchToProps(dispatch) {
        return {
            onSwitch: checked => {
                dispatch(actionMap.switchCreativeStory({
                    data: checked
                }))
            },
            onInfoChange: ({ name, type, id, data } = {}) => {
                dispatch(actionMap.updateCreativeStory({
                    name,
                    type,
                    id,
                    data
                }))
            }
        };
    }

    render() {
        const CStory = connect(this.mapStateToProps, this.mapDispatchToProps)(FCreativeStory);
        return (
            <CStory {...this.props} order={0} name={dataConst.CREATIVE_TYPE_OTHER} key={1}/>
        );
    }
}
export class CtrBarContainer extends Component {
    mapDispatchToProps(dispatch) {
        return {
            onOpenEditModal: () => {
                dispatch(actionMap.overrideModalData({
                    outerData: initState.modal.outerData,
                    creative: initState.creative
                }, dispatch));
                dispatch(actionMap.changeModalStatus({ modalVisible: true, isEdit: false }), dispatch);
            }
        };
    }

    render() {
        const CBar = connect(null, this.mapDispatchToProps)(CtrBar);
        return (
            <CBar/>
        );
    }
}

export class CreativeCreateContainer extends Component {
    mapDispatchToProps(dispatch) {
        return {
            onInfoChange: ({ data }) => {
                dispatch(actionMap.changeModalStatus(data), dispatch);
            }
        };
    }

    mapStateToProps(store) {
        const { creativeName } = store.modalReducer;
        return {
            data: creativeName
        }
    }

    render() {
        const CC = connect(this.mapStateToProps, this.mapDispatchToProps)(CreativeCreate);
        return (
            <CC {...this.props}/>
        );
    }
}

function serializeData(data) {
    let { outerData, creativeList, creativeStory } = data;
    console.log('系列化');
    
    console.log(data)
    const {
        [cgiConst.BIZ_ID]: adBizId
    } = outerData;
    const {
        [dataConst.CREATIVE_TYPE_TEXT]: text,
        [dataConst.CREATIVE_TYPE_IMAGE]: images,
        [dataConst.CREATIVE_TYPE_ENUM]: enums,
        [dataConst.CREATIVE_TYPE_URL]: urls
    } = creativeList;
    let textArr = [];
    let imageArr = [];
    let urlArr = [];
    let enumsArr = [];
    /**
     * 文字链
     */
    if (text && text.length) {
        textArr = filterCurCreative(text, adBizId)
            .map(item => {
                let newObj = deepCopy(creativeTpl[item.name]);
                unFlatDimensionData(newObj, item, true);
                return newObj;
            });
    }
    /**
     * 图片
     */
    if (images && images.length) {
        imageArr = filterCurCreative(images, adBizId)
            .map(item => {
                let newObj = deepCopy(creativeTpl[item.name]);
                unFlatDimensionData(newObj, item, true);
                let resource = newObj.dimension.resource;
                Object.assign(resource, {
                    tipslayer: resource ? resource.tipslayer.url : '',
                    watermarklayer: resource ? resource.watermarklayer.url : ''
                });
                newObj['name'] = `${item.name}${item.order > 0 ? item.order + 1 : ''}`;
                if (newObj.default && newObj.default.url) {
                    newObj.default = newObj.default.url;
                }
                return newObj;
            });
    }
    /**
     * url
     */
    if (urls && urls.length) {
        urlArr = filterCurCreative(urls, adBizId)
            .map(item => {
                let newObj = deepCopy(creativeTpl[item.name]);
                unFlatDimensionData(newObj, item, true);
                return newObj;
            });
    }
    /**
     * enums
     */
    if (enums && enums.length) {
        enumsArr = filterCurCreative(enums, adBizId)
            .map(item => {
                let newObj = deepCopy(creativeTpl[item.name]);
                newObj.dimension.option = item['option']['value'];
                return newObj;
            });
    }

    /**
     * 非素材的数据
     */
    const {
        OMGCheck, GDTCheck, cpcCheck, cpmCheck, cpcMin, cpcMax, cpmMin, cpmMax, ocpaCheck, ocpaMax, ocpaMin,
        [cgiConst.SUB_BIZ_ID]: subAdBizId,
        [cgiConst.CRT_SIZE]: dwCrtSize,
        [cgiConst.CRT_SIZE_JRTT]: dwCrtSizeJrtt,
        [cgiConst.CRT_SIZE_OMG]: dwCrtSizeOmg,
        [cgiConst.SPEC_NAME]: adSpecName,
        [cgiConst.SEXAMPLEURL1]: examplePreviewImgUrl1,
        [cgiConst.SEXAMPLEURL2]: examplePreviewImgUrl2,
        [cgiConst.PRODUCT_TYPE]: productType,
        [cgiConst.BLACK_WORLD_TITLE]: sFilterWordDesc,
        // [cgiConst.BLACK_WORLD_METARIAL]: sFilterWordTitle
    } = outerData;
    // 出价类型
    let adBidType = (cpcCheck && cpcCheck[0]) | (cpmCheck && cpmCheck[0]) | (ocpaCheck && ocpaCheck[0]);
    let cpcLimit = (cpcCheck && cpcCheck.length) ? `${cpcCheck[0]}-${cpcMin * 100}:${cpcMax * 100}` : ''; // db存储为分，需x100
    let cpmLimit = (cpmCheck && cpmCheck.length) ? `${cpmCheck[0]}-${cpmMin * 100}:${cpmMax * 100}` : '';
    let opcaLimit = (ocpaCheck && ocpaCheck.length) ? `${ocpaCheck[0]}-${ocpaMin * 100}:${ocpaMax * 100}` : '';
    // 外部规格id
    if (!OMGCheck) {
        outerData.sTangoSpecId = ''
    }
    if (!GDTCheck) {
        outerData.adCrtSize = '';
    }
    let siteArr = getDataMapChild(dataEnum.bizTypeMap, adBizId, subAdBizId).map(item => item.id);
    let curSite = outerData.adSite.filter(item => siteArr.indexOf(item) !== -1);
    let newOuterData = Object.assign({}, editParams.raw, outerData, {
        [cgiConst.PRODUCT_TYPE]: Array.isArray(productType)
            ? encodeBitData(productType)
            : (+productType || dataConst.JDZT),
        [cgiConst.CRT_SIZE]: +dwCrtSize || +dwCrtSizeJrtt || +dwCrtSizeOmg,
        [cgiConst.SPEC_NAME]: adSpecName.trim(),
        [cgiConst.SEXAMPLEURL1]: examplePreviewImgUrl1[0] ? examplePreviewImgUrl1[0]['url'] : '',
        [cgiConst.SEXAMPLEURL2]: examplePreviewImgUrl2[0] ? examplePreviewImgUrl2[0]['url'] : '',
        [cgiConst.PRICE_LIMIT]: [cpcLimit, cpmLimit, opcaLimit].filter(i => i).join('|'),
        [cgiConst.CREATIVE_SIZE]: Math.max(textArr.length, imageArr.length) + enumsArr.length + urlArr.length || 1,
        adBidType,
        adSiteSet: encodeSiteSet(curSite),
        logInfo: `${adSpecId && adSpecId.value ? '编缉' : '添加'}规格[#${adSpecName.trim()}#]`,
        // [cgiConst.BLACK_WORLD_TITLE]: sFilterWordDesc.join('|'),
        // [cgiConst.BLACK_WORLD_METARIAL]: sFilterWordTitle.join('|')
    });

    // 照顾老逻辑，description属于文2，所以算两个素材
    if (+newOuterData[cgiConst.CREATIVE_SIZE] === 1) {
        textArr[0] && (textArr[0]['name'] === dataConst.CREATIVE_NAME_DESCRIPTION)
        && imageArr[0] && (newOuterData[cgiConst.CREATIVE_SIZE] = 2);
    }
    /**
     * 子素材story
     * 目前只支持GDT
     */
    let storyObj;
    if (+adBizId === +dataConst.GDT && creativeStory.isStory) {
        // 个数
        storyObj = deepCopy(creativeTpl[dataConst.CREATIVE_NAME_ELEMENT_STORY]);
        Object.assign(storyObj, getAntdFormDataValue(['min_occurs', 'max_occurs'], creativeStory));
        // 子标题和描述
        let textData = creativeStory[dataConst.CREATIVE_TYPE_TEXT];
        if (textData && textData.length) {
            textData
                .filter(item => item.checked)
                .forEach(item => {
                    let textTpl = deepCopy(creativeTpl[item.name]);
                    unFlatDimensionData(textTpl, item, true);
                    Object.assign(textTpl, {
                        desc: item.name === dataConst.CREATIVE_NAME_TITLE ? '子标题' : '子文案'
                    });
                    Object.assign(storyObj.dimension, {
                        [textTpl.name]: textTpl
                    })
                })
        }
        // 图片
        let imageData = creativeStory[dataConst.CREATIVE_TYPE_IMAGE];
        if (imageData && imageData.length) {
            imageData
                .filter(item => item.checked)
                .forEach(item => {
                    let imageTpl = deepCopy(creativeTpl[item.name]);
                    unFlatDimensionData(imageTpl, item, true);
                    // 获取上传图片的url
                    Object.assign(imageTpl.dimension.resource, {
                        tipslayer: (item.tipslayer && item.tipslayer.value[0]) ? item.tipslayer.value[0].url : '',
                        watermarklayer: (item.watermarklayer && item.watermarklayer.value[0])
                            ? item.watermarklayer.value[0].url : ''
                    });
                    Object.assign(storyObj.dimension, {
                        [imageTpl.name]: imageTpl
                    });
                })
        }
        // url
        let urlData = creativeStory[dataConst.CREATIVE_TYPE_URL];
        if (urlData && urlData.length) {
            urlData
                .filter(item => item.checked)
                .forEach(item => {
                    let urlTpl = deepCopy(creativeTpl[item.name]);
                    unFlatDimensionData(urlTpl, item, true);
                    Object.assign(storyObj.dimension, {
                        [urlTpl.name]: urlTpl
                    });
                });
        }

        // 由于子素材是非必选，如果没填的话，直接传空
        if (!Object.keys(storyObj.dimension).length) {
            storyObj = null;
        }
    }

    /**
     * 兼容老字段，为了方便以后去掉，就不分散到上面的逻辑去了
     */
    if (text && text.length) {
        text.forEach((t, k) => {
            let order = t.name === dataConst.CREATIVE_NAME_TITLE ? '1' : '2';
            if (t.min_length && t.min_length.value) {
                Object.assign(newOuterData, {
                    [`dwCreative${order}TextMinLimit`]: t.min_length.value * 2,
                    [`dwCreative${order}TextMaxLimit`]: t.max_length.value * 2,
                    [`dwCreative${order}Type`]: 1
                })
            }
        });
    }
    if (images && images.length) {
        images.forEach((i, k) => {
            if (i.width && i.width.value) {
                Object.assign(newOuterData, {
                    [`dwCreative${k + 1}Width`]: i.width.value,
                    [`dwCreative${k + 1}Height`]: i.height.value,
                    [`dwCreative${k + 1}ByteLimit`]: i.file_size_KB_limit.value ? kb2Byte(i.file_size_KB_limit.value)
                        : 0,
                    [`dwCreative${k + 1}PicFormat`]: encodeBitData(i.file_format.value),
                    [`sWatermarkLayer${k + 1}`]: (i.watermarklayer && i.watermarklayer.value[0])
                        ? i.watermarklayer.value[0].url : '',
                    [`sTipsLayer${k + 1}`]: (i.tipslayer && i.tipslayer.value[0]) ? i.tipslayer.value[0].url : '',
                    [`dwCreative${k + 1}Type`]: newOuterData[`dwCreative${k + 1}Type`] | 2,
                    [`jdWatermarkPos${k ? k + 1 : ''}`]: (i.jdwatermarkpos && i.jdwatermarkpos.value)
                        ? i.jdwatermarkpos.value : '1',
                    [`sJDWatermarkPic${k ? k + 1 : ''}`]: (i.jdwatermark && i.jdwatermark.value) ? i.jdwatermark.value
                        : '',
                    [`adSpecDesc${k ? k + 1 : ''}`]: i.comment ? i.comment.value : ''
                });
            }
        });
    }
    console.log(Object.assign({}, newOuterData, {
        exampleUrl1: newOuterData.examplePreviewImgUrl1
    },{
        exampleUrl2: newOuterData.examplePreviewImgUrl2
    },{
        bidPriceLimit: newOuterData.adBidPriceLimit
    },{
        oCreativeTemplate: JSON.stringify({
            text: textArr.length ? textArr : null,
            images: imageArr.length ? imageArr : null,
            urls: urlArr.length ? urlArr : null,
            enums: enumsArr.length ? enumsArr : null,
            element_story: storyObj
        })
    }))
    
    // 整合为oCreativeTemplate
    return Object.assign({}, newOuterData, {
        exampleUrl1: newOuterData.examplePreviewImgUrl1
    },{
        exampleUrl2: newOuterData.examplePreviewImgUrl2
    },{
        bidPriceLimit: newOuterData.adBidPriceLimit
    },{
        oCreativeTemplate: JSON.stringify({
            text: textArr.length ? textArr : null,
            images: imageArr.length ? imageArr : null,
            urls: urlArr.length ? urlArr : null,
            enums: enumsArr.length ? enumsArr : null,
            element_story: storyObj
        })
    })
}

function decodePriceType(data) {
    if (!data) {
        return []
    }
    return data.split('|').map(item => {
        let res = item.match(/^([\d.]+)-([\d.]+):([\d.]+)$/);
        let obj = {};
        if (!res) {
            return obj;
        }
        if (+res[1] === +dataConst.CPC) {
            Object.assign(obj, {
                cpcCheck: [res[1]],
                cpcMin: res[2] / 100,
                cpcMax: res[3] / 100
            })
        }
        if (+res[1] === +dataConst.CPM) {
            Object.assign(obj, {
                cpmCheck: [res[1]],
                cpmMin: res[2] / 100,
                cpmMax: res[3] / 100
            })
        }
        if (+res[1] === +dataConst.OCPA) {
            Object.assign(obj, {
                ocpaCheck: [res[1]],
                ocpaMin: res[2] / 100,
                ocpaMax: res[3] / 100
            })
        }
        
        return obj;
    });
}
function formatCreativeTextData(item) {
    // 由于分享标题、广告主名称等用到了default字段，特殊处理
    if (item.name === dataConst.CREATIVE_NAME_SHARE_TITLE
        || item.name === dataConst.CREATIVE_NAME_SHARE_CONTENT
        || item.name === dataConst.CREATIVE_NAME_AD_FROM) {
        Object.assign(item, {
            default: { value: item.default },
        })
    }
}

function formatCreativeImageData(item) {
    // 由于分享图片用到了default字段，图片用到了comment，特殊处理
    Object.assign(item, {
        name: item.name.replace(/\d*$/, ''),
        order: +item.name.replace(/^\w+?(\d*)$/, '$1') ? +item.name.replace(/^\w+?(\d*)$/, '$1') - 1 : 0,
        comment: { value: decodeHtml(item.comment) },
        file_format: { value: decodeBitData(item.file_format.value, dataEnum.formatTypeEnum) },
        min_occurs: { value: item.min_occurs },
        max_occurs: { value: item.max_occurs },
        tipslayer: {
            value: item.tipslayer.value ? [extendObject(editParams.fileList, {
                uid: uniqueId(),
                url: item.tipslayer.value
            })] : []
        },
        watermarklayer: {
            value: item.watermarklayer.value ? [extendObject(editParams.fileList, {
                uid: uniqueId(),
                url: item.watermarklayer.value
            })] : []
        },
        default: (item.default && item.name === dataConst.CREATIVE_NAME_SHARE_IMAGE)
            ? {
                value: [Object.assign({}, editParams.fileList, {
                    uid: uniqueId(),
                    url: item.default
                })]
            }
            : ''
    });
}
function unSerializeData(data) {
    // 非素材的数据
    let { urls, text, images, element_story, enums } = deepCopy(data.oCreativeTemplate);
    let outerData = Object.assign({}, data, { oCreativeTemplate: null });
    let {
        [cgiConst.SEXAMPLEURL1]: examplePreviewImgUrl1,
        [cgiConst.SEXAMPLEURL2]: examplePreviewImgUrl2,
        [cgiConst.SPEC_PROPERTY]: adSpecProperty,
        [cgiConst.PRODUCT_TYPE]: productType,
        [cgiConst.PRICE_LIMIT]: adBidPriceLimit,
        [cgiConst.SITE_SET]: adSiteSet,
        [cgiConst.CRT_SIZE]: adCrtSize,
        [cgiConst.TANGO_ID]: sTangoSpecId,
        [cgiConst.BIZ_ID]: adBizId,
        [cgiConst.CREATIVE_MAIN_TEXT_MAX]: creativeMainTextMax,
        [cgiConst.CREATIVE_MAIN_TEXT_MIN]: creativeMainTextMin,
        [cgiConst.CREATIVE_SUB_TEXT_MAX]: creativeSubTextMax,
        [cgiConst.CREATIVE_SUB_TEXT_MIN]: creativeSubTextMin,
        // [cgiConst.BLACK_WORLD_TITLE]: sFilterWordDesc,
        // [cgiConst.BLACK_WORLD_METARIAL]: sFilterWordTitle
    } = outerData;
    // 出价类型
    decodePriceType(adBidPriceLimit)
        .forEach(item => {
            Object.assign(outerData, item);
        });
    // 其他
    Object.assign(outerData, {
        GDTCheck: !!+adCrtSize,
        OMGCheck: !!+sTangoSpecId,
        [cgiConst.CRT_SIZE]: +adCrtSize || '',
        [cgiConst.CREATIVE_MAIN_TEXT_MAX]: +creativeMainTextMax || '',
        [cgiConst.CREATIVE_MAIN_TEXT_MIN]: +creativeMainTextMin || '',
        [cgiConst.CREATIVE_SUB_TEXT_MAX]: +creativeSubTextMax || '',
        [cgiConst.CREATIVE_SUB_TEXT_MIN]: +creativeSubTextMin || '',
        [cgiConst.CRT_SIZE_JRTT]: adBizId === dataConst.JRTT ? adCrtSize : '',
        [cgiConst.CRT_SIZE_OMG]: adBizId === dataConst.OMG ? adCrtSize : '',
        [cgiConst.AD_SITE]: decodeSiteSet(adSiteSet, getDataMapChild(dataEnum.bizTypeMap, outerData.adBizId, outerData.subAdBizId)),
        [cgiConst.PRODUCT_TYPE]: decodeBitData(productType, dataEnum.operProductTypeEnum), // 产品类型
        [cgiConst.APPJUMP]: decodeProperty(dataConst.APPJUMP, adSpecProperty),
        [cgiConst.WEIXINJUMP]: decodeProperty(dataConst.WECHATJUMP, adSpecProperty),
        [cgiConst.ONE_KEY_CREATIVE]: decodeProperty(dataConst.AUTOCREATIVE, adSpecProperty),
        [cgiConst.SEXAMPLEURL1]: [Object.assign({}, editParams.fileList, { uid: uniqueId(), url: examplePreviewImgUrl1 })],
        [cgiConst.SEXAMPLEURL2]: [Object.assign({}, editParams.fileList, { uid: uniqueId(), url: examplePreviewImgUrl2 })],
        // [cgiConst.BLACK_WORLD_TITLE]: sFilterWordDesc ? sFilterWordDesc.split('|') : [],
        // [cgiConst.BLACK_WORLD_METARIAL]: sFilterWordTitle ? sFilterWordTitle.split('|') : [],
    });

    Object.keys(outerData).forEach(key => {
        outerData[key] = { value: outerData[key] }
    });
    // 素材
    let textArr = [];
    let imageArr = [];
    let enumArr = [];
    let urlArr = [];
    let creativeStory = {};
    if (text && text.length) {
        textArr = text.map(item => {
            flatDimensionData(item);
            formatCreativeTextData(item);
            return item;
        });
    }
    if (images && images.length) {
        // 按不同类型和大小排序
        // ['image2', 'share_image2', 'image', 'share_image'] => ['image', 'image2', 'share_image', 'share_image2']
        imageArr = images
            .sort((prev, next) => {
                const prevName = prev.name.replace(/(.+?)\d*$/, '$1');
                const nextName = next.name.replace(/(.+?)\d*$/, '$1');
                const prevId = +prev.name.replace(/.+?(\d*)$/, '$1');
                const nextId = +next.name.replace(/.+?(\d*)$/, '$1');
                if (prevName === nextName) {
                    return prevId > nextId;
                }
                return prevName > nextName;
            })
            .map(item => {
                flatDimensionData(item);
                formatCreativeImageData(item);
                return item;
            });
    }
    if (enums && enums.length) {
        enumArr = enums.map(item => {
            return Object.assign({}, item, {
                id: uniqueId(),
                option: { value: item.dimension ? item.dimension.option : [] }
            })
        })
    }
    if (urls && urls.length) {
        urlArr = urls.map(item => {
            flatDimensionData(item);
            return item;
        });
    }
    let creativeList = {
        [dataConst.CREATIVE_TYPE_TEXT]: textArr,
        [dataConst.CREATIVE_TYPE_IMAGE]: imageArr,
        [dataConst.CREATIVE_TYPE_ENUM]: enumArr,
        [dataConst.CREATIVE_TYPE_URL]: urlArr
    };
    // story
    if (element_story && element_story.dimension && Object.keys(element_story.dimension)) {
        creativeStory = Object.assign(element_story, {
            isStory: true,
            min_occurs: { value: element_story['min_occurs'] },
            max_occurs: { value: element_story['max_occurs'] }
        });
        let { dimension } = creativeStory;
        Object.values(dimension).forEach(item => {
            let type = item.type;
            // 文字链
            if (type === dataConst.CREATIVE_TYPE_TEXT) {
                flatDimensionData(item);
                Object.assign(item, {checked: true})
                let text = creativeStory[dataConst.CREATIVE_TYPE_TEXT]
                    = creativeStory[dataConst.CREATIVE_TYPE_TEXT] || [];
                text.push(item);
                return;
            }
            // 图片
            if (type === dataConst.CREATIVE_TYPE_IMAGE) {
                flatDimensionData(item);
                formatCreativeImageData(item);
                Object.assign(item, {checked: true})
                let image = creativeStory[dataConst.CREATIVE_TYPE_IMAGE]
                    = creativeStory[dataConst.CREATIVE_TYPE_IMAGE] || [];
                image.push(item);
                return;
            }
            // url
            if (type === dataConst.CREATIVE_TYPE_URL) {
                flatDimensionData(item);
                Object.assign(item, {checked: true})
                let url = creativeStory[dataConst.CREATIVE_TYPE_URL]
                    = creativeStory[dataConst.CREATIVE_TYPE_URL] || [];
                url.push(item);
                return;
            }
        });
    }
    return {
        outerData,
        creative: {
            ...creativeList,
            [dataConst.CREATIVE_TYPE_STRUCT]: {
                [dataConst.CREATIVE_NAME_ELEMENT_STORY]: creativeStory
            }
        }
    };
}
