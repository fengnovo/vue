import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	count: 10,
	data: ''
}

const mutations = {
	increment(state) {
		state.count++
	},
	decrement(state) {
		state.count--
	},
	setData(state, playload) {
		state.data = playload.a;
		console.log(state.data);
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
		commit, state, dispatch
	}){
		new Promise((resolve) => {
			setTimeout(()=>{
				commit('increment')
				resolve()
			},3000)
		})
	},
	async fetchData({
		commit, state, dispatch
	}) {
		let res = await fetch('https://cnodejs.org/api/v1/topics?page=1&tab=share&limit=1&mdrender=false');
		console.log(res);
		let a = res.text();
		// a = JSON.parse(a);
		console.log(a);
		a.then((resolve, reject) => {
			console.log(a);
			commit('setData', { a });
			// resolve();
		});
        
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