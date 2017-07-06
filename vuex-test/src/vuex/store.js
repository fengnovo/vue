import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)   //Vue.use(Vuex) 也行

const state = {
    count: 3
}

const mutations = {  //mutation 突变，改变
    add(state) {
        state.count ++
    },
    reduce(state) {
        state.count --
    }
}

export default new vuex.Store({
    state,
    mutations
})