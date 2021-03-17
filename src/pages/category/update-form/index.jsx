import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'
const Item = Form.Item

export default class UpdateForm extends Component {

    myForm = React.createRef()

    static propTypes = {
        categoryName:PropTypes.string,
        setForm:PropTypes.func
    }
   UNSAFE_componentWillMount(){
        
        //  console.log(this.myForm.current.getFieldsValue(categoryName))
         this.props.setMyForm(this.myForm)
   }
    render() {       
        const  {categoryName} = this.props 
        return (
            <Form ref={this.myForm}>
                <Item 
                name="categoryName"
                initialValue={categoryName}
                rules={[
                    { required:true,message:'修改的分类名称必须输入哦= ='}
                 ]}
                >
                    <Input placeholder="请输入您要修改的分类名称^ - ^"/>
                </Item>
            </Form>
        );
    }
}


