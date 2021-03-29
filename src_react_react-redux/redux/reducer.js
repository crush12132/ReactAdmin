/*
reducer函数模块: 根据当前state和指定action返回一个新的state
 */
import {combineReducers} from './lib/redux'
 import {INCREMENT, DECREMENT} from './action-types'


/*
管理count状态数据的reducer
 */
export  function count(state=1, action) {
  console.log('count()', state, action)
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }

}

export  function user(state={}, action) {
  switch (action.type) {
   
    default:
      return state
  }

}

export default combineReducers({
  count, user
})