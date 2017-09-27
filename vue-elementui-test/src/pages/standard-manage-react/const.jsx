/**
 * Created by chenjiawei1 on 2017/1/11.
 */
import fetchCgi from 'util.fetch';
import { message } from 'antd';
import {dataConst, dataEnum} from './config.const.js';

/**
 * 素材表
 * name: 映射到creativeTpl对应的素材上
 * alias：显示出来的名称
 * type: 决定了存储在store里的位置
 * mediaType: 该素材适用于哪些媒体类型
 * maxinum: 该素材可以添加的最大个数
 * @type {[*]}
 */
export const creativeTypeEnum = [
    {
        name: dataConst.CREATIVE_NAME_TITLE,
        alias: '标题',
        type: dataConst.CREATIVE_TYPE_TEXT,
        mediaType: [dataConst.GDT, dataConst.JRTT, dataConst.OMG, dataConst.BAIDU],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_DESCRIPTION,
        alias: '描述',
        type: dataConst.CREATIVE_TYPE_TEXT,
        mediaType: [dataConst.GDT, dataConst.JRTT, dataConst.BAIDU],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_CONTENT,
        alias: 'content',
        type: dataConst.CREATIVE_TYPE_TEXT,
        mediaType: [dataConst.OMG],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_IMAGE,
        alias: '图片',
        type: dataConst.CREATIVE_TYPE_IMAGE,
        mediaType: [dataConst.GDT, dataConst.JRTT, dataConst.OMG, dataConst.BAIDU],
        maximum: 3
    },
    {
        name: dataConst.CREATIVE_NAME_SORTABLE,
        alias: 'Sortable',
        type: dataConst.CREATIVE_TYPE_ENUM,
        mediaType: [dataConst.GDT],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_URL,
        alias: 'URL',
        type: dataConst.CREATIVE_TYPE_URL,
        mediaType: [dataConst.GDT],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_SHARE_TITLE,
        alias: '分享标题',
        type: dataConst.CREATIVE_TYPE_TEXT,
        mediaType: [dataConst.OMG],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_SHARE_CONTENT,
        alias: '摘要',
        type: dataConst.CREATIVE_TYPE_TEXT,
        mediaType: [dataConst.OMG],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_SHARE_IMAGE,
        alias: '分享配图',
        type: dataConst.CREATIVE_TYPE_IMAGE,
        mediaType: [dataConst.OMG],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_AD_FROM,
        alias: '广告主名称',
        type: dataConst.CREATIVE_TYPE_TEXT,
        mediaType: [dataConst.OMG],
        maximum: 1
    },
    {
        name: dataConst.CREATIVE_NAME_IMAGE_LIST,
        alias: '图片集合(image_list)',
        type: dataConst.CREATIVE_TYPE_IMAGE,
        mediaType: [dataConst.GDT],
        maximum: 1
    }
];

/**
 * CGI请求的key
 * 由于每个表单域都要映射到这些key，并且在serialize和unserialize时也经常用到
 * 所以用常量替代，方便以后相关字段的变更
 */
export const cgiConst = {
    BIZ_ID: 'adBizId',
    SUB_BIZ_ID: 'subAdBizId',
    SPEC_ID: 'adSpecId',
    SPEC_NAME: 'adSpecName',
    AD_SITE: 'adSite',
    SITE_SET: 'adSiteSet',
    GDT_CHECK: 'GDTCheck',
    OMG_CHECK: 'OMGCheck',
    TANGO_ID: 'sTangoSpecId',
    CRT_SIZE: 'adCrtSize',
    CRT_SIZE_JRTT: 'adCrtSize2',
    CRT_SIZE_OMG: 'adCrtSize3',
    CRT_TYPE: 'adCrtType',
    PLATFORM: 'showPlatform',
    AUDIT_TYPE: 'auditType',
    PRODUCT_TYPE: 'productType',
    AUTO_TYPE: 'autoType',
    APPJUMP: 'appJumpType',
    WEIXINJUMP: 'wechatJumpType',
    LIMIT: 'adSpecLimit',
    ONE_KEY_CREATIVE: 'oneKeyCreativeType',
    SEXAMPLEURL1: 'examplePreviewImgUrl1',
    SEXAMPLEURL2: 'examplePreviewImgUrl2',
    PRICE_LIMIT: 'adBidPriceLimit',
    CREATIVE_SIZE: 'creativeSize',
    BEGIN_TIME: 'beginTime',
    END_TIME: 'endTime',
    LAST_MOD_TIME: 'lastModTimeMs',
    LAST_MOD_TIME_SHOW: 'lastModTimeMsShow',
    PAGE_NO: 'pageNo',
    PAGE_SIZE: 'pageSize',
    MOD_BY: 'modifyBy',
    CREATIVE_MAIN_TEXT_MIN: 'dwCreativeMainTextMinLimit',
    CREATIVE_MAIN_TEXT_MAX: 'dwCreativeMainTextMaxLimit',
    CREATIVE_SUB_TEXT_MIN: 'dwCreativeSubTextMinLimit',
    CREATIVE_SUB_TEXT_MAX: 'dwCreativeSubTextMaxLimit',
    SPEC_PROPERTY: 'adSpecProperty',
    BID_TYPE: 'adBidType',
    BLACK_WORLD_TITLE: 'sFilterWordDesc',
    BLACK_WORLD_METARIAL: 'sFilterWordTitle'
};

/**
 * 初始查询参数
 * @type {{}}
 */
export const searchParam = {
    [cgiConst.SPEC_NAME]: '',
    [cgiConst.BIZ_ID]: 0,
    [cgiConst.SUB_BIZ_ID]: 0,
    [cgiConst.BEGIN_TIME]: '',
    [cgiConst.END_TIME]: '',
    [cgiConst.LIMIT]: -1,
    [cgiConst.AD_SITE]: '',
    [cgiConst.AUTO_TYPE]: -1,
    [cgiConst.APPJUMP]: -1,
    [cgiConst.WEIXINJUMP]: -1,
    [cgiConst.ONE_KEY_CREATIVE]: -1,
    [cgiConst.PAGE_NO]: 1,
    [cgiConst.PAGE_SIZE]: 20,
    [cgiConst.BID_TYPE]: 0
};

/**
 * 初始化规格ID查询参数
 * @type {{}}
 */
export const crtsizeParam = {
    [cgiConst.BIZ_ID]: 0,
    [cgiConst.SUB_BIZ_ID]: 0,
    [cgiConst.PAGE_NO]: 1,
    [cgiConst.PAGE_SIZE]: 100
};

/**
 * 素材模板，不同name的素材都维护一份模板，共用容易出问题
 * @type {{}}
 */
export const creativeTpl = {
    [dataConst.CREATIVE_NAME_TITLE]: {
        name: dataConst.CREATIVE_NAME_TITLE,
        desc: '标题',
        comment: '',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_TEXT,
        dimension: {
            content: {
                min_length: 0,
                max_length: 0
            }
        }
    },
    [dataConst.CREATIVE_NAME_DESCRIPTION]: {
        name: dataConst.CREATIVE_NAME_DESCRIPTION,
        desc: '文案',
        comment: '',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_TEXT,
        dimension: {
            content: {
                min_length: 0,
                max_length: 0
            }
        }
    },
    [dataConst.CREATIVE_NAME_CONTENT]: {
        name: dataConst.CREATIVE_NAME_CONTENT,
        desc: '广告文字',
        comment: '',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_TEXT,
        dimension: {
            content: {
                min_length: 0,
                max_length: 0
            }
        }
    },
    [dataConst.CREATIVE_NAME_IMAGE]: {
        name: dataConst.CREATIVE_NAME_IMAGE,
        desc: '图片',
        comment: '',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_IMAGE,
        dimension: {
            resource: {
                width: '0',
                height: '0',
                file_size_KB_limit: 0,
                file_format: 0,
                min_duration: 0,
                max_duration: 0,
                duration_type: '',
                jdwatermarkpos: 1,
                jdwatermark: '',
                watermarklayer: '',
                tipslayer: ''
            }
        }
    },
    [dataConst.CREATIVE_NAME_SHARE_TITLE]: {
        name: dataConst.CREATIVE_NAME_SHARE_TITLE,
        desc: '分享标题',
        comment: '京东商城',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_TEXT,
        dimension: {
            content: {
                min_length: 0,
                max_length: 0
            }
        }
    },
    [dataConst.CREATIVE_NAME_SHARE_CONTENT]: {
        name: dataConst.CREATIVE_NAME_SHARE_CONTENT,
        desc: '分享摘要',
        comment: '京东商城',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_TEXT,
        dimension: {
            content: {
                min_length: 0,
                max_length: 0
            }
        }
    },
    [dataConst.CREATIVE_NAME_SHARE_IMAGE]: {
        name: dataConst.CREATIVE_NAME_SHARE_IMAGE,
        desc: '分享配图',
        comment: '',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_IMAGE,
        dimension: {
            resource: {
                width: '114',
                height: '114',
                file_size_KB_limit: 30,
                file_format: 1,
                min_duration: 0,
                max_duration: 0,
                duration_type: '',
                jdwatermarkpos: 0,
                jdwatermark: '',
                watermarklayer: '',
                tipslayer: ''
            }
        }
    },
    [dataConst.CREATIVE_NAME_AD_FROM]: {
        name: dataConst.CREATIVE_NAME_AD_FROM,
        desc: '广告主名称',
        comment: '京东商城',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_TEXT,
        dimension: {
            content: {
                min_length: 0,
                max_length: 0
            }
        }
    },
    [dataConst.CREATIVE_NAME_SORTABLE]: {
        name: dataConst.CREATIVE_NAME_SORTABLE,
        desc: '自动优化图片排序',
        comment: {
            0: '自动优化',
            1: '顺序播放'
        },
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '1',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_ENUM,
        dimension: {
            option: [
                '0',
                '1'
            ]
        },
        title: '自动优化图片排序',
        caption: '自动优化图片排序'
    },
    [dataConst.CREATIVE_NAME_URL]: {
        name: dataConst.CREATIVE_NAME_URL,
        desc: '链接',
        comment: '',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_URL,
        dimension: {
            content: {
                min_length: 1,
                max_length: 1024,
                pattern: '^https?:\\/\\/([a-zA-Z0-9\\-]+\\.)+([a-zA-Z]{2,4})([\\/\\?#][a-zA-Z0-9`~!@#%&_=;\\$\\^\\*\\(\\)\\-\\+\\{\\}\\[\\]\\:\\,\\.\\?\\/\\|]*)?$'
            }
        },
        title: '链接',
        caption: '请输入链接地址'
    },

    [dataConst.CREATIVE_NAME_ELEMENT_STORY]: {
        name: dataConst.CREATIVE_NAME_ELEMENT_STORY,
        desc: '素材',
        comment: '',
        use: 'repeated',
        min_occurs: 3,
        max_occurs: 3,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_STRUCT,
        dimension: {}
    },

    [dataConst.CREATIVE_NAME_IMAGE_LIST]: {
        name: dataConst.CREATIVE_NAME_IMAGE_LIST,
        desc: '图片',
        comment: '',
        use: 'repeated',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: dataConst.CREATIVE_TYPE_IMAGE,
        dimension: {
            resource: {
                width: '0',
                height: '0',
                file_size_KB_limit: 0,
                file_format: 0,
                min_duration: 0,
                max_duration: 0,
                duration_type: '',
                jdwatermarkpos: 1,
                jdwatermark: '',
                watermarklayer: '',
                tipslayer: ''
            }
        },
        title: '图片',
        caption: '请上传图片'
    }
};

export const editParams = {
    raw: {
        adBizId: 0,
        creativeSize: 1,
        exampleUrl1: '',
        exampleUrl2: '',
        adSpecName: '',
        adSpecDesc: '',
        adSpecLimit: 0,
        sTangoSpecId: 0,
        adCrtType: 0,
        adCrtSize: 0,
        adBidType: 0,
        bidPriceLimit: '',
        jdWatermarkPos: 1,
        sJDWatermarkPic: '',
        showPlatform: 1,
        auditType: 2,
        subAdBizId: 0,
        adSiteSet: 0,
        autoType: 0,
        productType: 2,
        appJumpType: 0,
        wechatJumpType: 0,
        oneKeyCreativeType: 0,
        logInfo: '',
        oCreativeTemplate: '',
        adSpecId: 0,
        imageMd5: 0,
        oneKeyCreativeCfg: ''
        // oneKeyCreativeCfg: {
        //     maintext: {
        //         min_length: 12,
        //         max_length: 44
        //     },
        //     subtext: {
        //         min_length: 12,
        //         max_length: 44
        //     }
        // }
        // 一下为兼容老业务，等投放工具更新了，这一块可以去掉
        // dwCreative1Type: 0,
        // dwCreative1Width: '',
        // dwCreative1Height: '',
        // dwCreative1ByteLimit: '',
        // dwCreative1PicFormat: '',
        // dwCreative1TextMinLimit: '',
        // dwCreative1TextMaxLimit: '',
        // sWatermarkLayer1: '',
        // sTipsLayer1: ''
    },
    fileList: {
        lastModified: 1486546222552,
        lastModifiedDate: '2017-02-08T09:30:22.552Z',
        name: '',
        size: 67929,
        type: 'image/png',
        uid: 'rc-upload-1491540118401-3',
        response: {
            result: '0',
            msg: '',
            data: ''
        },
        percent: 100,
        originFileObj: { uid: 'rc-upload-1491540118401-3' },
        status: 'done',
        thumbUrl: '',
        url: ''
    }
};

/**
 * 分页的初始信息
 * @type {{size: string, showSizeChanger: boolean, showQuickJumper: boolean, total: number, pageSize: number, current:
 *     number, onChange: null, onShowSizeChange: null, pageSizeOptions: string[]}}
 */
export const initialPagination = {
    size: 'small',
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0,
    pageSize: 20,
    current: 1,
    onChange: null,
    onShowSizeChange: null,
    pageSizeOptions: ['20', '50', '100', '200']
};

export const cgiMap = {
    // blackWorldList: '//xoa.pp.jd.com/xoa/blackword/blackword/list',  // 黑词列表
    specList: '//xoa.pp.jd.com/xoa/ztexp/adspec/querylist', // 查询规格列表
    specAdd: '//xoa.pp.jd.com/xoa/ztexp/adspec/add', // 新增规格
    specEdit: '//xoa.pp.jd.com/xoa/ztexp/adspec/update', // 修改规格
    specInfo: '//xoa.pp.jd.com/php/exp/adpos/cgi/exp_adspec_check.php', // 查询规格详情信息
    specDelete: '//xoa.pp.jd.com/php/exp/adpos/cgi/exp_adspec_del.php', // 删除规格
    specNameCheck: '//xoa.pp.jd.com/php/exp/adpos/cgi/exp_adspec_check.php', // 检查规格名称是否重复
    uploadImg: '//xoa.pp.jd.com/php/exp/adpos/cgi/exp_adspec_uploadImg.php', // 素材示例图上传
    uploadLayer: '//xoa.pp.jd.com/php/exp/adpos/cgi/exp_adspec_uploadLayerImg.php', // 水印/提示图层
    uploadShareImg: '//xoa.pp.jd.com/php/exp/adpos/cgi/exp_adspec_uploadCrtelemImg.php' // 分享图层
};

export const actionTypeMap = {
    GET_SPEC_LIST_SUCC: 'GET_SPEC_LIST_SUCC', // 列表拉取成功
    GET_CRT_SIZE_SUCC: 'GET_CRT_SIZE_SUCC', // 拉去规格ID crtsize信息
    CHANGE_MODAL_STATUS: 'CHANGE_MODAL_STATUS', // 切换modal状态
    ADD_CREATIVE: 'ADD_CREATIVE', // 添加素材card
    DELETE_CREATIVE: 'DELETE_CREATIVE', // 删除素材card
    UPDATE_CREATIVE: 'UPDATE_CREATIVE', // 更新素材数据card
    SWITCH_CREATIVE_STORY: 'SWITCH_CREATIVE_STORY', // 是否展示素材集合story
    UPDATE_CREATIVE_STORY: 'UPDATE_CREATIVE_STORY', // 更新素材集合story数据
    UPDATE_EDIT_DATA: 'UPDATE_EDIT_DATA', // 更新非素材数据
    OVERRIDE_MODAL_DATA: 'OVERRIDE_MODAL_DATA', // 更改整个编辑数据
    GET_BLACK_WORLD: 'GET_BLACK_WORLD'  // 拉取黑词
};

export const initState = {
    list: {
        specList: [],
        pagination: {
            total: initialPagination.total,
            current: initialPagination.current,
            pageSize: initialPagination.pageSize
        }
    },
    modal: {
        modalVisible: false,
        outerData: {
            [cgiConst.BIZ_ID]: {value: dataConst.GDT},
            [cgiConst.SUB_BIZ_ID]: {value: dataConst.GDT_QZONE},
            [cgiConst.CRT_TYPE]: {value: dataEnum.jrttCrtTypeEnum[0]['id']},
            [cgiConst.PLATFORM]: {value: dataConst.PC}
        }
    },
    creative: {
        [dataConst.CREATIVE_TYPE_STRUCT]: {
            [dataConst.CREATIVE_NAME_ELEMENT_STORY]: {
                isStory: false
            }
        }
    }
};


export const actionMap = {
    getSpecListSucc: data => {
        // debugger;
        console.log('getSpecListSucc');
        console.log(data);
        return {
            type: actionTypeMap.GET_SPEC_LIST_SUCC,
            payload: data
        };
    },

    changeModalStatus: data => {
        return {
            type: actionTypeMap.CHANGE_MODAL_STATUS,
            payload: data
        };
    },

    overrideModalData: data => {
        return {
            type: actionTypeMap.OVERRIDE_MODAL_DATA,
            payload: data
        };
    },

    addCreative: data => {
        return {
            type: actionTypeMap.ADD_CREATIVE,
            payload: data
        };
    },

    // 删除素材
    deleteCreative: data => {
        return {
            type: actionTypeMap.DELETE_CREATIVE,
            payload: data
        };
    },

    // 更新素材
    updateCreative: data => {
        return {
            type: actionTypeMap.UPDATE_CREATIVE,
            payload: data
        };
    },

    // 切换子素材即可开关
    switchCreativeStory: data => {
        return {
            type: actionTypeMap.SWITCH_CREATIVE_STORY,
            payload: data
        };
    },

    // 更新子素材集合
    updateCreativeStory: data => {
        return {
            type: actionTypeMap.UPDATE_CREATIVE_STORY,
            payload: data
        };
    },

    updateEditData: data => {
        return {
            type: actionTypeMap.UPDATE_EDIT_DATA,
            payload: data
        };
    },

    getCrtSizeSucc: data => {
        return {
            type: actionTypeMap.GET_CRT_SIZE_SUCC,
            payload: data
        };
    }

    // getBlackWorldSucc: data => {
    //     return {
    //         type: actionTypeMap.GET_BLACK_WORLD,
    //         payload: data
    //     };
    // }
};

function getErrmsg(code) {
    return errorEnum[code] || '网络错误';
}
const errorEnum = {
    '-6': '参数错误',
    '-7': '无权限',
    '-8': '获取配置异常',

    1000: '查询规格总数失败',
    1001: '分页查询规格失败',
    1002: '添加规格失败',
    1003: '查询规格失败',
    1004: '编辑规格失败',
    1005: '删除规格失败',
    1008: '添加操作日志失败',

    1031: '获取广告规格序列值错误',
    1032: '广告规格不存在',
    1033: '广告规格存在广告位，不允许删除',
    1035: '规格名称不允许重复'
};
function errHandler(msg) {
    message.error(msg, 3);
}
export const editSpec = function(data, dispatch) {
    fetchCgi({
        url: cgiMap.specEdit,
        data,
        getErrmsg,
        method: 'post',
        errHandler
    }).then(() => {
        message.success('编辑规格成功');
        dispatch(actionMap.changeModalStatus({ modalVisible: false }));
        getSpecList(window._queryData, dispatch);
    });
};

export const addSpec = function(data, dispatch) {
    fetchCgi({
        url: cgiMap.specAdd,
        data,
        getErrmsg,
        method: 'post',
        errHandler
    }).then(() => {
        message.success('添加规格成功');
        dispatch(actionMap.changeModalStatus({ modalVisible: false }));
        getSpecList(window._queryData, dispatch);
    });
};
export const getSpecList = function(query = searchParam, dispatch) {
    fetchCgi({
        url: cgiMap.specList,
        data: query,
        getErrmsg,
        method: 'post',
        errHandler
    }).then(data => {
        dispatch(actionMap.getSpecListSucc(data));
    });
};

export const deleteSpec = function(data, dispatch) {
    fetchCgi({
        url: cgiMap.specDelete,
        getErrmsg,
        data: {
            adSpecId: data.adSpecId,
            logInfo: `删除规格[#${data.adSpecName}#]`
        },
        method: 'post',
        errHandler
    }).then(() => {
        message.success('规格已删除');
        getSpecList(window._queryData, dispatch);
    });
};

export const getCrtSizeList = function(query = crtsizeParam, dispatch) {
    fetchCgi({
        url: cgiMap.specList,
        data: query,
        getErrmsg,
        method: 'post',
        errHandler
    }).then(data => {
        dispatch(actionMap.getCrtSizeSucc(data));
    });
};

// export const getBlackWorldList = function(dispatch) {
//     fetchCgi({
//         url: cgiMap.blackWorldList,
//         getErrmsg,
//         method: 'get',
//         errHandler
//     }).then(data => {
//         dispatch(actionMap.getBlackWorldSucc(data));
//     });
// };

