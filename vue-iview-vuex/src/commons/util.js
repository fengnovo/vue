
import axios from 'axios';
import qs from 'qs';
require('promise.prototype.finally').shim();

var errcodeMap = {
    common: {
        '-6': '获取XML配置信息失败',
        '-5': '调用fapp服务失败',
        '-4': '调用xml配置信息失败',
        '-3': '调用Sequence服务失败',
        '-2': '操作DB出错',
        1: '未知错误',
        2: '参数校验错误',
        4: '参数异常',
        5: '没有访问权限',
        100: '该记录已存在',
        101: '该记录不能修改',
        102: '该记录不存在',
        151: '处理过程中发生部分异常'
    },
    autoad: {
        12000: '所有字段均为必填',
        12001: '类目ID格式错误',
        12002: '类目数据不能修改',
        12003: '行数与原表不一致',
        12004: '二级类目id重复',
        12005: '原始类目数据不存在',
        12006: '类目ID不存在',
        12007: '上传的excel表数据不合法',
        12008: '店铺大类名称必填，且不能超过25个字',
        12009: '事业部名称必填，且不能超过25个字'
    },
    exp: {
        0: '成功',
        '-4': '调用xml配置信息失败',
        '-3': '调用Sequence服务失败',
        '-2': '操作DB出错',
        '-1': '操作失败',
        1: '参数异常',
        2: '没有访问权限',
        11000: '保存上传文件失败',
        11001: '文件不存在',
        11002: '文件已存在',
        11003: '文件类型错误',
        11004: 'excel表数据不合法',
        11005: 'excel表长度超过上限',
        11006: '无有效数据',
        11007: '京东pin不存在',
        11008: '京东pin重复',
        11009: '上传数据超过一列',
        11010: '消息不存在',
        11011: '消息已发布',
        11012: '本日消息发布数量已超过上限{num}条',
        11013: '上传文件token校验失败，请重新上传文件'
    }
};


axios.defaults.timeout = 10000;                        // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';    // 配置请求头
// axios.defaults.baseURL = 配置接口地址';            // 配置接口地址


axios.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.data = {
            ...config.data,
            _t: new Date().getTime()
        };
        config.data = qs.stringify(config.data);
    }
    return config;
}, error => Promise.reject(error));


function yztFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function $errcodeToErrmsg(errcode, moduleName) {
    // 模块优先级高于common，因为不同模块的公共部分并非统一。
    if (!moduleName) {
        moduleName = 'autoad';
    }
    return errcodeMap[moduleName][errcode] || errcodeMap['common'][errcode] || '';
}

function transTime(ts) {
    var objD = new Date(+ts);
    var yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    var MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    var hh = objD.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = objD.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var ss = objD.getSeconds();
    if (ss < 10) ss = '0' + ss;
    var str = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
    return str;
};


function typeIs(target) {
    return Object.prototype.toString.apply(target).match(/\[object\s(\w+)\]/)[1].toLowerCase();
}
function decodeHtml(html) {
    if (typeIs(html) !== 'string') {
        return '';
    }
    var _ele = document.createElement('div');
    _ele.innerHTML = html;
    return _ele.innerText || _ele.textContent;
}

module.exports = {
    transTime: transTime,
    typeIs: typeIs,
    yztFetch: yztFetch,
    decodeHtml: decodeHtml,
    errcodeMap: errcodeMap
};