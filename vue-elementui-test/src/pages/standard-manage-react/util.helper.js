/**
 * Created by chenjiawei1 on 2017/3/28.
 */
import React from 'react';
/**
 * 返回target的类型，eg. typeIs([]) === 'array'
 * @param target
 * @returns {string}
 */
export function typeIs(target) {
    return Object.prototype.toString.apply(target).match(/\[object\s(\w+)\]/)[1].toLowerCase();
}
/**
 * 将时间戳转为对应格式的日期字符
 * @param timestamp: 精确到毫秒
 * @param pattern
 * @returns {*}
 */
export function fromTimestamp(timestamp, pattern = 'yyyy/MM/dd') {
    if (!timestamp) {
        return '';
    }
    var d = new Date(parseInt(timestamp));
    var year = d.getFullYear();
    var month = addZero(d.getMonth() + 1);
    var day = addZero(d.getDate());
    var hours = addZero(d.getHours());
    var min = addZero(d.getMinutes());
    var sec = addZero(d.getSeconds());
    return pattern
        .replace(/yyyy/g, year)
        .replace(/MM/g, month)
        .replace(/dd/g, day)
        .replace(/HH/g, hours)
        .replace(/mm/g, min)
        .replace(/ss/g, sec);
}

/**
 * 把日期字符转为毫秒时间戳
 * @param time
 * @returns {*}
 */
export function toTimestamp(time) {
    let _t = time.replace(/-/g, '/');
    let _msTime = +new Date(_t);
    if (_t && _msTime) {
        return _msTime;
    } else {
        return '';
    }
}

/**
 * 小于10的数字加上0，常用语时间表示
 * @param num
 * @returns {string}
 */
export function addZero(num) {
    return ((+num < 10) ? '0' : '') + num;
}

/**
 * 把数据渲染成组件列表
 * @param data:数据格式要求为[{id:'xxx',name:'xxx'}]以保证顺序
 * @param Component:需要渲染的组件
 * @returns {Array}
 */
export function renderChild(data, Component, props) {
    if (!data || typeIs(data) !== 'array') {
        return [];
    }
    return data
        .filter(data => !!data.delFlag !== true)
        .map(data => <Component {...props} key={`${data.id}`} value={`${data.id}`}>{data.name}</Component>);
}

export function parseRelationData(dataEnum, relation) {
    const byId = (id1, id2, rel = relation) => {
        let result = rel.filter(data => +data.id === +id1);
        if (!result || !result.length) {
            return [];
        }
        let arr = [];
        result[0]['child'].forEach(d => {
            if (!id2) {
                if (typeIs(d.id) === 'array') {
                    arr.push(...d.id.map(id => {
                        const target = dataEnum[d.schema].filter(data => +data.id === +id);
                        const name = target.length ? target[0]['name'] : '';
                        return {
                            id,
                            name
                        };
                    }));
                    return;
                }
                const target = dataEnum[d.schema].filter(data => +data.id === +d.id);
                const name = target.length ? target[0]['name'] : '';
                arr.push({
                    id: d.id,
                    name
                });
                return;
            }
            if (+id2 === +d.id) {
                arr = byId(id2, null, result[0]['child']);
                return;
            }
        });
        return arr;
    };
    return {
        byId
    };
};
export function encodeBitData(arr) {
    if (!arr || !arr.length) {
        return 0;
    }
    return arr.reduce((a, b) => a | b);
}
/**
 * 把按位叠加的数据解析出来
 * @param bit:位叠加数
 * @param map:字段映射，{'xx':'yy'}或者[{key:'xx',value:'xx'}]
 * @param returnType:返回id还是value
 * @returns {Array/object}
 */
export function decodeBitData(bit, data, returnType = 'id') {
    let _dataType = typeIs(data);
    if (!bit ||
        (_dataType !== 'object' && (_dataType !== 'array' || !data[0]))) {
        return;
    }
    // 如果传入的数据是object，那么也返回object
    if (_dataType === 'object') {
        let _result = {};
        Object.keys(data).forEach(data => {
            if ((bit & data) !== 0) {
                _result[data] = data[data];
            }
        });
        return _result;
    }
    // 如果数据是{key:'',value:''}的形式，说明对顺序有要求，那么也按这种格式返回
    if (_dataType === 'array') {
        return data
            .filter(data => (data.id & bit) !== 0)
            .map(data => data[returnType]);
    }
}

/**
 * 获取[{key:'',value:''}]这种结构的keys
 * @param map
 * @returns {Array}
 */
export function getMapKeys(map) {
    if (!map || !map.length) {
        return [];
    }
    return map.map(data => data.key);
}

/**
 * 获取[{key:'',value:''}]这种结构的values
 * @param map
 * @returns {Array}
 */
export function getMapValues(map) {
    if (!map || !map.length) {
        return [];
    }
    return map.map(data => data.value);
}

/**
 * 获取输入的keys所对应的values
 * @param keys
 * @param data
 * @returns {Array}
 */
export function keyToValue(keys, data) {
    let _keysType = typeIs(keys);
    let _dataType = typeIs(data);
    let _data = {};
    if (_dataType !== 'object' && (_dataType !== 'array' || !data[0] || !data[0]['key'] || !data[0]['value'])) {
        return [];
    }
    if (_keysType !== 'array') {
        keys = Array.of(keys);
    }
    if (_dataType === 'array') {
        data.forEach(d => {
            _data[d.key] = d.value;
        });
    }
    return keys.map(data => _data[data]);
}

/**
 * 把html实体编码解码为html标记，或者把html转成text
 * @param html
 * @returns {string}
 */
export function decodeHtml(html) {
    if (typeIs(html) !== 'string') {
        return '';
    }
    let _ele = document.createElement('div');
    _ele.innerHTML = html;
    return _ele.innerText || _ele.textContent;
}

/**
 * 把html标记转为实体编码
 * @param html
 * @returns {string}
 */
export function encodeHtml(html) {
    if (typeIs(html) !== 'string') {
        return '';
    }
    let _ele = document.createElement('div');
    if (document.innerText) {
        _ele.innerText = html;
    } else {
        _ele.textContent = html;
    }
    return _ele.innerHTML;
}

export function getClipboardData(e, format = 'text') {
    if (e.clipboardData) {
        return e.clipboardData.getData(format);
    }
    if (window.clipboardData) {
        return window.clipboardData.getData(format);
    }
}
export function extendObject(oldObject, ...newValues) {
    if (!newValues.length) {
        newValues = [{}];
    }
    return Object.assign({}, oldObject, ...newValues);
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
export function updateObject(oldObject, ...newValues) {
    if (!newValues.length) {
        newValues = [{}];
    }
    return Object.assign({}, oldObject, ...newValues);
}
export function decodeSiteSet(siteset, dataEnum, returnType = 'id') {
    var arr = siteset.split('');
    var siteResult = [];
    arr.forEach((v, k) => {
        if (+v === 1) {
            siteResult.push(k + 1);
        }
    });
    return dataEnum
        .filter(data => siteResult.indexOf(+data.id) !== -1)
        .map(data => data[returnType]);
}

export function encodeSiteSet(arr) {
    if (typeIs(arr) !== 'array') {
        arr = Array.of(arr);
    }
    let siteArr = range(Math.max(...arr)).fill(0);
    arr.forEach(data => {
        siteArr[data - 1] = 1;
    });
    return siteArr.join('');
}

/**
 * 生成num长度且value=key的数组
 * @param num
 * @returns {*[]}
 */
export function range(num) {
    return [...Array(num).keys()];
}

/**
 * 把扁平的数据转换成带dimension的结构
 * @param tpl
 * @param data
 * @param recursive
 */
export function unFlatDimensionData(tpl, data, recursive) {
    Object.keys(tpl).forEach(key => {
        if (key == 'name') {
            return;
        }
        if (key == 'dimension' && recursive) {
            let childkey = Object.keys(tpl[key]);
            childkey.forEach(_key => {
                let childTpl = tpl[key][_key];
                unFlatDimensionData(childTpl, data, true);
            });
            return;
        }
        if (data[key]) {
            if (typeIs(data[key]) === 'object') {
                if (key == 'min_length' || key == 'max_length') {
                    tpl[key] = data[key]['value'] * 2;// db为gbk，字数长度需x2，这种东西本来不需要在前端care的……
                } else {
                    tpl[key] = data[key]['value'];
                }
            } else {
                tpl[key] = data[key];
            }
        }
        if (typeIs(tpl[key]) == 'array') {
            tpl[key] = encodeBitData(tpl[key]);
        }
    });
}

/**
 * 把dimension里面的数据扁平化出来
 * @param data
 */
export function flatDimensionData(data) {
    Object.values(data.dimension).forEach(value => {
        Object.keys(value).forEach(iKey => {
            if (iKey == 'min_length' || iKey == 'max_length') {
                data[iKey] = { value: `${value[iKey] / 2}` };
                return;
            }
            data[iKey] = { value: `${value[iKey] == null ? '' : value[iKey]}` };
        });
    });
    data.id = uniqueId();
}

export function getNameById(type, typeEnum) {
    const typeItem = typeEnum.filter(item => +item.id === +type);
    return (typeItem && typeItem.length) ? typeItem[0]['name'] : '';
}
export function validMin({ equal, required, decimal, compareValue, value, cb } = {}) {
    const min = value;
    const max = compareValue;
    if (!required && !min && !max && min !== 0 && max !== 0) {
        cb();
        return true;
    }
    const reg = new RegExp(`^\\d+${decimal ? '(\\.\\d+)?' : ''}$`);
    if (!reg.test(min) || +min <= 0) {
        cb('请输入正确的数字');
        return false;
    }
    if (max !== '' && +min > +max) {
        cb('最大值必须大于最小值');
        return false;
    }
    if (max !== '' && !equal && min === max) {
        cb('最大值必须大于最小值');
        return false;
    }
    cb();
    return true;
}
export function validMax({ equal, required, decimal, compareValue, value, cb } = {}) {
    const min = compareValue;
    const max = value;
    if (!required && !min && !max && min !== 0 && max !== 0) {
        cb();
        return true;
    }
    const reg = new RegExp(`^\\d+${decimal ? '(\\.\\d+)?' : ''}$`);
    if (!reg.test(max) || +max <= 0) {
        cb('请输入正确的数字');
        return false;
    }
    if (min !== '' && +min > +max) {
        cb('最大值必须大于最小值');
        return false;
    }
    if (min !== '' && !equal && min === max) {
        cb('最大值必须大于最小值');
        return false;
    }
    cb();
    return true;
}

export function decodeHTML(value) {
    if (!value) {
        return '';
    }
    const div = document.createElement('div');
    div.innerHTML = value;
    return div.innerText;
}

export function byte2Kb(byteVal) {
    return Math.round(parseFloat(byteVal) / 1024);
}
export function kb2Byte(kbVal) {
    return parseFloat(kbVal) * 1024;
}

export function validSpecChar(rule, value, cb) {
    if (/[\/\t\r\n\f\b\\\\]+/.test(value)) {
        cb(rule.message);
    }
    cb();
}

export function flatArr(arr) {
    return [].concat(...arr);
}

export function getDataMapChild(data, ...ids) {
    if (!ids[0]) {
        return data;
    }
    let result = data;
    ids.every(id => {
        result = result.filter(d => +d.id === +id);
        if (!result.length) {
            return false;
        }
        result = result[0]['child'];
        return true;
    });
    return result;
}

export function uniqueId(prefix = '') {
    window['uniqueIdList'] = window['uniqueIdList'] || [];
    let newId = `${prefix}${+new Date() + parseInt(Math.random() * 100000000)}`;
    if (window['uniqueIdList'].indexOf(newId) !== -1) {
        newId = uniqueId(prefix);
    }
    window['uniqueIdList'].push(newId);
    return newId;
}

/**
 * antd 数据同步到redux是一个{value:1, errors: null}的结构
 * 这个函数是获取具体value的值，避免每次都得作大量的判空处理
 * @param name
 * @param data
 * @returns {null}
 */
export function getAntdFormDataValue(name, data) {
    if (typeIs(name) === 'array') {
        let result = {};
        name.forEach(item => {
            result[item] = getAntdFormDataValue(item, data);
        });
        return result;
    }
    const value = data ? data[name] : null;
    return value ? value.value : null;
}


export function handleUploadChange(info, {errcode = 'errCode', errmsg = 'msg', resurl = 'data'}) {
    console.log(info);
    if (!info || !info.length) {
        return info;
    }
    let fileList = info.slice(-1);
    let res;

    function onerr(errmsg, errcode) {
        fileList[0].name = errmsg;
        fileList[0].status = 'error';
        fileList[0].response = errmsg;
        fileList[0].errcode = errcode;
        fileList[0].thumbUrl = '';
        return fileList;
    }

    function onsucc() {
        fileList[0].status = 'done';
        fileList[0].url = resurl.split('.').reduce((prev, next) => prev[next], res);
        return fileList;
    }

    if (fileList[0].status == 'error') {
        return onerr(`${fileList[0].name} 上传失败。`);
    }
    if (fileList.length && fileList[0].response) {
        try {
            res = typeIs(fileList[0].response) == 'object' ? fileList[0].response : JSON.parse(fileList[0].response);
            let errCode = res[errcode]; // 各种不统一的接口^_^
            if (+errCode !== 0) {
                return onerr(res[errmsg], errCode);
            } else {
                return onsucc();
            }
        } catch (e) {
            return onerr(`网络错误，${fileList[0].name} 上传失败`);
        }
    }
    return fileList;
}
