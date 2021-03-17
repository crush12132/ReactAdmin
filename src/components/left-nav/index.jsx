import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/qinglang.png'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import memoryUtil from '../../utils/memoryUtil'

const { SubMenu } = Menu;

 class LeftNav extends Component {


    /**
     * 根据menu的数据数组生成对应的标签数组
     * 使用map()+递归调用
     */
    // getMenuNodes_map=(menuList)=>{
    //     return menuList.map((item)=>{
    //         if(!item.children){
    //             return (
    //             <Menu.Item key={item.key} icon={item.icon}>
    //                 <Link to={item.key}>
    //                 {item.title}
    //                 </Link>   
    //             </Menu.Item>
    //             )
    //         }else{
    //             return (
    //                 <SubMenu key={item.key} icon={item.icon} title= {item.title}>
    //                     {this.getMenuNodes(item.children)}             
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }

    /**
     *判断当前登陆用户对item是否有权限，有三种情况：
        1。如果当前用户是admin
        2.如果当前item是公开的，【isPublic为true】
        3.当前用户有此item的权限：menus有没有包含key
     */
    hasAuth=(item)=>{
        const {key,isPublic} = item
        const menus = memoryUtil.user.role.menus
        const username = memoryUtil.user.username
        if(username==='admin' || isPublic || menus.indexOf(key)!== -1){
            return true;
        }else if(item.children){//如果当前用户有次item的某个子item的权限
            return  !!item.children.find((child)=>{
                 return menus.indexOf(child.key)!== -1
            })
        }else{
            return false;
        }
    }
    

    getMenuNodes=(menuList)=>{

        const path = this.props.location.pathname

        return menuList.reduce((pre,item)=>{

            if(this.hasAuth(item)){
                if(!item.children){
                    //向pre中添加<Menu.Item>
                    pre.push((
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>
                            {item.title}
                            </Link>   
                       </Menu.Item>
                    ))    
                }else{
                   //查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find((cItem)=>path.indexOf(cItem.key)===0)
                    //如果存在，说明当前item的子列表需要打开
                    if(cItem){
                        this.openKey = item.key;
                    }
    
                    pre.push((
                        //向pre中添加<SubMenu>
                        <SubMenu key={item.key} icon={item.icon} title= {item.title}>
                             {this.getMenuNodes(item.children)}             
                        </SubMenu> 
                    ))
                }
            }

            
            return pre
        },[])
    }

    /**
     * 在第一次render()之前执行一次
     * 位第一个render()准备数据(必须同步的)
     */
    UNSAFE_componentWillMount(){
        this.MenuNodes = this.getMenuNodes(menuList)
    }

    render() {

        let path = this.props.location.pathname
        const Openkey = this.openKey
        // console.log(typeof path)//string
        if(path.indexOf('/product')===0){//当前请求的是商品或其子路由界面
            path='/product'
        }
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>后台管理</h1>
                </Link>
                <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[path]}
                defaultOpenKeys={[Openkey]}
                >
{/*                 
                <Menu.Item key="/home" icon={<AppstoreAddOutlined />}>
                    <Link to='/home'>
                    首页
                    </Link>   
                </Menu.Item>
                <SubMenu key="sub1" icon={<SplitCellsOutlined />} title="分类">
                    <Menu.Item key="/category" icon={<CloudOutlined />} >
                        <Link to='/category'>
                            品类管理
                        </Link>                      
                    </Menu.Item>                   
                    <Menu.Item key="/product" icon={<CloudOutlined />}>
                        <Link to='/product'>
                             商品管理
                        </Link>
                    </Menu.Item>                  
                </SubMenu> */}
                 {
                     this.MenuNodes
                 }
                </Menu>
            </div>
        );
    }
}

/**
 * withRouter高阶组件：
 *   包装非路由组件，返回一个新的组件
 *    新的组件向非路由组件传递3个属性：history/location/match
 */
export default withRouter(LeftNav)