import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'
const Item = Form.Item


export default class AddForm extends Component {

    myForm = React.createRef()

    static propTypes = {
        
        setMyForm:PropTypes.func
    }

    UNSAFE_componentWillMount(){
        this.props.setMyForm(this.myForm)
    }

    render() {
       
        return (
            <Form ref={this.myForm}>
               
                <Item 
                label="角色名称"
                name="roleName"
                initialValue=''
                rules={[
                    { required:true,message:'角色名称必须输入哦= ='}
                 ]}
                >
                    <Input 
                       
                       placeholder="请输入您要添加的角色名称^ - ^"
                       />
                </Item>
            </Form>
        );
    }
}


