/**
 * @author: chenjiawei1
 * @date: 2017/8/11
 * @desc:
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './mock';
Vue.use(ElementUI);


// import App from './pages/user-manage'
// import App from './pages/ads-verify'
// import App from './pages/standard-manage'
// import App from './pages/market-data'
// import App from './pages/material-rank'
// import App from './pages/financial-query'
// import App from './pages/tax-query'
// import App from './pages/noneed-login'
// import App from './pages/msg-received'

// import store from './store'
// import { UserManage as store } from './stores'


let href = location.href;
let App;

if (href.indexOf('user_manage') !== -1) {
    App = require('./pages/user-manage');
} else if (href.indexOf('ads_verify') !== -1) {
    // App = require('./pages/ads-verify');
} else if (href.indexOf('standard_manage') !== -1) {
    App = require('./pages/standard-manage');
} else if (href.indexOf('market_data') !== -1) {
    App = require('./pages/market-data');
} else if (href.indexOf('material_rank') !== -1) {
    App = require('./pages/material-rank');
} else if (href.indexOf('financial_query') !== -1) {
    App = require('./pages/financial-query');
} else if (href.indexOf('tax_query') !== -1) {
    App = require('./pages/tax-query');
} else if (href.indexOf('noneed_login') !== -1) {
    App = require('./pages/noneed-login');
} else if (href.indexOf('msg_received') !== -1) {
    App = require('./pages/msg-received');
} else {
    App = require('./pages/user-manage');
}


new Vue({
    // store,
    el: '#app',
    template: '<App/>',
    components: { App }
});

// 暂时用原代码修改
// import init from './pages/standard-manage-react';
// init();
