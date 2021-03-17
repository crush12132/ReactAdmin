import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import {Form,Input,Select} from 'antd'
const Item = Form.Item
const Option = Select.Option
const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  };

export default class UserForm extends PureComponent {

    myForm = React.createRef()

    static propTypes = {
        setForm: PropTypes.func,
        roles:PropTypes.array
       
    }

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

    UNSAFE_componentWillMount(){
        this.props.setForm(this.myForm)
    }

    render() {
       
        const {roles,user} = this.props
       
        return (
            <Form ref={this.myForm} {...layout}> 
                <Item 
                label="用户名"
                name="username"
                initialValue={user.username}
                rules={[
                    { required: true,whitespace:true, message: '请输入您要添加的用户名^-^' },
                    { min: 4, message: '用户名至少4位哦~' },
                    { max: 12, message: '用户名不能超过12位哦~' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成哦~' }
                 ]}
                >
                    <Input 
                       placeholder="请输入您要添加的用户名^ - ^"
                       type="username"
                       />
                </Item>
                 {
                     user._id ? null : 
                     <Item 
                label="密码"
                name="password"
                initialValue={user.password}
                rules={[
                    { required: true,whitespace:true, message: '请输入密码^-^' },
                    {validator:this.validats}
                ]}
                >
                    <Input 
                       placeholder="请输入您要添加的密码^ - ^"
                       type="password"
                       />
                </Item>
                 }
                <Item 
                label="手机号"
                name="phone"
                initialValue={user.phone}
                rules={[
                    { message:'手机号必须输入哦= ='},
                    {pattern:/^[0-9]{11}$/, message: '请输入正确的手机格式哦~' }
                 ]}
                >
                    <Input 
                       placeholder="请输入您要添加的手机号^ - ^"
                       />
                </Item>
                <Item 
                label="邮箱"
                name="email"
                initialValue={user.email}
                rules={[
                    { pattern: /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/, message: '请输入正确的邮箱格式哦~' }
                ]}
                >
                    <Input 
                       placeholder="请输入您要添加的邮箱^ - ^"
                       
                       />
                </Item>
                <Item 
                label="角色"
                name="role_id"
                initialValue={user.role_id}
                rules={[
                    { message:'角色必须输入哦= ='}
                 ]}
                >
                    <Select
                  
                    >
                        {
                            roles.map((c)=>{
                              return (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                              )
                            })
                        }
                    </Select>
                </Item>
            </Form>
        );
    }
}


