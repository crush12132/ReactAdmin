import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { Modal } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'
import logo from './images/Sunny.png'
import {formateData} from '../../config/timeConfig'
import {reqWeatherandAddress} from '../../api'
import menuList from '../../config/menuConfig'
import LinkButton from '../LinkButton'
import {logout,setHeadTitle} from '../../redux/actions'

class Header extends Component {


    state = {
        currentTime:formateData(Date.now()),
        weather:'',
        city: '',
    }

    //获取时间
    getTime=()=>{
       this.timer =  setInterval(()=>{
          const currentTime = formateData(Date.now())
          this.setState({currentTime})
        },1000)
    }

    //获取天气
    getWeatherandAddress=async ()=>{
        const {weather,city} = await reqWeatherandAddress();
        this.setState({weather,city})
    }


   

    //获取与地址对应的title
    getTitle=()=>{
        //得到当前请求路径
        const path = this.props.location.pathname;
        let title;
        //find()方法只能返回对象
        menuList.forEach((item)=>{
             if(item.key===path){//如果当前item对象的key与path一样，item的title就是需要显示的title
                 title = item.title;
             }else if(item.children){
                item.children.forEach((cItem)=>{
                    if(path.indexOf(cItem.key)===0){
                        title = cItem.title;
                    }
                })
             }
        })
        return title
    }


    layOut=()=>{
        Modal.confirm({
            title: '您是否要退出登陆?',
            icon: <ExclamationCircleOutlined />,
            okText:"确认",
            cancelText:"取消",
            onOk:()=>{      
                this.props.logout()         
            //   //删除保存的user信息
            //   localstorageUtil.removeUser();
            //   memoryUtil.user = {}
            //   //跳转到login
            //   this.props.history.replace();
            }

        });
    }

    /**
     * 第一次render()之后执行一次
     * 一般在此执行异步操作：发ajax请求/启动定时器
     */
    componentDidMount(){
        this.getTime();
        this.getWeatherandAddress();
       
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        const {currentTime,weather,city} = this.state
        const username = this.props.user.username;
        // const title = this.getTitle();
        const title = this.props.headTitle;
        return (
            <div className="header">
                <div className="header-top">
                <span>您好，{username}</span>
                <LinkButton onClick={this.layOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    
                    <div className="header-bottom-right">
                    <span>{currentTime}</span> 
                    <span>{city}</span>
                       <img src={logo} alt=""/>
                    <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state=>({
        headTitle:state.headTitle,
        user:state.user
        
    }),
    {
        logout
        
    }
)(withRouter(Header))