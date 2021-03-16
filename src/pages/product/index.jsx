import React, { Component } from 'react';
import {Switch,Route,Redirect,exact  } from 'react-router-dom'
import ProductAddUpdate from './addUpdate'
import ProductHome from './home'
import ProductDetail from './detail'
import './index.less'

//商品管理路由
export default class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/product' exact component={ProductHome}/>
                    <Route path='/product/addUpdate' component={ProductAddUpdate}/>
                    <Route path='/product/detail' component={ProductDetail}/>
                    <Redirect to='/product' />
                </Switch>
            </div>
        );
    }
}

