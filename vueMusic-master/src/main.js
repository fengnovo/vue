import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
import lazyLoad from "vue-lazyload"
import FastClick from 'fastclick'
import { DatetimePicker } from 'mint-ui';
import MyPlugin from './common/js/plugin'
require('./common/js/vconsole')
import 'mint-ui/lib/style.css'
Vue.use(MyPlugin)
Vue.component(DatetimePicker.name, DatetimePicker);
//懒加载
Vue.use(lazyLoad,{
  loading:require('common/image/load.gif')
})
FastClick.attach(document.body)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// http://www.tuoniaoshangcheng.com/app/#/home