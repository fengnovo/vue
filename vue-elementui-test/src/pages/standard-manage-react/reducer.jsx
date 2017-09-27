/**
 * Created by chenjiawei1 on 2017/1/11.
 */
import { combineReducers } from 'redux';
import { actionTypeMap, initState, cgiConst, creativeTpl } from './const.jsx';
import { dataConst } from './config.const.js';
import { extendObject, deepCopy, decodeHTML, typeIs, uniqueId } from 'util.helper';

const listReducer = (state = initState.list, action) => {
    // step5 收到dispatch后，返回新的store，不能有任何副作用
    const { payload, type } = action;
    switch (type) {
        case actionTypeMap.GET_SPEC_LIST_SUCC:
            if (payload.data && payload.data.list && payload.data.list.length) {
                payload.data.list.forEach(i => {
                    Object.keys(i).forEach(key => {
                        // 由于antd控件的值都必须为string，所以这里统一转一下
                        if (typeIs(i[key]) === 'number') {
                            i[key] = i[key].toString();
                        }
                    });
                    // 这里要么在使用的时候去decode，要么直接在数据源头decode。
                    // 前者可以避免xss风险，但麻烦，每次使用都得decode；
                    // 后者方便，但如果有进行innerHTML之类的操作，必须做一层encode来规避xss
                    i[cgiConst.SPEC_NAME] = decodeHTML(i[cgiConst.SPEC_NAME]);
                });
            }
            let { list, PageSize, PageNo, total } = payload.data;
            return {
                ...state,
                specList: list,
                pagination: {
                    pageSize: +PageSize,
                    current: +PageNo,
                    total: +total
                }
            };
        default:
            return state;
    }
};

const crtSizeReducer = (state = initState.list, action) => {
    // step5 收到dispatch后，返回新的store，不能有任何副作用
    const { payload, type } = action;
    switch (type) {
        case actionTypeMap.GET_CRT_SIZE_SUCC:
            let data = [];
            let obj = {};
            if (payload.data && payload.data.list && payload.data.list.length) {
                payload.data.list = payload.data.list.forEach(i => {
                    if (!obj[i.adCrtSize]) {
                        data.push({
                            id: i.adCrtSize,
                            name: i.adCrtSize
                        });
                        obj[i.adCrtSize] = true;
                    }
                });
            }

            return {
                ...state,
                crtSizeList: data
            };
        default:
            return state;
    }
};

const creativeReducer = (state = initState.creative, action) => {
    const { payload, type } = action;
    if (!payload) {
        return state;
    }
    let {
        [payload.type]: curCreative,
        [dataConst.CREATIVE_TYPE_STRUCT]: {
            [dataConst.CREATIVE_NAME_ELEMENT_STORY]: creativeStory
        }
    } = state;
    curCreative = deepCopy(curCreative || []);
    let creativeclass = {};
    switch (type) {
        // 新增素材
        case actionTypeMap.ADD_CREATIVE:
            let newCreative = {
                id: uniqueId(),
                name: payload.name
            };
            curCreative.push(newCreative);
            // 图片素材, 需要计算order
            if (payload.type === dataConst.CREATIVE_TYPE_IMAGE) {
                curCreative.forEach(i => {
                    creativeclass[i.name] = creativeclass[i.name] || [];
                    creativeclass[i.name].push(i);
                });
                newCreative.order = creativeclass[payload.name] ? creativeclass[payload.name].length - 1 : 0;
                // 重新排序
                curCreative.sort((prev, next) => {
                    const prevName = prev.name.replace(/(.+?)\d*$/, '$1');
                    const nextName = next.name.replace(/(.+?)\d*$/, '$1');
                    const prevId = +prev.name.replace(/.+?(\d*)$/, '$1');
                    const nextId = +next.name.replace(/.+?(\d*)$/, '$1');
                    if (prevName === nextName) {
                        return prevId > nextId;
                    }
                    return prevName > nextName;
                });
            }
            // url素材， 需要填充默认值
            if (payload.type === dataConst.CREATIVE_TYPE_URL) {
                Object.assign(newCreative, {
                    min_length: {value: creativeTpl[payload.name]['dimension']['content']['min_length']},
                    max_length: {value: creativeTpl[payload.name]['dimension']['content']['max_length']}
                });
            }
            // enum素材， 需要填充默认值
            if (payload.type === dataConst.CREATIVE_TYPE_ENUM) {
                Object.assign(newCreative, {
                    option: {
                        value: creativeTpl[payload.name]['dimension']['option']
                    }
                });
            }
            return {
                ...state,
                [payload.type]: curCreative
            };

        // 删除素材
        case actionTypeMap.DELETE_CREATIVE:
            curCreative = curCreative.filter(i => +i.id !== +payload.id);
            // 重新计算order
            if (payload.type === dataConst.CREATIVE_TYPE_IMAGE) {
                curCreative.forEach(i => {
                    creativeclass[i.name] = creativeclass[i.name] || [];
                    creativeclass[i.name].push(i);
                });
                Object.values(creativeclass).forEach(items => {
                    items.forEach((item, key) => {
                        Object.assign(item, {
                            order: key
                        });
                    });
                });
            }
            return {
                ...state,
                [payload.type]: curCreative
            };

        // 更新素材
        case actionTypeMap.UPDATE_CREATIVE:
            curCreative.forEach(i => {
                if (+i.id === +payload.id) {
                    Object.assign(i, payload.data);
                }
            });
            return {
                ...state,
                [payload.type]: curCreative
            };

        // 更新子素材(轮播)
        case actionTypeMap.UPDATE_CREATIVE_STORY:
            // min_occurs & max_occurs
            if (payload.type === dataConst.CREATIVE_NAME_ELEMENT_STORY) {
                return {
                    ...state,
                    [dataConst.CREATIVE_TYPE_STRUCT]: {
                        [dataConst.CREATIVE_NAME_ELEMENT_STORY]: {
                            ...creativeStory,
                            ...payload.data
                        }
                    }
                };
            }
            // {title:[],desc:[],image:[]}
            let curCreativeArr = creativeStory[payload.type] = creativeStory[payload.type] || [];
            curCreative = curCreativeArr.filter(item => item.id === payload.id);
            if (!curCreative.length) {
                curCreative[0] = { name: payload.name, id: uniqueId() };
                curCreativeArr.push(curCreative[0]);
            }
            // 业务需要，url素材初次打开时填充默认值
            if (payload.name === dataConst.CREATIVE_NAME_URL &&
            typeIs(curCreative[0]['checked']) === 'undefined') {
                Object.assign(curCreative[0], {
                    min_length: {value: 1},
                    max_length: {value: 1024}
                });
            }
            Object.assign(curCreative[0], payload.data);

            return {
                ...state,
                [dataConst.CREATIVE_TYPE_STRUCT]: {
                    [dataConst.CREATIVE_NAME_ELEMENT_STORY]: {
                        ...creativeStory,
                        [payload.type]: curCreativeArr
                    }
                }
            };

        // 切换子素材开关
        case actionTypeMap.SWITCH_CREATIVE_STORY:
            return {
                ...state,
                [dataConst.CREATIVE_TYPE_STRUCT]: {
                    [dataConst.CREATIVE_NAME_ELEMENT_STORY]: {
                        ...creativeStory,
                        isStory: payload.data
                    }
                }
            };

        // 覆盖modal数据，新增和编辑
        case actionTypeMap.OVERRIDE_MODAL_DATA:
            return {
                ...payload.creative
            };

        default:
            return state;
    }
};

const modalReducer = (state = initState.modal, action) => {
    const { payload, type } = action;
    const stateCopy = deepCopy(state);
    const { outerData } = stateCopy;
    switch (type) {
        // modal visible
        case actionTypeMap.CHANGE_MODAL_STATUS:
            return {
                ...state,
                ...payload
            };
        case actionTypeMap.UPDATE_EDIT_DATA:
            return {
                ...state,
                outerData: {
                    ...outerData,
                    ...payload.data
                }
            };
        case actionTypeMap.OVERRIDE_MODAL_DATA:
            return {
                ...initState.modal,
                outerData: payload.outerData
            };
        default:
            return state;
    }
};

// const blackWorldReducer = (state = initState.list, action) => {
//     const { payload, type } = action;
//     switch (type) {
//         case actionTypeMap.GET_BLACK_WORLD:
//             let data = [];
//             let obj = {};
//             if (payload.data && payload.data.length) {
//                 data = payload.data;
//             }

//             return {
//                 ...state,
//                 blackWorldList: data
//             };
//         default:
//             return state;
//     }
// };

export const indexReducer = combineReducers({
    listReducer,
    crtSizeReducer,
    modalReducer,
    creativeReducer
    // blackWorldReducer
});
