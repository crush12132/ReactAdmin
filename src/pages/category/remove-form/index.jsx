import React, { Component } from 'react';
import {Form,Select,Input} from 'antd'
const Item = Form.Item

export default class RemoveForm extends Component {
    render() {
        return (
            <Form>
               <Item 
                name="parentId"
                >
                   <Select defaultValue='一级分类'>
                     <option value='1'>一级分类</option>   
                     <option value='2'>电脑</option>   
                     <option value='3'>家具</option>   
                    </Select> 
                </Item>
            </Form>
        );
    }
}


