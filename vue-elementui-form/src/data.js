import {
    textConst,
    imageConst,
    imageListConst,
    urlConst,
    enumConst,
    elementStoryConst,
    corporateConst,
    encodeSiteSet
} from './util';

function mergeCreativeElements(addData, item) {
    let { type, name, desc } = item;
    let obj = {};
    obj.name = name;
    obj.desc = desc;
    switch (type) {
        case 'TEXT':
            obj.min_length = item.min * 2;
            obj.max_length = item.max * 2;
            addData.text = addData.text ? addData.text : [];
            addData.text.push(textConst(obj));
            break;
        case 'IMAGE':
            let fileFormat = 0;   // 图片格式 jpg 1，  png 2，  gif 4
            if (item.format.length > 0) {
                fileFormat = item.format.reduce((i1, i2) => i1 | i2);
            }
            let imageObj = Object.assign({}, obj, {
                width: item.width,
                height: item.height,
                file_size_KB_limit: item.picSize,
                fileFormat,
                jdwatermarkpos: item.position,
                jdwatermark: item.picLink,
                comment: item.picContent
            });
            addData.images = addData.images ? addData.images : [];
            if (name === 'image') {
                addData.images.push(imageConst(imageObj));
            }
            if (name === 'image_list') {
                imageObj.min_occurs = item.setListMin;
                imageObj.max_occurs = item.setListMax;
                addData.images.push(imageListConst(imageObj));
            }
            break;
        case 'ENUM':
            obj.desc = {
                0: '自动优化',
                1: '顺序播放'
            };
            obj.option = item.sortFlag;
            addData.enums = addData.enums ? addData.enums : [];
            addData.enums.push(enumConst(obj));
            break;
        case 'URL':
            obj.min_length = item.urlMin * 2;
            obj.max_length = item.urlMax * 2;
            addData.urls = addData.urls ? addData.urls : [];
            addData.urls.push(urlConst(obj));
            break;
        case 'STRUCT':
            if (name === 'element_story') {
                console.log(item);
                addData.element_story = elementStoryConst(item);
            }
            if (name === 'corporate') {
                let fileFormat = 0;   // 图片格式 jpg 1，  png 2，  gif 4
                if (item.format.length > 0) {
                    fileFormat = item.format.reduce((i1, i2) => i1 | i2);
                }
                let corporateObj = Object.assign({}, obj, {
                    max: item.max * 2,
                    min: item.min * 2,
                    width: item.width,
                    height: item.height,
                    file_size_KB_limit: item.picSize,
                    fileFormat,
                    comment: item.content,
                    gdtuin: item.gdtuin,
                    desc: item.desc
                });
                addData.corporate = addData.corporate ? addData.corporate : [];
                addData.corporate = corporateConst(corporateObj);
            }
            break;
    }
}

export function mergeCrt(form) {
    let adBidPriceLimit = '';  // 出价类型，出价范围
    if (form.adBidTypeCPCFlag) { // cpc
        adBidPriceLimit = form.adBidTypeCPCFlag
            ? '1-' + form.adBidTypeCPCMin * 100 + ':' + form.adBidTypeCPCMax * 100 : '';
    }
    if (form.adBidTypeCPMFlag) { // cpm
        adBidPriceLimit = form.adBidTypeCPMFlag
            ? adBidPriceLimit + '|2-' + form.adBidTypeCPMMin * 100 + ':' + form.adBidTypeCPMMax * 100 : adBidPriceLimit;
    }
    return adBidPriceLimit;
}

export function mergeData(form) {
    console.log(form);

    let creativeElements = form.creativeElements;
    let creativeSetElements = form.creativeSetElements;
    let addData = {
        text: null,
        images: null,
        urls: null,
        enums: null,
        element_story: null,
        corporate: null
    };
    for (var i in creativeElements) {
        let item = creativeElements[i];
        if (item.open) {
            mergeCreativeElements(addData, item);
        }
    }
    if (creativeSetElements.open) {
        mergeCreativeElements(addData, creativeSetElements);
    }
    console.log(addData);
    let s = {
        adBizId: 1,  // 业务id
        examplePreviewImgUrl1: form.examplePreviewImgUrl1,
        examplePreviewImgUrl2: form.examplePreviewImgUrl2,
        adSpecName: form.adSpecName,  // 广告位规格名称
        adSpecDesc: '',     // 广告位规格描述
        adSpecLimit: 0,     // 规格权限，与用户权限对应0：表示没有权限限制1：需要权限校验   ????
        adCrtType: 0,       // 素材类型   ????
        adCrtSize: form.adSpecGdt,
        adBidType: 1,   // 出价类型  ???????????????????????????????????????
        adSpecType: form.specType,   // 广告规格标的物类型
        showPlatform: form.showPlat, // 投放平台。1:PC端; 2:无线端;
        auditType: form.auditType,   // 审核规则。1：先发后审；2：先审后发。
        subAdBizId: form.subAdBizId,                // 直通车子业务类型
        adSiteSet: encodeSiteSet(form.adSiteSet),   // 站点信息
        adBidPriceLimit: mergeCrt(form),            // 出价范围
        autoType: 0,        // 自动化投放规格
        productType: 8,     // 上线产品
        appJumpType: 0,     // 支持应用直达, 0:否, 1:是
        wechatJumpType: 0,  // 支持微信直达, 0:否, 1:是
        oneKeyCreativeType: 0,   // 支持一键创意, 0:否, 1:是
        logInfo: '添加规格[#' + form.adSpecName + '#]', // 日志记录
        oCreativeTemplate: JSON.stringify(addData),
        imageMd5Flag: 0,   // 图片链接是否需要md5
        oneKeyCreativeCfg: ''  // 一键创意信息  //变动的地方，将一键创意的四个长度字段
    };
    return s;
}