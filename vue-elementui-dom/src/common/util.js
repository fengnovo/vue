export let transDay = ts => {
    let objD = new Date(ts);
    let yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    let MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    let dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    let str = yy + '-' + MM + '-' + dd;
    return (str);
};

export let fromatDayStart = day => day ? new Date(transDay(day) + ' 00:00:00').getTime() : '';
export let fromatDayEnd = day => day ? new Date(transDay(day) + ' 23:59:59').getTime() : '';

/* 时间转换 */
export let transTime = ts => {
    let objD = new Date(ts);
    let yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    let MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    let dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    let hh = objD.getHours();
    if (hh < 10) hh = '0' + hh;
    let mm = objD.getMinutes();
    if (mm < 10) mm = '0' + mm;
    let ss = objD.getSeconds();
    if (ss < 10) ss = '0' + ss;
    let str = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
    return (str);
};

/* 时间转换 */
export let transTimeToDay = ts => {
    let objD = new Date(+ts);
    let yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    let MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    let dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    let str = yy + '-' + MM + '-' + dd;
    return (str);
};

export let getParams = url => {
    if (url.indexOf('?') === -1) {
        return {};
    }
    url = url.split('?')[1];
    let theParams = {};
    let strs = url.split('&');
    for (let i = 0; i < strs.length; i++) {
        let strsi = strs[i].split('=');
        theParams[strsi[0]] = strsi[1];
    }
    return theParams;
};

export let param2Obj = url => {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};