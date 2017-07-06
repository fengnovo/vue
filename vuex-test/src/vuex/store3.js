import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

const state = {
    count: 3
}

const mutations = {  //mutation 突变，改变
    add(state,n) {      //n是add方法传入的参数
        state.count += n
    },
    reduce(state,n) {
        state.count -= n
    }
}

export default new vuex.Store({
    state,
    mutations
})