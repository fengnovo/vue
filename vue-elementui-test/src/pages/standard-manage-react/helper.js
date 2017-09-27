/**
 * Created by chenjiawei1 on 2017/7/9.
 */

import {dataConst} from './config.const.js';
import {creativeTypeEnum} from './const.jsx';

export function filterCurCreative(data, bizId) {
    return data.filter(item => creativeTypeEnum
                                   .filter(i => i.name === item.name)[0]['mediaType'].indexOf(bizId) !== -1);
}

export function decodeProperty(propertyEnum, bit) {
    return (propertyEnum & bit) !== 0 ? dataConst.TRUE : dataConst.FALSE;
}
