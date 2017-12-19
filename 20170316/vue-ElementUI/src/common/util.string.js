/**
 * 返回target的类型，eg. typeIs([]) === 'array'
 * @param target
 * @returns {string}
 */
export function typeIs(target) {
    return Object.prototype.toString.apply(target).match(/\[object\s(\w+)\]/)[1].toLowerCase();
}

/**
 * 把字符串从右往左每chunksize位添加一个delimiter
 * eg. stringChunk(10000000) === '10,000,000'
 * @param string 原始数据
 * @param chunkSize 每个chunk的大小
 * @param delimiter 分隔符
 * @returns {string}
 */
export function stringChunk(string, chunkSize = 3, delimiter = ',') {
    if (!string || (typeof string !== 'string' && typeof string !== 'number')) {
        return string;
    }
    const regex = new RegExp(`(.{1,${chunkSize}})(?=(.{${chunkSize}})+$)`, 'g');
    return string.toString().replace(regex, `$1${delimiter}`);
}

/**
 * 生成当前session下唯一ID
 * @param prefix id的前缀，不加则为纯数字ID
 * @returns {string}
 */
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

export function verifySpecChar(string) {
    if (typeIs(string) !== 'string') {
        return;
    }
    return /[<>&"'\/\\\t\r\n]/.test(string);
}
