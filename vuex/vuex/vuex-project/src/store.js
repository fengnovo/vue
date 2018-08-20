import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	count: 10
}

const mutations = {
	increment(state) {
		state.count++
	},
	decrement() {
		state.count--
	}
}

const actions = {
	increment({
		commit
	}){
		commit('increment')
	},
	decrement({
		commit
	}){
		commit('decrement')
	},
	OddIncrement({
		commit,
		state
	}){
		if(state.count%2 === 0) {
			commit('increment')
		}
	},
	incerementAync({
		commit
	}){
		new Promise((resolve) => {
			setTimeout(()=>{
				commit('increment')
				resolve()
			},3000)
		})
	}
}

const getters = {
	count(state) {
		return state.count
	},
	isOdd(state) {
		return state.count%2===0? '偶数' : '奇数'
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})