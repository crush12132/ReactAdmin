import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd';
import {connect} from 'react-redux'
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import './index.less'
import logo from '../../assets/images/qinglang.png'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

// 登陆界面
/*
  1.前台表单验证
  2.收集表单输入数据
 */
class Login extends Component {
   
   
     onFinish=async (values)=>{
        //获取表单数据
        
         const {username,password} = values

         this.props.login(username,password)
     
    }
    onFinishFailed=(err)=>{
        console.log('验证失败！',err)
    }

    /**
     * 自定义验证
     *  用户名/密码的的合法性要求 
            1). 必须输入
            2). 必须大于等于 4 位 
            3). 必须小于等于 12 位 
            4). 必须是英文、数字或下划线组成
     */
    validats=(rules,value)=>{
      if(!value){
          return Promise.reject('密码不能为空哦~')
      }else if(value.length<4){
          return Promise.reject('密码长度不能小于4哦~')
      }else if(value.length>12){
        return Promise.reject('密码长度不能大于12哦~')
      }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
        return Promise.reject('密码必须是英文、数字或下划线组成哦~')
      }else{
        return Promise.resolve();
      }
    }

    render() {
        // const user = memoryUtil.user;
        console.log(this.props)
        const user = this.props.user;
        if(user && user._id){
            return <Redirect to='/home'/>
        }

        // const errorMsg = this.props.user.errorMsg


        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                 {/* <div>{errorMsg}</div> */}
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form  onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} className="login-form">
             
                        {/* 用户名/密码的的合法性要求 
                                1). 必须输入
                                2). 必须大于等于 4 位 
                                3). 必须小于等于 12 位 
                                4). 必须是英文、数字或下划线组成
                        */}
                         <Form.Item 
                         name="username"
                         rules={[
                             //声明式验证：直接使用别人定义好的验证规则进行验证
                             { required: true,whitespace:true, message: '请输入您的用户名^-^' },
                             { min: 4, message: '用户名至少4位哦~' },
                             { max: 12, message: '用户名不能超过12位哦~' },
                             { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成哦~' }
                             ]}
                             initialValue='admin'//设置默认用户名   
                              >
                            <Input
                                prefix={ <UserOutlined style={{ color: 'rgba(0,0,0,.25)'}} />}
                                
                                placeholder="账号"
                                />
                        </Form.Item>

                        <Form.Item  
                           name="password"
                           rules={[
                               {validator:this.validats}
                           ]}
                           >
                            <Input.Password
                                prefix={<LockOutlined  style={{ color: 'rgba(0,0,0,.25)'}}/>}
                               
                                placeholder="密码"
                                />
                        </Form.Item>
                            
                        <Form.Item>
                            <Button  type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
  )(Login)

/**
 * async 和 await
 *  1.作用：
 *       简化promise对象的使用：不用再使用.then()来指定成功/失败的回调函数
 *       以同步编码（没有回调函数了）的方式实现异步流程
 *  2.哪里写await？
 *        在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
 *  3.哪里写async？
 *         await所在函数（最近的）定义的左侧写async 
 */