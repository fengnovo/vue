export let deepClone = (initalObj, finalObj) => {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];
        if (prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
};