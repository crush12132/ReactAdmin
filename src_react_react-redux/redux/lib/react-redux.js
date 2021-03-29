import React,{Component} from 'react'
import PropTypes from 'prop-types'
/**
 * 简化redux的使用，不用自己去订阅监听，看不到store的3个语法
 * 使用react-redux提供的两个API进行与redux进行通信，
 * 但表面上看不见，store只用一次，只需要把store传给provider，
 * 后面再也不去调用store的方法了，完全由connect与provider处理
 * 
 */

/**
 * 用来向所有容器组件提供store的组件类
 */
export class Provider extends Component {


    static propTypes = {
        store:PropTypes.object.isRequired//声名接收store
    }

    //声名提供的context的数据名称和类型
    static childContextTypes = {
        store:PropTypes.object
    }

    //向所有声名子组件提供包含要传递数据的context对象
    getChildContext() {
        return {
            store:this.props.store
        }
    }

    render(){
        // 原样渲染其所有标签子节点
        return (
            this.props.children
        )
    }
}

/**
 * connect高阶函数：接收 mapStateToProps和mapDispatchToProps两个参数，返回一个高阶组件函数
 *  高阶组件：接收一个UI组件，返回一个容器组件
 */
export function connect(mapStateToProps,mapDispatchToProps){
    //返回高阶组件函数
 return (UIComponent)=>{
     //返回一个有状态的容器组件
    return class ContainerComponent extends Component{
        
        constructor(props,context) {
            super(props)

            console.log('ContainerComponent ',context.store);

            //得到store
            const {store} = context;
            //得到包含所有一般属性的对象
            const stateProps =  mapStateToProps(store.getState())
            //将所有一般属性作为容器的状态数据
            this.state = {...stateProps}

           
            let dispatchProps;
            if(typeof dispatchProps === "function"){//如果传的是函数
                //得到包含所有函数属性的对象
                dispatchProps = mapDispatchToProps(store.dispatch)
            }else{
                dispatchProps =  Object.keys(mapDispatchToProps).reduce((pre,key)=>{
                    const actionKeys = mapDispatchToProps[key]
                    pre[key] = (...args)=>{store.dispatch(actionKeys(...args))}
                    return pre;
                },{})
            }
            

            //保存到组件上
            this.dispatchProps = dispatchProps


             //绑定store的state变化的监听
             store.subscribe(()=>{//store内部的状态数据发生了变化
                this.setState({...mapStateToProps(store.getState())})
            })


        }

       

        //声名接收的context数据的名称和数据
        static contextTypes = {
            store:PropTypes.object
        }
        render() {
            //返回UI组件标签

            return <UIComponent {...this.state} {...this.dispatchProps}/>
        }
    }
 }
}