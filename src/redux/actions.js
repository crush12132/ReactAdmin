import {message} from 'antd'
import {SET_TITLE,RECEVIE_USER,RESET_USER} from './actions_type'
import {reqLogin} from '../api'
import localstorageUtil from '../utils/localstorageUtil'
/*
设置头部标题的同步action
 */
export const setHeadTitle = (headTitle) => ({type: SET_TITLE, data: headTitle})

/*
设置管理用户同步action
 */
export const receiveUser = (user) =>({type:RECEVIE_USER,user})


export const logout = ()=>{
    localstorageUtil.removeUser();
    return {type:RESET_USER}
}

export const login = (username, password)=>{
    // debugger;
    return async dispatch =>{
        const result = await reqLogin(username, password)
        // debugger;
        console.log("result:==>",result);
        if(result.status === 0){  

            // debugger;
            const user = result.data
            //保存在内存中
            localstorageUtil.saveUser(user)

            // debugger
            dispatch(receiveUser(user))
            message.success('登陆成功!!!')
        }else{
            const msg = result.msg
           message.error(msg)
        }
    }
}

