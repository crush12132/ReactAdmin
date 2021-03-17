 /**
  * 用于维持登陆的工具模块
  */
 import store from 'store'
 import {USE_KEY} from '../constant'
 export default {
    //保存用户
    saveUser(user){
        // localStorage.setItem(USE_KEY,JSON.stringify(user))
        store.set(USE_KEY,user)
    },
    //读取用户
    getUser(){
        // return JSON.parse(localStorage.getItem(USE_KEY)||'{}')
        return store.get(USE_KEY||{})
       
    },
    //删除用户
    removeUser(){
        // localStorage.removeItem(USE_KEY)
        store.remove(USE_KEY)
    }
 }