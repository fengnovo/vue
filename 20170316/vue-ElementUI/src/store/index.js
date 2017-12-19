import Vue from 'vue';
import Vuex from 'vuex';
import aside from './modules/aside';                    // 侧边栏模块
Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        aside
    }
});
