/* 合法jd email */
export let isEmail = str => {
    const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@jd\.com$/i;
    return reg.test(str.trim());
};

/* 合法uri */
export let validateURL = textval => {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
};

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