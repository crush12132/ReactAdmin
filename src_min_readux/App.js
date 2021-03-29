import React, { Component } from 'react'
import store from './redux/store'
import {increment,decrement} from './redux/actions'
export default class App extends Component {
   
    myRef = React.createRef();


    increment=()=>{
        const {value} = this.myRef.current;
        store.dispatch(increment(value*1));
    }
    decrement=()=>{
        const {value} = this.myRef.current;
        store.dispatch(decrement(value*1))
    }
    incrementIfOdd=()=>{
        const {value} = this.myRef.current;
        if(store.getState()%2!==0){
            store.dispatch(increment(value*1));
        }
       
    }
    incrementAsync=()=>{
        const {value} = this.myRef.current;
        setTimeout(()=>{
            store.dispatch(increment(value*1));
        },1000)
        
    }

    render() {
        
        
        return (
           <div>
               <p>当前总和为：{store.getState().Countreducer}</p>
               <div>
                   <select ref={this.myRef}>
                       <option value="1">1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                   </select>&nbsp;&nbsp;
                   <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                   <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                   <button onClick={this.incrementIfOdd}>incrementIfOdd</button>&nbsp;&nbsp;
                   <button onClick={this.incrementAsync}>incrementAsync</button>
               </div>
           </div>
        )
    }
}
