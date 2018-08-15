import Vue from 'vue';
import App from './App';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store';

Vue.use(iView);

new Vue({
    el: '#app',
    ...App,
    store
});