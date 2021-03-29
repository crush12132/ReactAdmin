/**
 * 根据指定的reducer函数创建一个store对象并返回
 */
export function createStore(reducer){
    //创建store就会调用一次reducer
    //用来存储内部状态数据的变量，初始值为调用reducer函数返回的结果【外部指定的默认值】
    //局部变量，外面看不到
    let state = reducer(undefined,{type:'@@initxxx'})

    //监听回调函数
    const listeners = []

    /**
     * 返回当前内部的state数据
     */
    function getState(){
       return state
    }
    /**
     * 绑定内部state改变的监听回调
     * 可以给一个store绑定多个监听  
     */
    function subscribe(listener){
        //保存到缓存listener的容器数组中
        listeners.push(listener)
    }

    /*
      分发 action,触发reducer调用，产生新的state
    */
    function dispatch(action){
        //1.触发reducer调用，得到新的state
       const newState =  reducer(state,action)
       //2.保存新的state
       state = newState
       //3.调用所有已存在的监视回调函数
       listeners.forEach(listener => listener())
    }

   return {
       getState,
       subscribe,
       dispatch
   }
}
/**
 * 新的reducer管理的总状态：{r1:state1,r2:state2}
 *  reducers的结构：
 *   {
 *      count:(state=2,action)=>3,
 *      user:(state={},action)=>{}
 *    } 
 *  总的reducer
 *  {
 *     count:count(),
 *     user:user()
 *  }
 */
// export function combineReducers2(reducers){
//     //返回一个新的总reducer函数 state：总状态
//     return (state={},action)=>{
//         //准备一个总状态空对象
//          const totalReducers={};
//          //执行reducers中每个函数得到一个新的子状态，并添加到总状态空对象
//          Object.keys(reducers).forEach(key=>{
//          totalReducers[key] = reducers[key](state[key], action)
//       })
//       //返回总状态对象
//       return totalReducers;
//     }
// }

//返回总的reducers，接收总的state【对象】，action，返回总的状态
export function combineReducers(reducers){
   return (state={},action)=>{
       //执行reducers中每个reducer函数得到一个新的子状态，并添加到总状态对象中
       return Object.keys(reducers).reduce((totalState,key)=>{
           totalState[key] = reducers[key](state[key], action);
           return totalState
       },{})
   }
}
