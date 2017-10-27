/**
 * Created by chenjiawei1 on 2017/5/11.
 */
import { dataEnum } from './common/config.dataEnum';
    // 常量
export const dataConst = {
        // creative name
    CREATIVE_NAME_TITLE: 'title',
    CREATIVE_NAME_CONTENT: 'content',
    CREATIVE_NAME_DESCRIPTION: 'description',
    CREATIVE_NAME_IMAGE: 'image',
    CREATIVE_NAME_SORTABLE: 'sortable',
    CREATIVE_NAME_URL: 'url',
    CREATIVE_NAME_SHARE_TITLE: 'share_title',
    CREATIVE_NAME_SHARE_CONTENT: 'share_content',
    CREATIVE_NAME_AD_FROM: 'ad_from',
    CREATIVE_NAME_SHARE_IMAGE: 'share_image',
    CREATIVE_NAME_IMAGE_LIST: 'image_list',
    CREATIVE_NAME_ELEMENT_STORY: 'element_story',
    CREATIVE_NAME_CORPORATE: 'corporate',

        // creative type
    CREATIVE_TYPE_IMAGE: 'IMAGE',
    CREATIVE_TYPE_TEXT: 'TEXT',
    CREATIVE_TYPE_URL: 'URL',
    CREATIVE_TYPE_ENUM: 'ENUM',
    CREATIVE_TYPE_CORPORATE: 'CORPORATE',
    CREATIVE_TYPE_STRUCT: 'STRUCT',
    CREATIVE_TYPE_OTHER: 'OTHER',
        // boolean
    TRUE: '1',
    FALSE: '0',
        // platform
    PC: '1',
    MOBILE: '2',
        // biz type
    GDT: '1',
    JRTT: '2',
    OMG: '3',
    BAIDU: '4',
        // sub biz type
    GDT_QZONE: '3',
    GDT_WILLLESS: '6',
    GDT_WECHAT: '10',
    TT_WILLLESS: '7',
    OMG_PC: '8',
    OMG_WILLLESS: '9',
    BAIDU_WILLLESS: '11',
        // audit
    AUDIT_FIRST: '2',
    AUDIT_LAST: '1',
        // CORPORATE
    CORPORATE_FIRST: '1',
    CORPORATE_LAST: '2',
        // price
    CPC: `${1 << 0}`,
    CPM: `${1 << 1}`,
    CPT: `${1 << 2}`,
    OCPA: `${1 << 3}`,
        // property
    APPJUMP: '2',
    WECHATJUMP: '4',
    AUTOCREATIVE: '8',
        // product type
    OPERAD: `${1 << 0}`,
    JDZT: `${1 << 1}`
};

/* 数据映射表,采用key+value防止遍历时自动排序
 *  站点ID是从0开始遍历，后端是1，因此每个站点ID都要比接口文档定义的减1
 * */

export { dataEnum };