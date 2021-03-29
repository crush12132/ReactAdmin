import {combineReducers} from 'redux'
import localstorageUtil from '../utils/localstorageUtil'
import {SET_TITLE,RECEVIE_USER,RESET_USER} from './actions_type' 

const initHeadTitle = ''
// debugger;
function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_TITLE:
      return action.data
    default:
      return state
  }
}

/*
用来管理当前登陆用户的reducer函数
 */

const initUser = localstorageUtil.getUser() 
console.log(initUser);
function user(state=initUser, action) {
    
  switch (action.type) {
      
    case RECEVIE_USER:
         return action.user
    
    case RESET_USER:
         return {}      
    default:
      return state 
  }
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
  headTitle,
  user
})