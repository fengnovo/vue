import * as types from './types'

export default {
	increment ({
		commit
	}) {
		commit(types.INCREMENT)
	},
	decrement ({
		commit
	}) {
		commit(types.DECREMENT)
	},
	OddIncrement ({
		commit,
		state
	}) {
		if(state.count%2===0){
			commit(types.INCREMENT)
		}
	},
	incerementAync ({
		commit,
		state
	}) {
		new Promise((resolve) => {
			setTimeout(() => {
				commit(types.INCREMENT)
				resolve()
			},3000)
		})
	}
}	