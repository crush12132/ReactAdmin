import {combineReducers} from 'redux'
import {INCREMENT,DECREMENT} from '../constants'


const initState = 0;
function Countreducer(state=initState,action){

    console.log(state,action);
    const {type,data} = action

    switch (type) {
        case INCREMENT:
            return state +　data;
        case DECREMENT:
            return state -　data;    
    
        default:
           return state;
    }


    
}

const preState = {}
function　user(state=preState,action){
    const {type,data} = action

    switch (type) {
         
    
        default:
           return state;
    }

}
export default combineReducers({
    Countreducer,
    user
})