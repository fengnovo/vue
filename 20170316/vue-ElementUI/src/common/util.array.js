/**
 * 把数组按@chunkSize拆分成多个数组
 * @param arr: 原始数组
 * @param chunkSize: 每一个子数组的length
 * @returns Array
 */
export function arrayChunk(arr, chunkSize) {
    if (!chunkSize) {
        return arr;
    }
    const chunkNum = Math.ceil(arr.length / chunkSize);
    return Array(chunkNum)
        .fill()
        .map((_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));
}

/**
 * 将数组转为以@key作为索引的哈希表
 * @param list: 原始数组
 * @param key: 数组元素中的某个key，该key将作为哈希表的key
 * @returns Object
 */
export function list2hash(list=[], key = 'id') {
    let res = {};
    list.forEach(i => {
        if (i[key] !== undefined) {
            res[i[key]] = i;
        }
    });
    return res;
}

export function flatArray(arr) {
    const res = [].concat.apply([], arr);
    if (res.some(i => Object.prototype.toString.apply(i) === '[object Array]')) {
        return flatArray(res);
    }
    return res;
}
