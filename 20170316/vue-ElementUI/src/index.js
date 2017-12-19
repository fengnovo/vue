import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './app.vue';
import router from './router';
import store from './store';
import DemoComponents from '@/components';

Vue.use(ElementUI);
Vue.use(DemoComponents);

new Vue({
    router,
    store,
    template: '<App/>',
    components: {
        App
    },
    el: '#app'
});
