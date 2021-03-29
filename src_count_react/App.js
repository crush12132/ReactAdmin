import React, { Component } from 'react'


export default class App extends Component {
    state = {
        count:0
    }

    myRef = React.createRef();


    increment=()=>{
        const {value} = this.myRef.current;
        this.setState(state=>({count:state.count+value*1}));
    }
    decrement=()=>{
        const {value} = this.myRef.current;
        this.setState(state=>({count:state.count-value*1}));
    }
    incrementIfOdd=()=>{
        const {value} = this.myRef.current;
        if(value%2!==0){
            this.setState(state=>({count:state.count+value*1}));
        }
       
    }
    incrementAsync=()=>{
        const {value} = this.myRef.current;
        setTimeout(()=>{
            this.setState(state=>({count:state.count+value*1}));
        },1000)
        
    }

    render() {
        const {count} = this.state
        return (
           <div>
               <p>当前总和为：{count}</p>
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
