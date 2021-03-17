import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import {Form,Input,Tree} from 'antd'
import menuList from '../../../config/menuConfig'
const Item = Form.Item


const getTreeNode =(menuList)=>{
    // return menuList.map((item)=>{
    //     return {
    //         title:item.title,
    //         key: item.key,
    //         children:item.children?getTreeNode(item.children):null
    //     }
    // })
    return menuList.reduce((pre,item)=>{
        pre.push({
            title:item.title,
            key: item.key,
            children:item.children?getTreeNode(item.children):null
        })
        return pre
    },[])
}

const treeNode = [
    {
        title: '平台权限',//根节点
        key: 'all',
        children:getTreeNode(menuList) ,
    }
]




export default class AuthForm extends PureComponent {

    myForm = React.createRef()

   
    static propTypes = {
        role: PropTypes.object
    }

     constructor(props){
         super(props)
         const {role} = this.props
         //根据传入角色的menus生成初始状态
         this.state = {
            checkedKeys:role.menus
         }
     }

     /**
      * 根据新传入的role来更新checkedKeys状态
      * 当组件接收到新的属性时自动调用
      * 【初始显示时是不会调用】
      */
     componentWillReceiveProps(nextProps) {
       console.log('componentWillReceiveProps',nextProps);
       const menus = nextProps.role.menus
       this.setState({
        checkedKeys:menus
       })
    }

     //选中某个node时的回调
     onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({
            checkedKeys
        })
      };

      //为父组件提交获取最新menus数据的方法
     getCheckedKeys(){
         return this.state.checkedKeys
     }


    render() {
       console.log('auth_form render()')
       const {role} = this.props
       const {checkedKeys} = this.state
        return (
            <div>               
                <Item 
                label="角色名称"    
                >
                    <Input 
                     disabled
                     value = {role.name}  
                       />
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    treeData={treeNode}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    >
                </Tree>        
            </div>
        );
    }
}


