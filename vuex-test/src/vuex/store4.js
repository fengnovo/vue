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

//每操作一次count给count加100，不管加还是减   
const getters = {
    count(state) {
        return state.count += 100;
    }
}

export default new vuex.Store({
    state,
    mutations,
    getters
})