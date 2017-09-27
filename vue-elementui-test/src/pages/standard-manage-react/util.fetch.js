/**
 * Created by chenjiawei1 on 2017/8/1.
 */
import axios from 'axios';
import qs from 'qs';
require('promise.prototype.finally').shim();
/**
 * 拉取cgi，统一处理errcode之类的事情
 * @param loading: loading函数
 * @param onError: 错误处理函数
 * @param method: http方法，String
 * @param url
 * @param errCodeName: response中错误码的key，String
 * @param errMsgName: response中错误信息的key，String
 * @param data: http请求发送的数据，object
 * @param showLoading: 是否展示loading，Boolean
 * @param manualHandleErr: 是否手动处理错误，例如需要对错误信息进行重新格式化展示,
 * 统一的onError方法无法满足的时候。当true时，onError不会调用，直接传回错误信息让使用者
 * 手动处理，避免重复，Boolean
 * @returns {*}
 */
function fetchData({
        loading = null,
        onError = null
    } = {},
    {
        method = 'post',
        url = '',
        errCodeName = '',
        errMsgName = '',
        data = '',
        showLoading = true,
        manualHandleErr = false
    } = {}) {
    if (!url) {
        return Promise.reject();
    }
    let res = {};
    let errcode;
    let errmsg;
    let isloading;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    if (showLoading && loading) {
        isloading = loading();
    }
    let reqData = method === 'get' ? { params: data } : { data: qs.stringify(data) };
    return axios({
        method,
        url,
        ...reqData
    }).then(d => {
        if (isloading) {
            isloading.close();
        }
        try {
            res = (typeof d.data === 'object') ? d.data : JSON.parse(d.data);
        } catch (e) {
            console.log('接口json解析异常：' + url);
            throw {
                errcode: undefined,
                errmsg: '数据解析异常'
            };
        }
        errcode = errCodeName ? res[errCodeName] : (typeof res.errcode !== 'undefined' ? res.errcode : res.errCode);
        errmsg = errMsgName ? res[errMsgName] : (typeof res.msg !== 'undefined' ? res.msg : res.errMsg);
        if (errcode === '0' || errcode === 0) {
            return res;
        } else {
            throw {
                errcode,
                errmsg
            };
        }
    }).catch(({ errcode, errmsg }) => {
        if (isloading) {
            isloading.close();
        }
        if (!manualHandleErr) {
            onError(errcode, errmsg);
        }
        throw res;
    });
}
export default function fetch({
    loading = null,
    onError = null
} = {}) {
    return fetchData.bind(null, {
        loading,
        onError
    });
}
