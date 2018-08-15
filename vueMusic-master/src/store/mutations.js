import * as types from './mutation-types'
const mutations={
  [types.ORDER_INDEX](state,orderIndex){
    state.orderIndex=orderIndex
  },
  [types.USER_ID](state,userId){
    state.userId=userId
  },
  [types.IS_DISTRIB](state,is_distrib){
    state.is_distrib=is_distrib
  }
}
export default mutations



// WEBPACK FOOTER //
// ./src/store/mutation.js