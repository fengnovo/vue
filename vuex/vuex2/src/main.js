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
        }
    },
    actions: {
        asyncAdd({state, commit, dispatch} ) {
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('add')
                }, 3000);
            })
        },
        asyncGetData({state, commit, dispatch}) {
            fetch('https://cnodejs.org/api/v1/topics?page=1&tab=share&limit=1&mdrender=false')
            .then(res => {
                console.log(res.text());
                console.log(res.json());
                return res.text()
                // state.data = 
            }).then(data => {
                // console.log(data);
                // state.data = 
            })
        }
    },
    // getters: {

    // },

});
new Vue({
    store,
    el: document.querySelector('#app'),
    components: {
        App   
    }
})