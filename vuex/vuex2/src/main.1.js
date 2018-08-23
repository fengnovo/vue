import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        num: 0,
        data: ''
    },
    mutations: {
        add(state) {
            state.num ++;
        },
        setData(state, playload) {
            console.log(playload);
            state.data = playload.a;
        }
    },
    actions: {
        asyncAdd({state, commit, dispatch} ) {
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('add')
                }, 1000);
            });
        },
        asyncGetData({state, commit, dispatch}) {
            fetch('https://cnodejs.org/api/v1/topics?page=1&tab=share&limit=1&mdrender=false')
                .then(res => {
                    return res.text();
                }).then(res => {
                    commit('setData', { a: JSON.parse(res) });
                });
        }
    },
    getters: {
        isOdd(state) {
            return state.num % 2 === 0 ? '偶数' : '奇数';
        }
    },

});
new Vue({
    store,
    el: document.querySelector('#app'),
    components: {
        App   
    }
})