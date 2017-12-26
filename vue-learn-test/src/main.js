// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

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


Vue.prototype.$axios = axios

Vue.filter('addZero', data => {
    return data < 10 ? '0' + data : data
})

Vue.filter('fixedNum', (data,n) => {
    return data && data.toFixed(n)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
