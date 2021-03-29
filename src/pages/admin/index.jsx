import React, { Component } from 'react'
import {Redirect,Switch,Route} from "react-router-dom"
import {connect} from 'react-redux'
import { Layout } from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import User from '../user'
import Role from '../role'
import Product from '../product'
import Home from '../home'
import Category from '../category'
import Bar from '../charts/bar'
import Pie from '../charts/pie'
import Line from '../charts/line'
import NotFound from '../not_found'

const { Footer, Sider, Content } = Layout;


class Admin extends Component {
    render() {

        // const user = memoryUtil.user;
        const user = this.props.user;
        //如果内存没有存储user ==> 当前没有登陆
        if(!user || !user._id) {
            //自动跳转到登陆页面
            return <Redirect to="/login"/>
        }

        return (
            
            <Layout style={{minHeight: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                    <Switch>
                        <Redirect exact from='/' to='/home'/>
                        <Route path='/home' component={Home}/>
                        <Route path='/user' component={User}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/charts/bar' component={Bar}/>
                        <Route path='/charts/pie' component={Pie}/>
                        <Route path='/charts/line' component={Line}/>
                        <Route component={NotFound}/>
                    </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>
                        推荐使用谷歌浏览器，可以获取更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {}
)(Admin)