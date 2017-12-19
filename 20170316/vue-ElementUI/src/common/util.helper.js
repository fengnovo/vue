/**
 * 返回target的类型，eg. typeIs([]) === 'array'
 * @param target
 * @returns {string}
 */
export function typeIs(target) {
    return Object.prototype.toString.apply(target).match(/\[object\s(\w+)\]/)[1].toLowerCase();
}
