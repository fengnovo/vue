import axios from 'axios';
import qs from 'qs';
require('promise.prototype.finally').shim();

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


// axios.interceptors.response.use(res => {
//     if (!res.data.success) {
//         return Promise.reject(res);
//     }
//     return res;
// }, error => Promise.reject(error));

export default axios;